import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Music,
  ChevronDown,
  ChevronUp,
  Disc3,
  Heart,
  Sparkles,
  ListMusic,
} from 'lucide-react';
import { romanticAudio, ROMANTIC_PLAYLIST, AudioPlayerState } from '../utils/romanticAudio';
import { triggerGoldSparkle } from '../utils/confettiEffects';

export default function RomanticMusicPlayer() {
  const [playerState, setPlayerState] = useState<AudioPlayerState>(romanticAudio.getState());
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);

  useEffect(() => {
    const unsubscribe = romanticAudio.subscribe((state) => {
      setPlayerState({ ...state });
    });

    // Try autoplay when visiting the card; browsers may block until a gesture
    void romanticAudio.play();

    const unlockMusic = () => {
      if (!romanticAudio.getState().isPlaying) {
        void romanticAudio.play();
      }
      window.removeEventListener('pointerdown', unlockMusic);
      window.removeEventListener('keydown', unlockMusic);
      window.removeEventListener('touchstart', unlockMusic);
    };

    window.addEventListener('pointerdown', unlockMusic, { once: true });
    window.addEventListener('keydown', unlockMusic, { once: true });
    window.addEventListener('touchstart', unlockMusic, { once: true });

    return () => {
      unsubscribe();
      window.removeEventListener('pointerdown', unlockMusic);
      window.removeEventListener('keydown', unlockMusic);
      window.removeEventListener('touchstart', unlockMusic);
    };
  }, []);

  const handleTogglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const willPlay = !playerState.isPlaying;
    romanticAudio.toggle();
    if (willPlay) {
      triggerGoldSparkle();
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    romanticAudio.nextTrack();
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    romanticAudio.prevTrack();
  };

  const handleSelectTrack = (index: number) => {
    romanticAudio.selectTrack(index);
    triggerGoldSparkle();
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const currentTrack = playerState.currentTrack || ROMANTIC_PLAYLIST[0];
  const progressPercent =
    playerState.duration > 0 ? (playerState.currentTime / playerState.duration) * 100 : 0;

  return (
    <aside
      id="floating-romantic-music-player"
      aria-label="Romantic Wedding Music Player"
      className="fixed z-40 select-none max-w-[calc(100vw-1.5rem)] w-auto right-3 sm:right-5"
      style={{
        bottom: 'max(0.75rem, env(safe-area-inset-bottom))',
      }}
    >
      <AnimatePresence>
        {isExpanded ? (
          /* Expanded Luxury Player Card */
          <motion.div
            key="expanded-player"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="w-[calc(100vw-24px)] sm:w-[380px] max-w-sm bg-[#FAF7F2] rounded-3xl p-4 sm:p-5 border border-[#E8DCD0] shadow-2xl text-[#2E241E] backdrop-blur-md max-h-[85vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#EAE0D4] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#F3ECE2] border border-[#D4AF37]/50 flex items-center justify-center text-[#8C6D37]">
                  <Music className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-serif-luxury text-sm font-semibold tracking-wide text-[#342820]">
                    موسیقی کارت دعوت
                  </h4>
                  <p className="text-[10px] uppercase tracking-wider text-[#8C7A6D]">
                    قطعه شیدا · علیرضا قربانی
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setShowPlaylist(!showPlaylist)}
                  className={`p-1.5 rounded-full text-xs transition-colors cursor-pointer ${
                    showPlaylist
                      ? 'bg-[#8C6D37] text-white'
                      : 'bg-[#F2EAE0] text-[#6E5D50] hover:bg-[#E7DDD0]'
                  }`}
                  title="View Playlist"
                  aria-label="View Playlist"
                >
                  <ListMusic className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="p-1.5 rounded-full bg-[#F2EAE0] text-[#6E5D50] hover:bg-[#E7DDD0] transition-colors cursor-pointer"
                  title="Minimize Player"
                  aria-label="Minimize Player"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Active Track Artwork & Info */}
            <div className="flex gap-3.5 items-center mb-4">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-md shrink-0 border border-[#E3D6C5]">
                <img
                  src={currentTrack.coverImage}
                  alt={currentTrack.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    playerState.isPlaying ? 'scale-105' : 'scale-100'
                  }`}
                />
                <div className="absolute inset-0 bg-black/15 flex items-center justify-center">
                  <Disc3
                    className={`w-7 h-7 text-[#FAF7F2] ${
                      playerState.isPlaying ? 'animate-spin' : ''
                    }`}
                    style={{ animationDuration: '6s' }}
                  />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <span className="inline-block px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider bg-[#F0E6D8] text-[#8C6D37] font-semibold mb-1">
                  {currentTrack.category}
                </span>
                <h5 className="font-serif-luxury text-base font-bold text-[#2A211B] truncate">
                  {currentTrack.title}
                </h5>
                <p className="text-xs text-[#7A695C] truncate">{currentTrack.composer}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div
                className="relative w-full h-1.5 bg-[#E8DDD0] rounded-full cursor-pointer overflow-hidden group"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                  romanticAudio.seek(ratio * playerState.duration);
                }}
              >
                <div
                  className="h-full bg-linear-to-r from-[#C29D55] to-[#8C6D37] rounded-full transition-all duration-100"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-[#8C7A6D] mt-1 font-mono">
                <span>{formatTime(playerState.currentTime)}</span>
                <span>{formatTime(playerState.duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => romanticAudio.toggleMute()}
                  className="p-2 text-[#7A695C] hover:text-[#2A211B] transition-colors cursor-pointer"
                  aria-label={playerState.isMuted ? 'Unmute' : 'Mute'}
                >
                  {playerState.isMuted || playerState.volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-[#B8705C]" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={playerState.isMuted ? 0 : playerState.volume}
                  onChange={(e) => romanticAudio.setVolume(parseFloat(e.target.value))}
                  className="w-16 accent-[#8C6D37] h-1 bg-[#E8DDD0] rounded-lg cursor-pointer"
                  aria-label="Volume slider"
                />
              </div>

              {/* Main playback control buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-full bg-[#F2EAE0] text-[#5A493D] flex items-center justify-center hover:bg-[#E8DDCF] transition-colors cursor-pointer"
                  title="Previous piece"
                  aria-label="Previous piece"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  id="music-player-main-play-btn"
                  type="button"
                  onClick={handleTogglePlay}
                  className="w-11 h-11 rounded-full bg-linear-to-br from-[#A68345] to-[#73582B] text-white flex items-center justify-center shadow-lg hover:brightness-105 active:scale-95 transition-all cursor-pointer"
                  title={playerState.isPlaying ? 'Pause music' : 'Play music'}
                  aria-label={playerState.isPlaying ? 'Pause music' : 'Play music'}
                >
                  {playerState.isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-8 h-8 rounded-full bg-[#F2EAE0] text-[#5A493D] flex items-center justify-center hover:bg-[#E8DDCF] transition-colors cursor-pointer"
                  title="Next piece"
                  aria-label="Next piece"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Romantic sparkle status */}
              <div className="flex items-center gap-1 text-[#C29D55]" title="Romantic Audio Active">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
            </div>

            {/* Playlist Drawer */}
            <AnimatePresence>
              {showPlaylist && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden border-t border-[#EAE0D4] pt-3"
                >
                  <div className="text-[10px] uppercase tracking-wider text-[#8A796C] font-semibold mb-2">
                    Select Wedding Piece:
                  </div>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {ROMANTIC_PLAYLIST.map((track, idx) => {
                      const isCurrent = idx === playerState.currentIndex;
                      return (
                        <button
                          key={track.id}
                          type="button"
                          onClick={() => handleSelectTrack(idx)}
                          className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                            isCurrent
                              ? 'bg-[#EFE5D6] border border-[#D4AF37]/50 text-[#3D2F24] font-medium'
                              : 'hover:bg-[#F4EDE3] text-[#615144]'
                          }`}
                        >
                          <div className="min-w-0 flex items-center gap-2">
                            <span className="w-4 text-[11px] text-[#9E8B7D] font-mono">
                              {idx + 1}.
                            </span>
                            <div className="truncate">
                              <p className="truncate font-semibold">{track.title}</p>
                              <p className="text-[10px] text-[#8C7A6D] truncate">
                                {track.composer}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0 ml-2">
                            <span className="text-[10px] text-[#8C7A6D]">
                              {track.durationFormatted}
                            </span>
                            {isCurrent && playerState.isPlaying && (
                              <span className="w-2 h-2 rounded-full bg-[#8C6D37] animate-ping" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Compact Luxury Floating Pill */
          <motion.div
            key="compact-player"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex items-center gap-2 bg-[#FAF7F2]/95 backdrop-blur-md rounded-full px-3.5 py-2 border border-[#D4AF37]/40 shadow-xl text-[#2E241E] hover:border-[#D4AF37] transition-all cursor-pointer group"
            onClick={() => setIsExpanded(true)}
          >
            {/* Animated Vinyl / Monogram disc */}
            <div className="relative w-8 h-8 rounded-full bg-linear-to-tr from-[#3D3028] to-[#1E1713] flex items-center justify-center shadow-xs overflow-hidden shrink-0 border border-[#D4AF37]/60">
              <Disc3
                className={`w-5 h-5 text-[#FFDF85] transition-all ${
                  playerState.isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '4s' }}
              />
              {playerState.isPlaying && (
                <div className="absolute inset-0 bg-[#D4AF37]/10 animate-pulse" />
              )}
            </div>

            {/* Song title & Visualizer Wave bars */}
            <div className="flex flex-col min-w-0 pr-1 max-w-[140px] sm:max-w-[190px]">
              <div className="flex items-center gap-1.5">
                <span className="font-serif-luxury text-xs font-semibold truncate text-[#2A211B]">
                  {currentTrack.title}
                </span>
                {/* Visualizer sound equalizer bars */}
                {playerState.isPlaying ? (
                  <div className="flex items-end gap-0.5 h-3 shrink-0">
                    <span className="w-0.5 bg-[#8C6D37] rounded-full animate-[bounce_0.8s_infinite] h-2" />
                    <span className="w-0.5 bg-[#8C6D37] rounded-full animate-[bounce_1.1s_infinite] h-3" />
                    <span className="w-0.5 bg-[#8C6D37] rounded-full animate-[bounce_0.6s_infinite] h-1.5" />
                  </div>
                ) : (
                  <span className="text-[9px] text-[#A69485] font-sans">متوقف</span>
                )}
              </div>
              <span className="text-[10px] text-[#7A695C] truncate">
                {currentTrack.composer}
              </span>
            </div>

            {/* Quick Play/Pause Button */}
            <button
              id="compact-music-play-btn"
              type="button"
              onClick={handleTogglePlay}
              className="w-8 h-8 rounded-full bg-[#8C6D37] hover:bg-[#73582B] text-white flex items-center justify-center shrink-0 shadow-xs transition-colors cursor-pointer"
              title={playerState.isPlaying ? 'Pause music' : 'Play romantic music'}
              aria-label={playerState.isPlaying ? 'Pause music' : 'Play romantic music'}
            >
              {playerState.isPlaying ? (
                <Pause className="w-3.5 h-3.5 fill-current" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              )}
            </button>

            {/* Expand arrow */}
            <div className="text-[#8C7A6D] group-hover:text-[#4A3B30] transition-colors pl-0.5">
              <ChevronUp className="w-3.5 h-3.5" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
