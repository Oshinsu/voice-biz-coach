/**
 * PHASE 1: ARCHITECTURE AUDIO CRITIQUE
 * AudioQueue Class - Gestion séquentielle de l'audio avec récupération d'erreurs
 */

export class AudioQueue {
  private queue: Uint8Array[] = [];
  private isPlaying = false;
  private audioContext: AudioContext;
  
  constructor(audioContext: AudioContext) {
    this.audioContext = audioContext;
  }

  async addToQueue(audioData: Uint8Array) {
    console.log('🎵 Ajout audio à la queue:', audioData.length, 'bytes');
    this.queue.push(audioData);
    
    if (!this.isPlaying) {
      await this.playNext();
    }
  }

  private async playNext() {
    if (this.queue.length === 0) {
      this.isPlaying = false;
      console.log('🔇 Queue audio terminée');
      return;
    }

    this.isPlaying = true;
    const audioData = this.queue.shift()!;

    try {
      const wavData = this.createWavFromPCM(audioData);
      const audioBuffer = await this.audioContext.decodeAudioData(wavData.buffer);
      
      const source = this.audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this.audioContext.destination);
      
      // CRITIQUE: Gestion séquentielle avec onended
      source.onended = () => {
        console.log('🎵 Chunk audio terminé, passage au suivant');
        this.playNext();
      };
      
      source.start(0);
      console.log('🔊 Lecture chunk audio:', audioData.length, 'bytes');
      
    } catch (error) {
      console.error('❌ Erreur lecture audio chunk:', error);
      // CRITIQUE: Continue malgré l'erreur pour ne pas casser la queue
      this.playNext();
    }
  }

  /**
   * CRITIQUE: Conversion PCM16 vers WAV avec headers corrects
   * Respect du byte order little endian et 24kHz
   */
  private createWavFromPCM(pcmData: Uint8Array): Uint8Array {
    // Convertir bytes en samples 16-bit
    const int16Data = new Int16Array(pcmData.length / 2);
    for (let i = 0; i < pcmData.length; i += 2) {
      // Little endian byte order
      int16Data[i / 2] = (pcmData[i + 1] << 8) | pcmData[i];
    }
    
    // Paramètres WAV (critiques pour OpenAI Realtime)
    const sampleRate = 24000; // TOUJOURS 24kHz pour OpenAI
    const numChannels = 1;     // Mono
    const bitsPerSample = 16;  // PCM16
    const blockAlign = (numChannels * bitsPerSample) / 8;
    const byteRate = sampleRate * blockAlign;
    
    // Créer header WAV correct
    const wavHeader = new ArrayBuffer(44);
    const view = new DataView(wavHeader);
    
    // RIFF header
    this.writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + int16Data.byteLength, true);
    this.writeString(view, 8, 'WAVE');
    
    // Format chunk
    this.writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);          // Chunk size
    view.setUint16(20, 1, true);           // Audio format (PCM)
    view.setUint16(22, numChannels, true); // Channels
    view.setUint32(24, sampleRate, true);  // Sample rate
    view.setUint32(28, byteRate, true);    // Byte rate
    view.setUint16(32, blockAlign, true);  // Block align
    view.setUint16(34, bitsPerSample, true); // Bits per sample
    
    // Data chunk
    this.writeString(view, 36, 'data');
    view.setUint32(40, int16Data.byteLength, true);
    
    // Combiner header et data
    const wavArray = new Uint8Array(wavHeader.byteLength + int16Data.byteLength);
    wavArray.set(new Uint8Array(wavHeader), 0);
    wavArray.set(new Uint8Array(int16Data.buffer), wavHeader.byteLength);
    
    return wavArray;
  }

  private writeString(view: DataView, offset: number, string: string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  clear() {
    this.queue = [];
    this.isPlaying = false;
    console.log('🧹 Queue audio vidée');
  }

  get queueLength(): number {
    return this.queue.length;
  }
}