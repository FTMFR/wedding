import { MusicTrack } from '../types';

/** Skip the intro — always start (and loop) from 0:49 */
export const TRACK_START_SECONDS = 49;

export const ROMANTIC_PLAYLIST: MusicTrack[] = [
  {
    id: 'sheyda-ghorbani',
    title: 'شیدا',
    composer: 'علیرضا قربانی',
    category: 'آهنگ ویژه کارت دعوت',
    durationFormatted: '۳:۵۰',
    // Place your licensed MP3 at: public/audio/sheyda.mp3
    audioUrl: '/audio/sheyda.mp3',
    description: 'قطعه شیدا با صدای علیرضا قربانی، آهنگ مورد علاقه برای کارت دعوت.',
    coverImage:
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=400&q=80',
  },
];

export interface AudioPlayerState {
  isPlaying: boolean;
  currentTrack: MusicTrack;
  currentIndex: number;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
  hasInteracted: boolean;
}

type Listener = (state: AudioPlayerState) => void;

class RomanticAudioManager {
  private audioElement: HTMLAudioElement | null = null;
  private currentTrackIndex = 0;
  private isPlaying = false;
  private volume = 0.65;
  private isMuted = false;
  private isLoading = false;
  private currentTime = 0;
  private duration = 0;
  private hasInteracted = false;
  private listeners: Set<Listener> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const savedVol = localStorage.getItem('wedding_music_vol');
        if (savedVol !== null) {
          const parsed = parseFloat(savedVol);
          if (!isNaN(parsed) && parsed >= 0 && parsed <= 1) {
            this.volume = parsed;
          }
        }
      } catch {
        // ignore
      }
      this.initAudioElement();
    }
  }

  private initAudioElement() {
    if (typeof window === 'undefined' || this.audioElement) return;

    this.audioElement = new Audio();
    this.audioElement.preload = 'auto';
    // Manual loop from TRACK_START_SECONDS (native loop would restart at 0:00)
    this.audioElement.loop = false;
    this.audioElement.volume = this.volume;

    const track = ROMANTIC_PLAYLIST[this.currentTrackIndex];
    if (track) {
      this.audioElement.src = track.audioUrl;
    }

    this.audioElement.addEventListener('play', () => {
      this.isPlaying = true;
      this.isLoading = false;
      this.notifyListeners();
    });

    this.audioElement.addEventListener('pause', () => {
      this.isPlaying = false;
      this.notifyListeners();
    });

    this.audioElement.addEventListener('timeupdate', () => {
      if (this.audioElement) {
        this.currentTime = this.audioElement.currentTime;
        this.duration = this.audioElement.duration || 0;
        this.notifyListeners();
      }
    });

    this.audioElement.addEventListener('loadedmetadata', () => {
      if (this.audioElement) {
        this.duration = this.audioElement.duration || 0;
        if (this.audioElement.currentTime < TRACK_START_SECONDS) {
          this.audioElement.currentTime = TRACK_START_SECONDS;
          this.currentTime = TRACK_START_SECONDS;
        }
        this.notifyListeners();
      }
    });

    this.audioElement.addEventListener('waiting', () => {
      this.isLoading = true;
      this.notifyListeners();
    });

    this.audioElement.addEventListener('playing', () => {
      this.isLoading = false;
      this.notifyListeners();
    });

    this.audioElement.addEventListener('ended', () => {
      if (this.audioElement) {
        this.audioElement.currentTime = TRACK_START_SECONDS;
        void this.audioElement.play();
      }
    });

    this.audioElement.addEventListener('error', () => {
      console.warn(
        'فایل آهنگ پیدا نشد. لطفاً فایل sheyda.mp3 را در مسیر public/audio قرار دهید.',
      );
      this.isLoading = false;
      this.isPlaying = false;
      this.notifyListeners();
    });
  }

  private async seekToStartOffset() {
    if (!this.audioElement) return;

    if (this.audioElement.readyState < 1) {
      await new Promise<void>((resolve) => {
        this.audioElement!.addEventListener('loadedmetadata', () => resolve(), { once: true });
      });
    }

    if (this.audioElement.currentTime < TRACK_START_SECONDS) {
      this.audioElement.currentTime = TRACK_START_SECONDS;
      this.currentTime = TRACK_START_SECONDS;
    }
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    const state = this.getState();
    this.listeners.forEach((listener) => listener(state));
  }

  public getState(): AudioPlayerState {
    return {
      isPlaying: this.isPlaying,
      currentTrack: ROMANTIC_PLAYLIST[this.currentTrackIndex],
      currentIndex: this.currentTrackIndex,
      currentTime: this.currentTime,
      duration: this.duration,
      volume: this.volume,
      isMuted: this.isMuted,
      isLoading: this.isLoading,
      hasInteracted: this.hasInteracted,
    };
  }

  public async play(): Promise<boolean> {
    this.hasInteracted = true;
    this.initAudioElement();

    if (this.audioElement) {
      try {
        this.audioElement.volume = this.isMuted ? 0 : this.volume;
        this.isLoading = true;
        this.notifyListeners();
        await this.seekToStartOffset();
        await this.audioElement.play();
        this.isPlaying = true;
        this.isLoading = false;
        this.notifyListeners();
        return true;
      } catch (err) {
        // Browser autoplay policy — wait for a user gesture
        console.warn('Playback blocked until user interaction:', err);
        this.isLoading = false;
        this.isPlaying = false;
        this.notifyListeners();
        return false;
      }
    }
    return false;
  }

  public pause() {
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.isPlaying = false;
    this.notifyListeners();
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public selectTrack(index: number) {
    if (index < 0 || index >= ROMANTIC_PLAYLIST.length) return;
    this.currentTrackIndex = index;

    this.initAudioElement();
    if (this.audioElement) {
      const track = ROMANTIC_PLAYLIST[index];
      this.audioElement.src = track.audioUrl;
      this.audioElement.loop = false;
      this.currentTime = TRACK_START_SECONDS;
      this.duration = 0;
      if (this.isPlaying || this.hasInteracted) {
        this.play();
      } else {
        this.notifyListeners();
      }
    }
  }

  public nextTrack() {
    const nextIdx = (this.currentTrackIndex + 1) % ROMANTIC_PLAYLIST.length;
    this.selectTrack(nextIdx);
  }

  public prevTrack() {
    // Restart from the curated start point (0:49), not the absolute beginning
    this.seek(TRACK_START_SECONDS);
  }

  public seek(timeInSeconds: number) {
    if (this.audioElement) {
      const clamped = Math.max(TRACK_START_SECONDS, timeInSeconds);
      this.audioElement.currentTime = clamped;
      this.currentTime = clamped;
      this.notifyListeners();
    }
  }

  public setVolume(newVolume: number) {
    this.volume = Math.max(0, Math.min(1, newVolume));
    if (this.audioElement) {
      this.audioElement.volume = this.isMuted ? 0 : this.volume;
    }
    try {
      localStorage.setItem('wedding_music_vol', this.volume.toString());
    } catch {
      // ignore
    }
    this.notifyListeners();
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.audioElement) {
      this.audioElement.volume = this.isMuted ? 0 : this.volume;
    }
    this.notifyListeners();
    return this.isMuted;
  }
}

export const romanticAudio = new RomanticAudioManager();
