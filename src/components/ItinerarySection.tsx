import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Clock,
  MapPin,
  Sparkles,
  HeartHandshake,
  Sun,
  Utensils,
  Moon,
  GlassWater,
  Shirt,
  Calendar,
} from 'lucide-react';
import { EventScheduleItem } from '../types';
import { weddingSchedule } from '../data/weddingData';

interface ItinerarySectionProps {
  weddingDate: string;
}

const iconMap: Record<string, typeof Clock> = {
  GlassWater,
  HeartHandshake,
  Sun,
  Utensils,
  Sparkles,
  Moon,
};

export default function ItinerarySection({ weddingDate }: ItinerarySectionProps) {
  const [selectedEventId, setSelectedEventId] = useState<string>(weddingSchedule[1].id);

  const formattedDay = new Date(weddingDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <section id="itinerary" className="py-16 sm:py-28 px-3 sm:px-6 bg-[#FAF7F2] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E3D6C5] mb-4 shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-[#8C6D37]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A6342] font-medium">
              Order of Events
            </span>
          </div>

          <h2 className="font-persian text-3xl min-[360px]:text-4xl sm:text-5xl text-[#2B231D] tracking-tight mb-3 px-2 font-bold">
            برنامه زمانی جشن عقد
          </h2>

          <p className="font-persian text-base sm:text-xl text-[#736357] px-2 leading-relaxed">
            ۱۴۰۵/۰۷/۰۳ (۳ مهر ۱۴۰۵) &bull; لحظه‌هایی پر از عشق، سوگند پیمان آسمانی و ثبت زیباترین خاطرات مشترک.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Vertical Center Guideline on desktop */}
          <div className="hidden md:block absolute top-6 bottom-6 left-1/2 -translate-x-1/2 w-px bg-linear-to-b from-transparent via-[#D4AF37]/50 to-transparent" />

          <div className="space-y-4 sm:space-y-6 md:space-y-12">
            {weddingSchedule.map((item, index) => {
              const IconComponent = iconMap[item.iconName] || Sparkles;
              const isEven = index % 2 === 0;
              const isSelected = selectedEventId === item.id;

              return (
                <div
                  key={item.id}
                  id={`itinerary-card-${item.id}`}
                  onClick={() => setSelectedEventId(item.id)}
                  className={`relative flex flex-col md:flex-row items-center cursor-pointer group touch-manipulation ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card */}
                  <div className="w-full md:w-[46%]">
                    <div
                      className={`p-5 sm:p-7 rounded-2xl transition-all duration-300 border ${
                        isSelected
                          ? 'bg-white shadow-lg border-[#8C6D37]/60 ring-2 ring-[#8C6D37]/20 -translate-y-0.5'
                          : 'bg-white/70 hover:bg-white border-[#E7DCD0] shadow-xs hover:border-[#8C6D37]/40'
                      }`}
                    >
                      {/* Top bar: Time + Icon */}
                      <div className="flex items-center justify-between gap-2 flex-wrap mb-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EE] border border-[#E9DDCF]">
                          <Clock className="w-3.5 h-3.5 text-[#8C6D37]" />
                          <span className="font-serif-luxury text-sm sm:text-base font-bold text-[#3B3027]">
                            {item.time}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-[#8A796B]">
                          <MapPin className="w-3.5 h-3.5 text-[#8C6D37] shrink-0" />
                          <span className="truncate max-w-[200px]">{item.location}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#2B231D] mb-2 font-semibold group-hover:text-[#8C6D37] transition-colors">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#5B4E44] leading-relaxed mb-4 font-sans-clean">
                        {item.description}
                      </p>

                      {/* Dress code cue */}
                      {item.dressNote && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#F7EFE4] text-xs text-[#78613F] border border-[#EBDCCB]">
                          <Shirt className="w-3 h-3 text-[#8C6D37] shrink-0" />
                          <span>Gown &amp; Style: <strong>{item.dressNote}</strong></span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Center Node on Desktop */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#FAF7F2] border-2 border-[#D4AF37] items-center justify-center shadow-xs z-10 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-4 h-4 text-[#8C6D37]" />
                  </div>

                  {/* Spacer for the opposite column */}
                  <div className="hidden md:block w-[46%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
