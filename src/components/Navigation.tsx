import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Mail, Settings, Sparkles, Menu, X, Heart, Calendar, Palette, MapPin, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WeddingConfig } from '../types';
import { romanticAudio } from '../utils/romanticAudio';
import { triggerGoldSparkle } from '../utils/confettiEffects';

interface NavigationProps {
  config: WeddingConfig;
  onOpenEnvelope: () => void;
  onOpenSettings: () => void;
  activeSection: string;
}

export default function Navigation({ config, onOpenEnvelope, onOpenSettings, activeSection }: NavigationProps) {
  const [isPlayingMusic, setIsPlayingMusic] = useState(romanticAudio.getState().isPlaying);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = romanticAudio.subscribe((state) => {
      setIsPlayingMusic(state.isPlaying);
    });
    return unsubscribe;
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const toggleMusic = () => {
    const willPlay = !isPlayingMusic;
    romanticAudio.toggle();
    if (willPlay) {
      triggerGoldSparkle();
    }
  };

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'The Dress', labelFa: 'پیراهن عقد عروس', href: '#dress-atelier', icon: Sparkles },
    { label: 'Itinerary', labelFa: 'برنامه روز عقد', href: '#itinerary', icon: Calendar },
    { label: 'Attire Guide', labelFa: 'کد لباس و رنگ‌ها', href: '#attire-guide', icon: Palette },
    { label: 'Our Story', labelFa: 'داستان عشق ما', href: '#love-story', icon: Heart },
    { label: 'Venue', labelFa: 'محل جشن و باغ تالار', href: '#venue', icon: MapPin },
    { label: 'RSVP', labelFa: 'اعلام حضور (RSVP)', href: '#rsvp', highlight: true, icon: Mail },
    { label: 'Wishes', labelFa: 'دفترچه آرزوها و تبریک', href: '#guestbook', icon: MessageSquare },
  ];

  return (
    <header
      id="main-navigation-bar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-xs border-b border-[#E8DFD5]/80 py-2.5 sm:py-3'
          : 'bg-transparent py-3.5 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between">
        {/* Left: Monogram brand */}
        <a
          id="nav-brand-monogram"
          href="#top"
          className="flex items-center gap-2 group cursor-pointer touch-manipulation"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#D4AF37]/60 flex items-center justify-center bg-[#FDFBF7] shadow-xs group-hover:border-[#D4AF37] transition-colors shrink-0">
            <span className="font-serif-luxury text-base sm:text-lg tracking-widest text-[#8C6D37] font-medium">
              {config.coupleMonogram || 'P & M'}
            </span>
          </div>
          <div className="text-left">
            <span className="block font-serif-luxury text-sm sm:text-base tracking-widest uppercase text-[#3A322D] font-semibold leading-tight">
              {config.coupleMonogram || 'P & M'}
            </span>
            <span className="block text-xs sm:text-sm text-[#8A7E74] font-persian leading-tight">
              جشن عقد و پیوند عاشقانه‌مان
            </span>
          </div>
        </a>

        {/* Center: Desktop navigation links */}
        <nav id="desktop-nav-menu" className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.label}
                id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                href={link.href}
                className={`text-sm tracking-wider uppercase transition-colors relative py-1 ${
                  link.highlight
                    ? 'px-4 py-1.5 rounded-full bg-[#8C6D37] text-white hover:bg-[#73582B] shadow-xs font-medium'
                    : isActive
                    ? 'text-[#8C6D37] font-semibold'
                    : 'text-[#5C524A] hover:text-[#8C6D37]'
                }`}
              >
                {link.label}
                {link.label === 'The Dress' && (
                  <span className="ml-1 inline-block">
                    <Sparkles className="w-3 h-3 inline text-[#D4AF37] animate-pulse" />
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Right action controls */}
        <div id="nav-action-controls" className="flex items-center gap-1.5 sm:gap-3">
          {/* Ambient Music button */}
          <button
            id="nav-audio-toggle-btn"
            type="button"
            onClick={toggleMusic}
            title={isPlayingMusic ? 'Pause romantic wedding music' : 'Play romantic wedding music'}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 min-h-[38px] sm:min-h-[40px] rounded-full border text-xs tracking-wider uppercase transition-all cursor-pointer touch-manipulation ${
              isPlayingMusic
                ? 'bg-[#EFE5D8] border-[#D4AF37] text-[#73582B] shadow-xs'
                : 'bg-white/80 border-[#E5DACD] text-[#6B5E54] hover:bg-[#F7F2EA] hover:border-[#D4AF37]'
            }`}
          >
            {isPlayingMusic ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#8C6D37] shrink-0" />
                <span className="hidden sm:inline font-medium flex items-center gap-1">
                  <span>Romantic Music</span>
                  <span className="flex items-end gap-0.5 h-2.5">
                    <span className="w-0.5 h-2 bg-[#8C6D37] animate-pulse rounded-full" />
                    <span className="w-0.5 h-3 bg-[#8C6D37] animate-pulse delay-75 rounded-full" />
                    <span className="w-0.5 h-1.5 bg-[#8C6D37] animate-pulse delay-150 rounded-full" />
                  </span>
                </span>
                <span className="sm:hidden text-[10px] font-medium text-[#8C6D37]">موزیک</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#9E9085] shrink-0" />
                <span className="hidden sm:inline">Play Music</span>
                <span className="sm:hidden text-[10px] text-[#8A7B6F]">موزیک</span>
              </>
            )}
          </button>

          {/* Reopen Envelope Card */}
          <button
            id="nav-reopen-envelope-btn"
            type="button"
            onClick={onOpenEnvelope}
            title="گشودن کارت دعوت عقد / Open wedding invitation"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 min-h-[38px] sm:min-h-[40px] rounded-full bg-white/80 border border-[#E5DACD] text-xs uppercase tracking-wider text-[#6B5E54] hover:border-[#D4AF37] hover:text-[#8C6D37] transition-all cursor-pointer touch-manipulation"
          >
            <Mail className="w-3.5 h-3.5 text-[#8C6D37] shrink-0" />
            <span className="text-[11px] sm:text-xs font-persian font-medium">کارت دعوت</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-nav-hamburger-btn"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'بستن منو' : 'باز کردن منو'}
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center border border-[#E5DACD] bg-white/90 text-[#5C4F44] hover:text-[#8C6D37] hover:border-[#D4AF37] transition-all cursor-pointer min-w-[36px] min-h-[36px] touch-manipulation shadow-xs"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          {/* Customize Sister's Wedding Data (Desktop) */}
          <button
            id="nav-customize-settings-btn"
            type="button"
            onClick={onOpenSettings}
            title="Sister's Wedding Settings & Names"
            className="hidden sm:flex w-8 h-8 rounded-full items-center justify-center border border-[#E5DACD] bg-white/80 text-[#6B5E54] hover:text-[#8C6D37] hover:border-[#D4AF37] transition-colors touch-manipulation"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-[#FAF7F2]/98 border-b border-[#E7DCD0] shadow-xl backdrop-blur-lg"
          >
            <div className="px-4 py-5 space-y-2 max-h-[75vh] overflow-y-auto">
              <div className="pb-3 mb-2 border-b border-[#EADBCC] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#F3EADF] border border-[#D4AF37]/50 flex items-center justify-center text-[#8C6D37] font-serif-luxury text-xs font-bold">
                    {config.coupleMonogram || 'P & M'}
                  </div>
                  <span className="font-persian text-sm sm:text-base font-semibold text-[#4A3D33]">
                    فهرست بخش‌های دعوتنامه جشن عقد
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-[#8A796C] hover:text-[#3A2E25] p-1 font-persian"
                >
                  بستن ✕
                </button>
              </div>

              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => handleNavClick(link.href)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all text-left min-h-[46px] touch-manipulation cursor-pointer ${
                      link.highlight
                        ? 'bg-[#8C6D37] text-white shadow-xs'
                        : isActive
                        ? 'bg-[#FAF1E4] text-[#8C6D37] font-semibold border border-[#E4D5C3]'
                        : 'bg-white/70 text-[#54463C] hover:bg-white border border-[#EFE5D9]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 ${
                          link.highlight ? 'text-white' : 'text-[#8C6D37]'
                        }`}
                      />
                      <span className="font-persian text-base sm:text-lg font-medium">
                        {link.labelFa}
                      </span>
                    </div>
                    <span
                      className={`text-xs uppercase tracking-wider ${
                        link.highlight ? 'text-white/80' : 'text-[#968678]'
                      }`}
                    >
                      {link.label}
                    </span>
                  </button>
                );
              })}

              {/* Sister Settings in Mobile Menu */}
              <div className="pt-2 border-t border-[#EADBCC] flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSettings();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#F0E6D8] text-[#5A4B40] text-sm font-medium font-persian min-h-[44px] touch-manipulation"
                >
                  <Settings className="w-4 h-4 text-[#8C6D37]" />
                  <span>تنظیم نام‌ها و جزئیات جشن عقد (Sister Customizer)</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
