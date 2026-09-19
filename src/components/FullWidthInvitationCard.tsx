import { motion } from 'motion/react';
import { Calendar, MapPin, Navigation, Heart, Clock, ExternalLink } from 'lucide-react';
import { WeddingConfig } from '../types';
import { triggerWeddingPetals } from '../utils/confettiEffects';

const HERO_IMAGE = {
  url: '/card.jpeg',
  title: 'حلقه‌های عقد روی گل‌های صورتی',
};

const VENUE_ADDRESS_PREFIX = 'خیابان جابرانصاری،بین کوچه ';
const VENUE_ADDRESS_SUFFIX = ' و ';
const VENUE_ADDRESS_END = '، خانه عقد آوین';

const NESHAN_PLACE_ID = 'f02ea3f41f2882c01772581103cc2ff0';
const NESHAN_MAP_URL = `https://neshan.org/maps/places/${NESHAN_PLACE_ID}#c32.704-51.671-21z-0p/32.70433931273475/51.671024689537326`;
const NESHAN_EMBED_URL = `https://neshan.org/maps/iframe/places/${NESHAN_PLACE_ID}#c32.704-51.671-21z-0p/32.70433931273475/51.671024689537326`;

interface FullWidthInvitationCardProps {
  config: WeddingConfig;
  onOpenSettings?: () => void;
  onOpenEnvelope?: () => void;
}

export default function FullWidthInvitationCard(_props: FullWidthInvitationCardProps) {
  const handlePetalsClick = () => {
    triggerWeddingPetals();
  };

  return (
    <main
      id="main-invitation-container"
      className="min-h-dvh w-full py-4 sm:py-10 md:py-14 px-2.5 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative overflow-x-hidden bg-[#F7F2EB]"
      style={{
        backgroundImage:
          'radial-gradient(#E8DFC9 1px, transparent 1px), radial-gradient(#E8DFC9 1px, #F7F2EB 1px)',
        backgroundSize: '32px 32px',
        paddingBottom: 'max(5.5rem, calc(env(safe-area-inset-bottom) + 4.5rem))',
        paddingTop: 'max(1rem, env(safe-area-inset-top))',
      }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(650px,120vw)] h-[min(450px,55vh)] bg-radial from-[#EEDDC4]/60 via-[#FAF4EB]/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="relative w-full max-w-3xl sm:max-w-4xl my-auto select-none p-1 sm:p-4">
        <motion.article
          id="wedding-invitation-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full bg-[#FFFDF9] rounded-xl sm:rounded-3xl p-4 sm:p-9 md:p-12 lg:p-14 border border-[#E9DFCE] text-center overflow-hidden shadow-[0_15px_40px_rgba(95,70,45,0.09)] z-10"
        >
          <div className="absolute inset-1.5 sm:inset-3 rounded-[14px] sm:rounded-[22px] border border-[#D4AF37]/35 pointer-events-none" />

          <div className="flex items-center justify-center gap-2.5 sm:gap-4 my-1.5 sm:my-3 max-w-sm sm:max-w-md mx-auto pt-0.5">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-[#C99C38]" />
            <button
              type="button"
              onClick={handlePetalsClick}
              className="relative flex items-center justify-center p-2 min-w-10 min-h-10 rounded-full bg-[#FAF5EE] border border-[#D4AF37]/60 shadow-xs active:scale-95 transition-transform duration-300 cursor-pointer focus:outline-none touch-manipulation"
              title="لمس برای باران گلبرگ"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#8C6D37] fill-[#D4AF37]/35" />
            </button>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/70 to-[#C99C38]" />
          </div>

          <section
            aria-label="عکس تم نود و شامپاینی عقد"
            className="my-3 sm:my-6 relative w-full max-w-2xl mx-auto rounded-xl sm:rounded-2xl overflow-hidden shadow-sm border border-[#E8DCCF] group bg-[#FAF6F0]"
          >
            <div className="aspect-[16/10] sm:aspect-[2.1/1] w-full relative overflow-hidden">
              <img
                src={HERO_IMAGE.url}
                alt={HERO_IMAGE.title}
                className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 brightness-[1.02] contrast-[1.02]"
                loading="eager"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-[#D4AF37]/25 rounded-xl sm:rounded-2xl pointer-events-none" />
            </div>
          </section>

          <div dir="rtl" className="w-full max-w-2xl mx-auto my-4 sm:my-7 text-center px-0.5">
            <p className="font-persian text-sm sm:text-lg md:text-xl text-[#8C6D37] font-medium tracking-wide mb-1">
              با نامش و در پناهش
            </p>

            <h1 className="font-persian text-[1.75rem] min-[380px]:text-3xl min-[400px]:text-4xl sm:text-5xl lg:text-6xl text-[#63481F] font-bold my-1.5 sm:my-3 leading-normal">
              پریا و محسن
            </h1>

            <p className="font-persian text-base min-[380px]:text-xl sm:text-3xl text-[#46372C] font-medium leading-relaxed my-1.5 sm:my-3">
              تو نوبرانه یک عمر انتظار منی
            </p>

            <p className="font-persian text-sm sm:text-xl md:text-2xl text-[#8C6D37] font-medium my-2 sm:my-4 leading-relaxed">
              «حضورتان یادگار است و خاطره‌ای ماندگار»
            </p>

            <div className="mt-3 sm:mt-4 pt-1">
              <span className="inline-block px-4 sm:px-5 py-1.5 rounded-full bg-[#FAF5EE] border border-[#E4D5BE] font-persian text-sm sm:text-lg md:text-xl text-[#6E5845] font-semibold tracking-wider shadow-2xs">
                کریمی - کیماسی
              </span>
            </div>
          </div>

          <section
            aria-label="اطلاعات زمان عقد"
            dir="rtl"
            className="w-full max-w-2xl mx-auto my-5 sm:my-8 text-right"
          >
            <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#FAF6F0] border border-[#EFE5D8] flex flex-col gap-3.5 sm:gap-4 sm:flex-row sm:items-center sm:justify-between shadow-xs">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#EDE3D3] flex items-center justify-center shrink-0 text-[#8C6D37] shadow-inner">
                  <Calendar className="w-5 h-5 sm:w-7 sm:h-7" />
                </div>
                <div className="min-w-0">
                  <span
                    dir="rtl"
                    className="block font-persian text-xl sm:text-3xl font-bold text-[#382F28] leading-snug"
                  >
                    جمعه{' '}
                    <bdi className="font-address-digit font-semibold">۳</bdi>
                    {' '}مهر{' '}
                    <bdi className="font-address-digit font-semibold">۱۴۰۵</bdi>
                  </span>
                </div>
              </div>

              <div className="flex items-center pr-0 sm:pr-0">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#EFE4D6] text-sm sm:text-base font-persian text-[#6B5034] font-semibold border border-[#DFCBB5]">
                  <Clock className="w-4 h-4 text-[#8C6D37] shrink-0" />
                  <span dir="rtl">
                    از ساعت{' '}
                    <bdi className="font-address-digit font-semibold">۱۴</bdi>
                    {' '}الی{' '}
                    <bdi className="font-address-digit font-semibold">۱۵:۳۰</bdi>
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section
            aria-label="آدرس روی نقشه نشان"
            dir="rtl"
            className="w-full max-w-2xl mx-auto mt-1 mb-1 sm:mb-4 text-right"
          >
            <div className="rounded-xl sm:rounded-2xl bg-[#FAF6F0] border border-[#EFE5D8] overflow-hidden shadow-xs">
              <div className="p-3.5 sm:p-5 flex flex-col gap-3.5 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                  <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#EDE3D3] flex items-center justify-center shrink-0 text-[#8C6D37] shadow-inner">
                    <MapPin className="w-5 h-5 sm:w-7 sm:h-7" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span
                      dir="rtl"
                      className="block font-persian text-base sm:text-2xl font-bold text-[#382F28] leading-relaxed break-words"
                    >
                      {VENUE_ADDRESS_PREFIX}
                      <bdi className="font-address-digit font-semibold">۷</bdi>
                      {VENUE_ADDRESS_SUFFIX}
                      <bdi className="font-address-digit font-semibold">۹</bdi>
                      {VENUE_ADDRESS_END}
                    </span>
                  </div>
                </div>

                <div className="flex items-center pr-14 sm:pr-0">
                  <div className="inline-flex items-center px-3 py-1.5 rounded-xl bg-[#EFE4D6] text-sm sm:text-base font-persian text-[#6B5034] font-semibold border border-[#DFCBB5] whitespace-nowrap">
                    به صرف شام و شیرینی
                  </div>
                </div>
              </div>

              <div className="relative w-full aspect-[16/11] sm:aspect-[2/1] min-h-[180px] bg-[#EDE6DC] border-t border-[#E8DCCF]">
                <iframe
                  title="map-iframe"
                  src={NESHAN_EMBED_URL}
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="p-3.5 sm:p-5 border-t border-[#E8DCCF]">
                <a
                  id="neshan-navigation-btn"
                  href={NESHAN_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-5 py-3.5 min-h-[48px] rounded-full bg-gradient-to-r from-[#8C6D37] to-[#A48243] active:from-[#75592B] active:to-[#8C6D37] text-white transition-all duration-300 font-semibold text-sm sm:text-base font-persian shadow-md flex items-center justify-center gap-2 cursor-pointer touch-manipulation active:scale-[0.98]"
                >
                  <Navigation className="w-5 h-5 shrink-0" />
                  <span>مسیریابی در نشان</span>
                  <ExternalLink className="w-4 h-4 opacity-80 shrink-0" />
                </a>
              </div>
            </div>
          </section>
        </motion.article>
      </div>
    </main>
  );
}
