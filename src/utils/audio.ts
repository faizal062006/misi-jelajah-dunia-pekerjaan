/**
 * Procedural Web Audio API Sound Generator & Voice Narration
 * Zero external audio file dependencies, runs entirely in-browser.
 */

export interface MusicTrack {
  id: 'calypso' | 'lofi' | 'brass' | 'breeze';
  name: string;
  genre: string;
  tempo: number;
  description: string;
}

export const MUSIC_TRACKS: MusicTrack[] = [
  {
    id: 'calypso',
    name: 'Petualangan Ceria',
    genre: 'Marimba Island',
    tempo: 220,
    description: 'Irama ceria dan bersemangat yang disukai anak-anak.'
  },
  {
    id: 'lofi',
    name: 'Belajar Santai',
    genre: 'Sweet Kalimba',
    tempo: 320,
    description: 'Melodi lembut yang menenangkan saat anak fokus membaca.'
  },
  {
    id: 'brass',
    name: 'Mars Penjelajah Cilik',
    genre: 'Adventure March',
    tempo: 190,
    description: 'Ketukan riang pemberani untuk menyemangati ekspedisi.'
  },
  {
    id: 'breeze',
    name: 'Semilir Angin Pulau',
    genre: 'Chime Breeze',
    tempo: 280,
    description: 'Alunan lembut seperti angin sepoi-sepoi di tepi pantai.'
  }
];

class SoundManager {
  private ctx: AudioContext | null = null;
  private bgmInterval: number | null = null;
  private isBgmPlaying: boolean = false;
  private isMuted: boolean = false;
  private isVoiceMuted: boolean = false;
  private volume: number = 0.6; // 0 to 1
  private currentTrackId: MusicTrack['id'] = 'calypso';
  private listeners: (() => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      const storedMute = localStorage.getItem('game_sound_muted');
      if (storedMute !== null) {
        this.isMuted = storedMute === 'true';
      }
      const storedVol = localStorage.getItem('game_sound_volume');
      if (storedVol !== null) {
        this.volume = parseFloat(storedVol);
      }
      const storedTrack = localStorage.getItem('game_sound_track') as MusicTrack['id'];
      if (storedTrack && MUSIC_TRACKS.some(t => t.id === storedTrack)) {
        this.currentTrackId = storedTrack;
      }
    }
  }

  public subscribe(cb: () => void) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter(l => l !== cb);
    };
  }

  private notify() {
    this.listeners.forEach(cb => cb());
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (typeof window !== 'undefined') {
      localStorage.setItem('game_sound_volume', String(this.volume));
    }
    this.notify();
  }

  public getVolume(): number {
    return this.volume;
  }

  public setTrack(trackId: MusicTrack['id']) {
    this.currentTrackId = trackId;
    if (typeof window !== 'undefined') {
      localStorage.setItem('game_sound_track', trackId);
    }
    if (this.isBgmPlaying) {
      this.stopBGM();
      this.startBGM();
    }
    this.notify();
  }

  public getCurrentTrack(): MusicTrack {
    return MUSIC_TRACKS.find(t => t.id === this.currentTrackId) || MUSIC_TRACKS[0];
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('game_sound_muted', String(this.isMuted));
    }
    if (this.isMuted && this.isBgmPlaying) {
      this.stopBGM();
    } else if (!this.isMuted && !this.isBgmPlaying) {
      this.startBGM();
    }
    this.notify();
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public toggleVoice(): boolean {
    this.isVoiceMuted = !this.isVoiceMuted;
    if (this.isVoiceMuted && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.notify();
    return this.isVoiceMuted;
  }

  public getIsVoiceMuted(): boolean {
    return this.isVoiceMuted;
  }

  public getIsBgmPlaying(): boolean {
    return this.isBgmPlaying;
  }

  // --- Sound Effects ---

  public playClick() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.06);

      const gainLevel = 0.12 * this.volume;
      gain.gain.setValueAtTime(gainLevel, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.07);
    } catch {
      // ignore
    }
  }

  public playCorrect() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.08);

        const gainLevel = 0.18 * this.volume;
        gain.gain.setValueAtTime(0.001, this.ctx.currentTime + i * 0.08);
        gain.gain.linearRampToValueAtTime(gainLevel, this.ctx.currentTime + i * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + i * 0.08);
        osc.stop(this.ctx.currentTime + i * 0.08 + 0.36);
      });
    } catch {
      // ignore
    }
  }

  public playIncorrect() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.25);

      const gainLevel = 0.15 * this.volume;
      gain.gain.setValueAtTime(gainLevel, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, this.ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.26);
    } catch {
      // ignore
    }
  }

  public playStar() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const notes = [659.25, 987.77, 1318.51];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.07);

        const gainLevel = 0.15 * this.volume;
        gain.gain.setValueAtTime(gainLevel, this.ctx.currentTime + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.07 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.07);
        osc.stop(this.ctx.currentTime + idx * 0.07 + 0.45);
      });
    } catch {
      // ignore
    }
  }

  public playFanfare() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const melody = [
        { f: 392.0, d: 0.15, t: 0 },
        { f: 523.25, d: 0.15, t: 0.16 },
        { f: 659.25, d: 0.15, t: 0.32 },
        { f: 783.99, d: 0.3, t: 0.48 },
        { f: 659.25, d: 0.15, t: 0.8 },
        { f: 1046.5, d: 0.7, t: 0.96 }
      ];

      melody.forEach(item => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(item.f, this.ctx.currentTime + item.t);

        const gainLevel = 0.2 * this.volume;
        gain.gain.setValueAtTime(0.001, this.ctx.currentTime + item.t);
        gain.gain.linearRampToValueAtTime(gainLevel, this.ctx.currentTime + item.t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + item.t + item.d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + item.t);
        osc.stop(this.ctx.currentTime + item.t + item.d + 0.05);
      });
    } catch {
      // ignore
    }
  }

  public playViolation() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      // Urgent double warning buzz
      [0, 0.22].forEach((offset) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, this.ctx.currentTime + offset);
        osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + offset + 0.18);

        const gainLevel = 0.25 * this.volume;
        gain.gain.setValueAtTime(gainLevel, this.ctx.currentTime + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + offset + 0.19);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, this.ctx.currentTime + offset);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + offset);
        osc.stop(this.ctx.currentTime + offset + 0.2);
      });
    } catch {
      // ignore
    }
  }

  public playTeacherMessage() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      // Pleasant school bell chime (C5 -> E5 -> G5 -> C6)
      const chimeNotes = [523.25, 659.25, 783.99, 1046.5];
      chimeNotes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.1);

        const gainLevel = 0.18 * this.volume;
        gain.gain.setValueAtTime(0.001, this.ctx.currentTime + idx * 0.1);
        gain.gain.linearRampToValueAtTime(gainLevel, this.ctx.currentTime + idx * 0.1 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + idx * 0.1 + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.1);
        osc.stop(this.ctx.currentTime + idx * 0.1 + 0.46);
      });
    } catch {
      // ignore
    }
  }

  // --- Cheerful Procedural Background Music with multiple tracks ---

  public startBGM() {
    if (this.isMuted || this.isBgmPlaying) return;
    this.initCtx();
    if (!this.ctx) return;

    this.isBgmPlaying = true;
    const track = this.getCurrentTrack();
    const tempo = track.tempo;

    // Track melody chords
    let chords: number[][] = [];
    let oscType: OscillatorType = 'sine';
    let filterFreq = 1200;

    if (track.id === 'calypso') {
      // Bright Marimba Calypso
      chords = [
        [261.63, 329.63, 392.0], // C
        [220.0, 261.63, 329.63], // Am
        [174.61, 220.0, 261.63], // F
        [196.0, 246.94, 293.66]  // G
      ];
      oscType = 'triangle';
      filterFreq = 1400;
    } else if (track.id === 'lofi') {
      // Soft Kalimba Lofi
      chords = [
        [261.63, 329.63, 392.0, 493.88], // Cmaj7
        [174.61, 220.0, 261.63, 329.63], // Fmaj7
        [220.0, 261.63, 329.63, 392.0],  // Am7
        [196.0, 246.94, 293.66, 349.23]  // G7
      ];
      oscType = 'sine';
      filterFreq = 900;
    } else if (track.id === 'brass') {
      // Upbeat Adventure March
      chords = [
        [196.0, 261.63, 329.63, 392.0], // C
        [196.0, 246.94, 293.66, 392.0], // G
        [220.0, 261.63, 329.63, 440.0], // Am
        [174.61, 220.0, 261.63, 349.23] // F
      ];
      oscType = 'triangle';
      filterFreq = 1600;
    } else {
      // Chime Breeze
      chords = [
        [261.63, 392.0, 523.25], // C
        [293.66, 440.0, 587.33], // D
        [329.63, 493.88, 659.25], // E
        [261.63, 392.0, 523.25]  // C
      ];
      oscType = 'sine';
      filterFreq = 1100;
    }

    let chordIdx = 0;
    let step = 0;

    this.bgmInterval = window.setInterval(() => {
      if (this.isMuted || !this.ctx || !this.isBgmPlaying) return;

      try {
        const currentChord = chords[chordIdx];
        const freq = currentChord[step % currentChord.length];

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = oscType;
        const octaveMul = step % 2 === 0 ? 2 : 1;
        osc.frequency.setValueAtTime(freq * octaveMul, this.ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(filterFreq, this.ctx.currentTime);

        const gainLevel = 0.025 * this.volume;
        gain.gain.setValueAtTime(gainLevel, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.18);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.2);

        step++;
        if (step >= 8) {
          step = 0;
          chordIdx = (chordIdx + 1) % chords.length;
        }
      } catch {
        // ignore
      }
    }, tempo);

    this.notify();
  }

  public stopBGM() {
    this.isBgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
    this.notify();
  }

  // --- Narration / Text-to-Speech in Bahasa Indonesia ---

  public speak(text: string) {
    if (this.isVoiceMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.95;
      utterance.pitch = 1.05;

      const voices = window.speechSynthesis.getVoices();
      const idVoice = voices.find(v => v.lang.startsWith('id') || v.lang.includes('ID'));
      if (idVoice) {
        utterance.voice = idVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore
    }
  }

  public stopSpeech() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const soundManager = new SoundManager();
