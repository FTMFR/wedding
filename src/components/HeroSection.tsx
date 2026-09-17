import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Sparkles, Heart, ArrowDown, Download, Clock, Music, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { WeddingConfig } from '../types';
import { triggerWeddingPetals, triggerGoldSparkle } from '../utils/confettiEffects';
import { romanticAudio, AudioPlayerState } from '../utils/romanticAudio';

interface HeroSectionProps {
  config: WeddingConfig;
  onExploreDress: () => void;
  onOpenEnvelope: () => void;
}

export default function HeroSection({ config, onExploreDress, onOpenEnvelope }: HeroSectionProps) {
  const [audioState, setAudioState] = useState<AudioPlayerState>(romanticAudio.getState());

  useEffect(() => {
    const unsub = romanticAudio.subscribe((state) => {
      setAudioState({ ...state });
    });
    return unsub;
  }, []);

  const handleToggleAudio = () => {
    const willPlay = !audioState.isPlaying;
    romanticAudio.toggle();
    if (willPlay) {
      triggerGoldSparkle();
    }
  };
  // Countdown calculation
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(config.weddingDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [config.weddingDate]);

  // Generate calendar .ics file download
  const handleDownloadCalendar = () => {
    triggerWeddingPetals();
    const eventDate = new Date(config.weddingDate);
    const startStr = eventDate.toISOString().replace(/-|:|\.\d\d\d/g, '');
    const endDate = new Date(eventDate.getTime() + 8 * 60 * 60 * 1000);
    const endStr = endDate.toISOString().replace(/-|:|\.\d\d\d/g, '');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Wedding Invitation//EN',
      'BEGIN:VEVENT',
      `SUMMARY:Wedding of ${config.brideName} & ${config.groomName}`,
      `DESCRIPTION:${config.tagline}. Gown Theme: ${config.dressTheme}`,
      `LOCATION:${config.venueName}, ${config.venueAddress}`,
      `DTSTART:${startStr}`,
      `DTEND:${endStr}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Wedding_${config.brideName}_and_${config.groomName}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formattedDate = new Date(config.weddingDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-3 sm:px-6 pt-20 sm:pt-24 pb-12 sm:pb-16 overflow-hidden"
    >
      {/* Subtle animated background radial glow & soft silk textures */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#F3E5D3]/60 blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-80 sm:w-[32rem] h-80 sm:h-[32rem] rounded-full bg-[#EFE1D3]/50 blur-3xl" />
        <div className="absolute -bottom-24 left-1/4 w-60 sm:w-80 h-60 sm:h-80 rounded-full bg-[#EAE0D5]/40 blur-3xl" />
      </div>

      {/* Floating veil silk ribbon accents */}
      <div className="absolute top-12 left-8 w-24 h-64 border-l border-[#D4AF37]/30 rounded-tl-full opacity-40 animate-veil pointer-events-none hidden lg:block" />
      <div className="absolute top-24 right-10 w-28 h-72 border-r border-[#D4AF37]/30 rounded-tr-full opacity-40 animate-veil pointer-events-none hidden lg:block" />

      {/* Content wrapper */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center w-full">
        {/* Editorial Eyebrow Tag */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-[#F3EDE3] border border-[#E5D7C5] mb-4 sm:mb-6 shadow-xs"
        >
          <Sparkles className="w-4 h-4 text-[#8C6D37] shrink-0" />
          <span className="text-xs sm:text-sm md:text-base text-[#7A6342] font-medium font-persian">
            دعوتنامه‌ای ویژه برای عقد &bull; {config.coupleMonogram || 'P & M'}
          </span>
        </motion.div>

        {/* Formal Invitation Line */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl min-[360px]:text-2xl sm:text-3xl md:text-4xl text-[#7A685A] mb-3 sm:mb-4 font-persian font-semibold px-2"
        >
          برای شما و خانواده گرامیتان
        </motion.p>

        {/* Big Names Typography */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif-luxury text-5xl min-[360px]:text-6xl sm:text-8xl md:text-9xl text-[#2B231D] tracking-tight leading-[1.06] mb-4 sm:mb-5 font-normal break-words px-2"
        >
          <span>{config.coupleMonogram || `${config.brideName} & ${config.groomName}`}</span>
        </motion.h1>

        {/* Persian Invitation Quote / Statement */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-persian text-xl min-[360px]:text-2xl sm:text-3xl lg:text-4xl text-[#42352B] max-w-3xl mx-auto mb-6 sm:mb-8 font-normal leading-loose sm:leading-[2.4] px-2"
        >
          {config.storyQuote}
        </motion.p>

        {/* Destination Warm Welcome Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#FAF3EA] border border-[#D4AF37]/50 text-[#8C6D37] text-sm sm:text-base md:text-lg font-medium mb-6 sm:mb-8 font-persian shadow-xs"
        >
          <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0" />
          <span>منتظر حضور گرم شما هستیم</span>
        </motion.div>

        {/* Date & Location Pill Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-5 text-sm sm:text-base text-[#5C4F44] mb-8 sm:mb-12 border-y border-[#E8DCD0] py-3 sm:py-3.5 px-3 sm:px-6 w-full max-w-2xl font-persian"
        >
          <span className="flex items-center gap-2 font-bold text-[#3A2E25]">
            <Calendar className="w-4 h-4 text-[#8C6D37] shrink-0" />
            {config.shamsiDate || '۱۴۰۵/۰۷/۰۳'}
          </span>
          <span className="hidden sm:inline text-[#C5B3A1]">•</span>
          <span className="font-semibold text-[#3A2E25]">{config.venueName}</span>
          <span className="hidden sm:inline text-[#C5B3A1]">•</span>
          <span className="text-xs sm:text-sm text-[#68574B]">{config.venueAddress}</span>
        </motion.div>

        {/* Interactive Live Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-full max-w-2xl mb-8 sm:mb-12 px-1"
        >
          <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#8C6D37] mb-3 font-medium flex items-center justify-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Counting Down to The Sacred Vows</span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 min-[360px]:gap-2 sm:gap-4">
            {[
              { value: timeLeft.days, label: 'Days' },
              { value: timeLeft.hours, label: 'Hours' },
              { value: timeLeft.minutes, label: 'Minutes' },
              { value: timeLeft.seconds, label: 'Seconds' },
            ].map((unit, idx) => (
              <div
                key={unit.label}
                id={`countdown-${unit.label.toLowerCase()}`}
                className="bg-white/80 backdrop-blur-xs rounded-xl p-2 min-[360px]:p-3 sm:p-5 border border-[#E9DFD4] shadow-xs hover:border-[#D4AF37]/60 transition-colors"
              >
                <div className="font-serif-luxury text-2xl min-[360px]:text-3xl sm:text-5xl font-semibold text-[#302620] leading-none mb-1">
                  {String(unit.value).padStart(2, '0')}
                </div>
                <div className="text-[9px] min-[360px]:text-[10px] sm:text-xs uppercase tracking-wider text-[#8A7C70] font-sans-clean font-medium">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-4 w-full sm:w-auto"
        >
          {/* Primary Action: Go to Dress Atelier */}
          <button
            id="hero-explore-dress-btn"
            type="button"
            onClick={onExploreDress}
            className="w-full sm:w-auto px-6 sm:px-7 py-3.5 min-h-[44px] rounded-full bg-[#8C6D37] text-white hover:bg-[#725627] transition-all font-medium text-xs sm:text-sm uppercase tracking-widest shadow-md flex items-center justify-center gap-2 group cursor-pointer touch-manipulation"
          >
            <Sparkles className="w-4 h-4 text-[#FFDF85] group-hover:rotate-12 transition-transform" />
            <span>Experience The Wedding Dress</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>

          {/* Secondary Action: Save to Calendar */}
          <button
            id="hero-download-ics-btn"
            type="button"
            onClick={handleDownloadCalendar}
            className="w-full sm:w-auto px-5 sm:px-6 py-3.5 min-h-[44px] rounded-full bg-white border border-[#DDD0C2] text-[#55473D] hover:border-[#8C6D37] hover:text-[#8C6D37] transition-all text-xs sm:text-sm uppercase tracking-widest shadow-xs flex items-center justify-center gap-2 cursor-pointer touch-manipulation"
          >
            <Download className="w-4 h-4 text-[#8C6D37]" />
            <span>Save The Date</span>
          </button>

          {/* Romantic Music Toggle Button */}
          <button
            id="hero-toggle-romantic-music-btn"
            type="button"
            onClick={handleToggleAudio}
            className={`w-full sm:w-auto px-5 py-3.5 min-h-[44px] rounded-full border transition-all text-xs sm:text-sm uppercase tracking-widest shadow-xs flex items-center justify-center gap-2 cursor-pointer touch-manipulation ${
              audioState.isPlaying
                ? 'bg-[#F2EAE0] border-[#D4AF37] text-[#73582B]'
                : 'bg-white border-[#DDD0C2] text-[#55473D] hover:border-[#8C6D37] hover:text-[#8C6D37]'
            }`}
          >
            {audioState.isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-[#8C6D37] text-[#8C6D37]" />
                <span>Pause Romantic Music</span>
                <span className="flex items-end gap-0.5 h-2.5">
                  <span className="w-0.5 h-2 bg-[#8C6D37] animate-pulse rounded-full" />
                  <span className="w-0.5 h-3 bg-[#8C6D37] animate-pulse delay-75 rounded-full" />
                  <span className="w-0.5 h-1.5 bg-[#8C6D37] animate-pulse delay-150 rounded-full" />
                </span>
              </>
            ) : (
              <>
                <Music className="w-4 h-4 text-[#8C6D37]" />
                <span>Play Romantic Music</span>
              </>
            )}
          </button>

          {/* Re-open Envelope */}
          <button
            id="hero-open-envelope-btn"
            type="button"
            onClick={onOpenEnvelope}
            className="w-full sm:w-auto px-5 py-3.5 min-h-[44px] rounded-full bg-[#FAF3EA] border border-[#E8DCCE] text-[#695A4E] hover:bg-[#F3E7D8] transition-all text-xs sm:text-sm uppercase tracking-widest shadow-xs flex items-center justify-center gap-2 cursor-pointer touch-manipulation"
          >
            <Heart className="w-4 h-4 text-[#8C6D37]" />
            <span className="font-persian text-sm sm:text-base font-medium">دعوتنامه و مهر موم</span>
          </button>
        </motion.div>
      </div>

      {/* Gentle bottom scroll prompt */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center pointer-events-none hidden sm:block">
        <div className="flex flex-col items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-[#A6978A]">
          <span>Scroll to uncover</span>
          <div className="w-px h-6 bg-linear-to-b from-[#C5B3A1] to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}
