import { OpenAIRealtimeWebRTC } from "@openai/agents-realtime";
import { supabase } from "@/integrations/supabase/client";

const REALTIME_MODEL = "gpt-4o-realtime-preview-2024-12-17" as const;

export interface VoiceAgentSession {
  transport: OpenAIRealtimeWebRTC;
  localStream: MediaStream;
  remoteStream: MediaStream;
  connection?: RTCPeerConnection;
  remoteTrackHandler?: (event: RTCTrackEvent) => void;
}

function ensureBrowserEnvironment() {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    throw new Error("L'environnement actuel ne supporte pas WebRTC");
  }

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error("Les API audio du navigateur ne sont pas disponibles");
  }
}

function getPeerConnection(transport: OpenAIRealtimeWebRTC): RTCPeerConnection | undefined {
  return (
    (transport as unknown as { connection?: RTCPeerConnection }).connection ||
    (transport as unknown as { pc?: RTCPeerConnection }).pc ||
    (transport as unknown as { peerConnection?: RTCPeerConnection }).peerConnection
  );
}

export async function startVoiceAgent(instructions?: string): Promise<VoiceAgentSession> {
  let localStream: MediaStream | undefined;
  let remoteStream: MediaStream | undefined;
  let connection: RTCPeerConnection | undefined;
  let remoteTrackHandler: ((event: RTCTrackEvent) => void) | undefined;

  try {
    console.log('🎤 Démarrage Voice Agent SDK...');

    ensureBrowserEnvironment();

    // 1) Récupère le token éphémère (ek_…)
    const { data, error } = await supabase.functions.invoke('get-openai-key', {
      body: { instructions: instructions || "Assistant vocal pédagogique en temps réel pour BYSS VNS." }
    });

    if (error) {
      console.error('❌ Erreur Edge Function:', error);
      throw new Error(`Edge Function error: ${error.message}`);
    }
    
    const { value: ek } = data;
    if (!ek?.startsWith("ek_")) {
      console.error('❌ Token éphémère invalide:', ek);
      throw new Error("Token éphémère invalide");
    }
    
    console.log('✅ Token éphémère obtenu:', ek.substring(0, 10) + '...');

    localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    remoteStream = new MediaStream();

    // 2) WebRTC transport avec token éphémère
    const webrtcTransport = new OpenAIRealtimeWebRTC({
      apiKey: ek
    });

    connection = getPeerConnection(webrtcTransport);

    remoteTrackHandler = (event: RTCTrackEvent) => {
      const incomingStream = event.streams?.[0];
      if (incomingStream) {
        incomingStream.getTracks().forEach((track) => {
          if (remoteStream && !remoteStream.getTracks().includes(track)) {
            remoteStream.addTrack(track);
          }
        });
      } else if (event.track && remoteStream && !remoteStream.getTracks().includes(event.track)) {
        remoteStream.addTrack(event.track);
      }
    };

    if (connection) {
      connection.addEventListener('track', remoteTrackHandler);
    } else if (typeof (webrtcTransport as unknown as { on?: (event: string, cb: (payload: RTCTrackEvent) => void) => void }).on === 'function') {
      (webrtcTransport as unknown as { on: (event: string, cb: (payload: RTCTrackEvent) => void) => void }).on('track', remoteTrackHandler);
    }

    const addLocalTrack = (track: MediaStreamTrack) => {
      if (!localStream) {
        return;
      }
      if (connection && typeof connection.addTrack === 'function') {
        connection.addTrack(track, localStream);
      } else if (typeof (webrtcTransport as unknown as { addTrack?: (track: MediaStreamTrack, stream: MediaStream) => void }).addTrack === 'function') {
        (webrtcTransport as unknown as { addTrack: (track: MediaStreamTrack, stream: MediaStream) => void }).addTrack(track, localStream);
      } else {
        console.warn('⚠️ Impossible d\'ajouter la piste audio locale au transport WebRTC');
      }
    };

    localStream.getTracks().forEach((track) => addLocalTrack(track));

    // 3) Connexion WebRTC
    console.log('🔗 Connexion WebRTC...');
    await webrtcTransport.connect({
      apiKey: ek,
      model: REALTIME_MODEL
    });

    console.log('✅ Voice Agent connecté avec succès');
    if (!localStream || !remoteStream) {
      throw new Error('Les flux audio locaux ou distants ne sont pas disponibles');
    }
    return {
      transport: webrtcTransport,
      localStream,
      remoteStream,
      connection,
      remoteTrackHandler
    };

  } catch (error) {
    console.error('❌ Erreur startVoiceAgent:', error);
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    if (remoteStream) {
      remoteStream.getTracks().forEach((track) => {
        track.stop();
        remoteStream.removeTrack(track);
      });
    }
    throw error;
  }
}

export async function stopVoiceAgent(session?: VoiceAgentSession | null) {
  if (!session) {
    return;
  }

  try {
    console.log('🛑 Arrêt Voice Agent...');
    const { transport, localStream, remoteStream, connection, remoteTrackHandler } = session;

    if (connection && remoteTrackHandler) {
      connection.removeEventListener('track', remoteTrackHandler);
    }

    if (remoteTrackHandler) {
      const off = (transport as unknown as { off?: (event: string, cb: (payload: RTCTrackEvent) => void) => void }).off;
      if (typeof off === 'function') {
        off.call(transport, 'track', remoteTrackHandler);
      }
    }

    const disconnect = (transport as unknown as { disconnect?: () => Promise<void> | void }).disconnect;
    if (typeof disconnect === 'function') {
      await disconnect.call(transport);
    }

    const close = (transport as unknown as { close?: () => void }).close;
    if (typeof close === 'function') {
      close.call(transport);
    }

    if (connection && typeof connection.close === 'function' && connection.signalingState !== 'closed') {
      connection.close();
    }

    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }

    if (remoteStream) {
      remoteStream.getTracks().forEach((track) => {
        track.stop();
        remoteStream.removeTrack(track);
      });
    }

    console.log('✅ Voice Agent arrêté');
  } catch (error) {
    console.error('❌ Erreur lors de l\'arrêt:', error);
  }
}