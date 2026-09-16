/**
 * Elegant Web Audio API romantic wedding ambient synthesizer
 * Plays gentle music box / harp arpeggio chords in Canon in D progression
 */

class WeddingAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerId: number | null = null;
  private currentStep = 0;
  private masterGain: GainNode | null = null;

  // Canon in D chord arpeggios (frequencies in Hz)
  // D - A - Bm - F#m - G - D - G - A
  private chordNotes: number[][] = [
    [293.66, 369.99, 440.0, 587.33, 739.99], // D maj
    [220.0, 277.18, 329.63, 440.0, 554.37],  // A maj
    [246.94, 293.66, 369.99, 493.88, 587.33], // B min
    [185.0, 220.0, 277.18, 369.99, 440.0],   // F# min
    [196.0, 246.94, 293.66, 392.0, 493.88],  // G maj
    [293.66, 369.99, 440.0, 587.33, 739.99], // D maj
    [196.0, 246.94, 293.66, 392.0, 493.88],  // G maj
    [220.0, 277.18, 329.63, 440.0, 659.25],  // A maj
  ];

  public init() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.09, this.ctx.currentTime); // gentle ambient volume
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playNote(freq: number, time: number, duration = 2.2) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    // Sine wave with slight triangle warmth for music box/harp character
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    // Warm envelope
    noteGain.gain.setValueAtTime(0, time);
    noteGain.gain.linearRampToValueAtTime(0.18, time + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + duration);
  }

  private scheduleNextArpeggio() {
    if (!this.isPlaying || !this.ctx) return;
    const chordIndex = Math.floor(this.currentStep / 4) % this.chordNotes.length;
    const noteIndex = this.currentStep % 4;
    const chord = this.chordNotes[chordIndex];
    const freq = chord[noteIndex] || chord[0];

    const now = this.ctx.currentTime;
    this.playNote(freq, now, 2.5);

    // Occasional gentle octave sparkle
    if (this.currentStep % 8 === 0 && chord[4]) {
      this.playNote(chord[4], now + 0.15, 1.8);
    }

    this.currentStep++;
    this.timerId = window.setTimeout(() => {
      this.scheduleNextArpeggio();
    }, 450); // 450ms per arpeggio pluck
  }

  public toggle(): boolean {
    this.init();
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public play() {
    this.init();
    this.isPlaying = true;
    this.scheduleNextArpeggio();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const weddingAudio = new WeddingAudioPlayer();
