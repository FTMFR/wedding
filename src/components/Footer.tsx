import React from 'react';
import { Heart, Sparkles, Settings, ArrowUp } from 'lucide-react';
import { WeddingConfig } from '../types';

interface FooterProps {
  config: WeddingConfig;
  onOpenSettings: () => void;
}

export default function Footer({ config, onOpenSettings }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#241E1A] text-[#FAF7F2] py-16 px-4 sm:px-6 relative overflow-hidden">
      {/* Decorative top gold line */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Monogram emblem */}
        <div className="w-14 h-14 rounded-full border border-[#D4AF37]/50 flex items-center justify-center bg-[#2F2722] mb-6 shadow-md">
          <span className="font-serif-luxury text-2xl tracking-widest text-[#FFDF85] font-semibold">
            {config.coupleMonogram || 'E & A'}
          </span>
        </div>

        {/* Names */}
        <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#FFFDF9] mb-2 tracking-wide font-normal">
          {config.brideName} &amp; {config.groomName}
        </h3>

        <p className="font-serif-luxury italic text-sm sm:text-base text-[#C2B2A3] max-w-md mb-8">
          "{config.tagline}"
        </p>

        {/* Navigation jump links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-widest text-[#B5A597] mb-8">
          <a href="#dress-atelier" className="py-2 px-1 hover:text-[#FFDF85] transition-colors inline-block">The Dress</a>
          <a href="#itinerary" className="py-2 px-1 hover:text-[#FFDF85] transition-colors inline-block">Itinerary</a>
          <a href="#attire-guide" className="py-2 px-1 hover:text-[#FFDF85] transition-colors inline-block">Dress Code</a>
          <a href="#love-story" className="py-2 px-1 hover:text-[#FFDF85] transition-colors inline-block">Our Story</a>
          <a href="#venue" className="py-2 px-1 hover:text-[#FFDF85] transition-colors inline-block">Sanctuary</a>
          <a href="#rsvp" className="py-2 px-1 hover:text-[#FFDF85] transition-colors inline-block">RSVP</a>
          <a href="#guestbook" className="py-2 px-1 hover:text-[#FFDF85] transition-colors inline-block">Wishes</a>
        </div>

        {/* Sister Dedication Badge */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 px-5 py-3 rounded-2xl sm:rounded-full bg-[#302823] border border-[#52443C] text-xs text-[#DEC8B6] mb-8 max-w-md">
          <div className="flex items-center gap-2">
            <Heart className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37] shrink-0" />
            <span>Made for my beloved sister’s wedding celebration</span>
          </div>
          <button
            type="button"
            onClick={onOpenSettings}
            className="text-[#FFDF85] hover:underline flex items-center gap-1 cursor-pointer font-medium min-h-[36px] px-2 touch-manipulation"
          >
            <Settings className="w-3 h-3" />
            <span>Customize Names</span>
          </button>
        </div>

        {/* Bottom copyright and return to top */}
        <div className="w-full pt-8 border-t border-[#3A3029] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A796C] gap-4">
          <div className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} {config.brideName} &amp; {config.groomName} &bull; All rights reserved.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 min-h-[44px] text-[#C4B4A5] hover:text-white transition-colors uppercase tracking-wider text-[11px] cursor-pointer touch-manipulation"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
