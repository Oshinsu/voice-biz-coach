/**
 * PHASE 1: ARCHITECTURE AUDIO CRITIQUE  
 * AudioRecorder - Enregistrement optimisé PCM16 à 24kHz pour OpenAI Realtime
 */

export class AudioRecorder {
  private stream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private processor: ScriptProcessorNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;

  constructor(private onAudioData: (audioData: Float32Array) => void) {}

  async start() {
    try {
      console.log('🎙️ Démarrage enregistrement audio optimisé');
      
      // Configuration microphone optimisée pour OpenAI Realtime
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 24000,        // CRITIQUE: 24kHz requis par OpenAI
          channelCount: 1,          // Mono
          echoCancellation: true,   // Suppression écho
          noiseSuppression: true,   // Suppression bruit
          autoGainControl: true     // Contrôle automatique gain
        }
      });
      
      // AudioContext à 24kHz
      this.audioContext = new AudioContext({
        sampleRate: 24000,
      });
      
      this.source = this.audioContext.createMediaStreamSource(this.stream);
      
      // Buffer de 4096 samples pour latence optimale
      this.processor = this.audioContext.createScriptProcessor(4096, 1, 1);
      
      this.processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        // Copie pour éviter les problèmes de référence
        this.onAudioData(new Float32Array(inputData));
      };
      
      this.source.connect(this.processor);
      this.processor.connect(this.audioContext.destination);
      
      console.log('✅ Enregistrement audio démarré - 24kHz PCM16');
      
    } catch (error) {
      console.error('❌ Erreur démarrage enregistrement:', error);
      throw error;
    }
  }

  stop() {
    console.log('⏹️ Arrêt enregistrement audio');
    
    if (this.source) {
      this.source.disconnect();
      this.source = null;
    }
    
    if (this.processor) {
      this.processor.disconnect();
      this.processor = null;
    }
    
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}

/**
 * CRITIQUE: Encodage audio pour API avec respect du format PCM16
 */
export const encodeAudioForAPI = (float32Array: Float32Array): string => {
  // Conversion Float32 vers Int16 (PCM16)
  const int16Array = new Int16Array(float32Array.length);
  for (let i = 0; i < float32Array.length; i++) {
    // Clamping pour éviter la distorsion
    const s = Math.max(-1, Math.min(1, float32Array[i]));
    int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
  }
  
  // Conversion vers Uint8Array avec byte order correct
  const uint8Array = new Uint8Array(int16Array.buffer);
  
  // Encodage base64 par chunks pour éviter les problèmes de mémoire
  let binary = '';
  const chunkSize = 0x8000;
  
  for (let i = 0; i < uint8Array.length; i += chunkSize) {
    const chunk = uint8Array.subarray(i, Math.min(i + chunkSize, uint8Array.length));
    binary += String.fromCharCode.apply(null, Array.from(chunk));
  }
  
  return btoa(binary);
};