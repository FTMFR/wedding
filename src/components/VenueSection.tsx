import { useState } from 'react';
import { MapPin, Navigation as NavIcon, Sun, Wind, Compass, Copy, Check, ExternalLink } from 'lucide-react';
import { WeddingConfig } from '../types';

interface VenueSectionProps {
  config: WeddingConfig;
}

export default function VenueSection({ config }: VenueSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(config.venueAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="venue" className="py-16 sm:py-28 px-3 sm:px-6 bg-[#F5EFE6] relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#E3D6C5] mb-4 shadow-xs">
            <MapPin className="w-4 h-4 text-[#8C6D37]" />
            <span className="text-xs font-semibold text-[#7A6342] font-persian">
              محل برگزاری عقد
            </span>
          </div>

          <h2 className="font-persian text-3xl min-[360px]:text-4xl sm:text-5xl text-[#2B231D] tracking-tight mb-3 px-2 font-bold">
            {config.venueName}
          </h2>

          <p className="font-persian text-base sm:text-xl text-[#68574B] px-2 leading-relaxed">
            {config.venueAddress}
          </p>
        </div>

        {/* Two-Column Venue Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center bg-white/95 rounded-3xl p-4 sm:p-8 lg:p-10 border border-[#EADBCC] shadow-md">
          {/* Left: Venue Image & Atmospheric Preview */}
          <div className="lg:col-span-6 relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-inner group">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85"
              alt={config.venueName}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20" />

            {/* Weather & Ambience Condition Badge */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-black/65 backdrop-blur-md p-2.5 sm:p-3.5 rounded-xl border border-white/20 text-white flex items-center justify-between gap-2 font-persian">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFDF85] shrink-0" />
                <div>
                  <div className="text-xs sm:text-sm font-semibold">{config.venueName}</div>
                  <div className="text-[11px] sm:text-xs text-white/80">میزبان لحظه‌های عاشقانه عقد و پیوند</div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[#FFDF85] shrink-0">
                <Wind className="w-4 h-4" />
                <span>فضای دلنشین و مجلل</span>
              </div>
            </div>
          </div>

          {/* Right: Venue Information & Logistics */}
          <div className="lg:col-span-6 flex flex-col justify-between font-persian">
            <div>
              <span className="text-xs sm:text-sm text-[#8C6D37] font-semibold block mb-2">
                نشانی دقیق محل برگزاری مراسم عقد
              </span>
              <h3 className="font-persian text-2xl sm:text-3xl text-[#2B231D] mb-2 sm:mb-3 font-bold">
                {config.venueName}
              </h3>
              <p className="text-base sm:text-lg text-[#4A3D33] leading-relaxed mb-5 sm:mb-6 font-medium">
                {config.venueAddress}
              </p>

              {/* Shuttle & Travel Guidelines */}
              <div className="space-y-3 mb-6 sm:mb-8 text-sm">
                <div className="p-3 sm:p-3.5 rounded-xl bg-[#FAF5ED] border border-[#E9DDCF] flex items-start gap-3">
                  <Compass className="w-4 h-4 text-[#8C6D37] shrink-0 mt-1" />
                  <div className="text-xs sm:text-sm text-[#5C4D41] leading-relaxed">
                    <strong>دسترسی آسان:</strong> خیابان جابرانصاری، با دسترسی راحت از تمامی نقاط شهر و جای پارک اختصاصی.
                  </div>
                </div>

                <div className="p-3 sm:p-3.5 rounded-xl bg-[#FAF5ED] border border-[#E9DDCF] flex items-start gap-3">
                  <NavIcon className="w-4 h-4 text-[#8C6D37] shrink-0 mt-1" />
                  <div className="text-xs sm:text-sm text-[#5C4D41] leading-relaxed">
                    <strong>سفره عقد اختصاصی:</strong> سالن مجلل عقد با دیزاین ویژه شمع و گل‌آرایی طبیعی برای ثبت زیباترین خاطرات.
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                id="venue-copy-address-btn"
                type="button"
                onClick={handleCopyAddress}
                className="w-full sm:w-auto px-5 py-3.5 min-h-[44px] rounded-full bg-[#FAF5EE] border border-[#D9C9B8] hover:bg-[#F0E4D5] text-[#55463B] transition-all text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xs touch-manipulation"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>نشانی کپی شد!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#8C6D37]" />
                    <span>کپی نشانی</span>
                  </>
                )}
              </button>

              <a
                id="venue-maps-link"
                href={config.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 min-h-[44px] rounded-full bg-[#8C6D37] text-white hover:bg-[#745729] transition-all text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm cursor-pointer touch-manipulation"
              >
                <NavIcon className="w-4 h-4" />
                <span>مسیریابی در نقشه گوگل</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
