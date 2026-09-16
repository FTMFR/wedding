import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Quote, MapPin } from 'lucide-react';
import { storyMilestones } from '../data/weddingData';
import { WeddingConfig } from '../types';

interface StoryGallerySectionProps {
  config: WeddingConfig;
}

export default function StoryGallerySection({ config }: StoryGallerySectionProps) {
  const [activeStoryIndex, setActiveStoryIndex] = useState(2); // default on Dress fitting story

  return (
    <section id="love-story" className="py-16 sm:py-28 px-3 sm:px-6 bg-[#FAF7F2] relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E4D7C5] mb-4 shadow-xs">
            <Heart className="w-3.5 h-3.5 text-[#8C6D37]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A6342] font-medium">
              Chapters of Devotion
            </span>
          </div>

          <h2 className="font-persian text-3xl min-[360px]:text-4xl sm:text-5xl lg:text-6xl text-[#2B231D] tracking-tight mb-3 px-2">
            {config.storyHeading}
          </h2>

          <p className="font-persian text-base sm:text-xl text-[#756558] px-2 leading-relaxed">
            روایتی از آغاز دلدادگی و پیمان ابدی در جشن باشکوه عقد.
          </p>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {storyMilestones.map((item, idx) => {
            const isActive = activeStoryIndex === idx;
            return (
              <div
                key={item.year}
                id={`story-card-${idx}`}
                onClick={() => setActiveStoryIndex(idx)}
                className={`rounded-3xl overflow-hidden bg-white border transition-all duration-300 cursor-pointer flex flex-col group touch-manipulation ${
                  isActive
                    ? 'shadow-xl border-[#8C6D37] ring-2 ring-[#8C6D37]/20 -translate-y-1 sm:-translate-y-2'
                    : 'shadow-xs border-[#E8DCD0] hover:border-[#8C6D37]/50 hover:shadow-md'
                }`}
              >
                {/* Photo container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#EFE6DC]">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Year Tag */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-serif-luxury font-bold text-[#3B2F25] shadow-xs">
                    {item.year}
                  </div>

                  {/* Location badge */}
                  <div className="absolute bottom-3 left-3 sm:left-4 flex items-center gap-1.5 text-xs text-white/90">
                    <MapPin className="w-3.5 h-3.5 text-[#FFDF85] shrink-0" />
                    <span className="truncate">{item.subtitle}</span>
                  </div>
                </div>

                {/* Body Text */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#2B231D] mb-2 font-semibold group-hover:text-[#8C6D37] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#635347] leading-relaxed font-sans-clean">
                      {item.description}
                    </p>
                  </div>

                  {idx === 2 && (
                    <div className="mt-4 pt-3 border-t border-[#EFE5D8] flex items-center gap-1.5 text-[11px] text-[#8C6D37] font-medium">
                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
                      <span>The Dream Wedding Dress Moment</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Sister & Couple Love Quote Banner */}
        <div className="mt-10 sm:mt-14 p-6 sm:p-10 rounded-3xl bg-linear-to-r from-[#FAF3EA] via-[#F4EDE2] to-[#FAF3EA] border border-[#E7D9C9] text-center relative overflow-hidden shadow-xs">
          <Quote className="w-7 h-7 sm:w-8 sm:h-8 text-[#8C6D37]/30 mx-auto mb-3" />
          <p className="font-serif-luxury italic text-lg sm:text-2xl text-[#3D322A] max-w-2xl mx-auto mb-3 font-light leading-relaxed">
            {config.storyQuote}
          </p>
          <span className="text-xs uppercase tracking-[0.25em] text-[#8C6D37] font-semibold">
            {config.brideName} &amp; {config.groomName}
          </span>
        </div>
      </div>
    </section>
  );
}
