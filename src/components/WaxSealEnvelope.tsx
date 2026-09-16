import { useRef } from 'react';
import { motion } from 'motion/react';
import { WeddingConfig } from '../types';
import { triggerGoldSparkle, triggerWeddingPetals } from '../utils/confettiEffects';
import { romanticAudio } from '../utils/romanticAudio';

interface WaxSealEnvelopeProps {
  config?: WeddingConfig;
  onOpen: () => void;
}

const PAPER_FIBER = `
  url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")
`;

const EASE = [0.22, 1, 0.36, 1] as const;

export default function WaxSealEnvelope({ onOpen }: WaxSealEnvelopeProps) {
  const openingLock = useRef(false);

  const handleBreakSeal = () => {
    if (openingLock.current) return;
    openingLock.current = true;

    try {
      triggerGoldSparkle();
    } catch {
      /* ignore */
    }
    try {
      triggerWeddingPetals();
    } catch {
      /* ignore */
    }

    try {
      if (!romanticAudio.getState().isPlaying) {
        void romanticAudio.play();
      }
    } catch {
      /* ignore */
    }

    onOpen();
  };

  return (
    <main
      id="sealed-envelope-view"
      className="min-h-dvh w-full flex items-center justify-center px-3 py-6 sm:p-10 overflow-hidden selection:bg-transparent"
      style={{
        background:
          'radial-gradient(ellipse 90% 70% at 50% 40%, #EFE6D8 0%, #D8CFBF 55%, #C7BCA9 100%)',
        perspective: '1200px',
        paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
        paddingTop: 'max(1.5rem, env(safe-area-inset-top))',
      }}
    >
      <div
        className="absolute inset-0 opacity-30 pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: PAPER_FIBER, backgroundSize: '170px 170px' }}
      />

      <div className="relative w-full max-w-[22rem] min-[400px]:max-w-[28rem] sm:max-w-[36rem] aspect-[1.45/1] sm:aspect-[1.55/1]">
        {/* Soft card hint under flap */}
        <div
          className="absolute left-[8%] right-[8%] top-[5%] bottom-[12%] z-[2] rounded-md overflow-hidden pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, #FFFDF9, #F7EFE4)',
            border: '1px solid rgba(212,175,55,0.35)',
            boxShadow: '0 12px 30px rgba(60,40,25,0.18)',
            transform: 'translateY(44px) scale(0.97)',
          }}
        >
          <div className="h-full flex flex-col items-center pt-4 sm:pt-6 px-3 sm:px-4 text-center" dir="rtl">
            <p className="font-persian text-[10px] sm:text-xs text-[#8C6D37]">با نامش و در پناهش</p>
            <p className="font-persian text-lg min-[400px]:text-xl sm:text-2xl font-bold text-[#63481F] mt-0.5 sm:mt-1">
              پریا و محسن
            </p>
            <p className="font-persian text-[10px] sm:text-xs text-[#6E5845] mt-1 sm:mt-2">کریمی - کیماسی</p>
          </div>
        </div>

        {/* Envelope body */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ transformStyle: 'preserve-3d' }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              borderRadius: '3px',
              background: 'linear-gradient(168deg, #FBF7F0, #E9DFD2)',
              boxShadow:
                '0 24px 40px rgba(55,40,25,0.22), inset 0 1px 0 rgba(255,255,255,0.7)',
            }}
          >
            <div
              className="absolute inset-0 opacity-40 mix-blend-multiply"
              style={{ backgroundImage: PAPER_FIBER, backgroundSize: '150px 150px' }}
            />
            <div
              className="absolute inset-0"
              style={{
                clipPath: 'polygon(0 0, 50% 52%, 0 100%)',
                background: 'linear-gradient(115deg, #F4EDE3, #E0D3C2)',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                clipPath: 'polygon(100% 0, 50% 52%, 100% 100%)',
                background: 'linear-gradient(245deg, #F4EDE3, #E0D3C2)',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)',
                background: 'linear-gradient(0deg, #E5D9CA, #F7F1E8)',
              }}
            />
          </div>

          <div
            className="absolute inset-0 z-[2]"
            style={{ transformOrigin: '50% 0%', transformStyle: 'preserve-3d' }}
          >
            <div
              className="absolute inset-0"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 54%)',
                background: 'linear-gradient(180deg, #FDFBF7, #E8DCCE)',
                filter: 'drop-shadow(0 8px 14px rgba(55,38,22,0.2))',
              }}
            >
              <div
                className="absolute inset-0 opacity-45 mix-blend-multiply"
                style={{ backgroundImage: PAPER_FIBER, backgroundSize: '150px 150px' }}
              />
            </div>
          </div>
        </motion.div>

        {/* Wax seal */}
        <motion.button
          id="interactive-wax-seal-btn"
          type="button"
          onClick={handleBreakSeal}
          onPointerUp={(e) => {
            if (e.pointerType === 'touch' || e.pointerType === 'pen') {
              handleBreakSeal();
            }
          }}
          className="absolute left-1/2 top-[52%] z-30 -translate-x-1/2 -translate-y-1/2 cursor-pointer touch-manipulation focus:outline-none pointer-events-auto"
          aria-label="گشودن مهر و موم"
          title="برای باز کردن پاکت کلیک کنید"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <div className="relative z-[1] w-[4.75rem] h-[4.75rem] min-[400px]:w-[5.75rem] min-[400px]:h-[5.75rem] sm:w-[7rem] sm:h-[7rem] pointer-events-none">
            <span
              className="absolute -inset-3 rounded-full blur-xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(130,35,48,0.42) 0%, transparent 70%)',
              }}
            />
            <span
              className="absolute -inset-[5px] sm:-inset-1.5"
              style={{
                borderRadius: '44% 56% 48% 52% / 54% 46% 55% 45%',
                background:
                  'radial-gradient(circle at 32% 28%, #A33D4C 0%, #6A1F2C 55%, #3A1018 100%)',
                boxShadow:
                  '0 16px 30px rgba(35,8,14,0.55), inset 0 1px 2px rgba(255,200,190,0.28)',
              }}
            />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{
                borderRadius: '48% 52% 49% 51% / 51% 47% 53% 49%',
                background:
                  'radial-gradient(circle at 34% 28%, #D16A76 0%, #9A3444 36%, #611825 76%, #2C0C12 100%)',
                boxShadow:
                  'inset 0 3px 6px rgba(255,210,200,0.3), inset 0 -7px 14px rgba(0,0,0,0.55), 0 0 0 1.5px rgba(212,175,55,0.55)',
              }}
            >
              <span
                className="absolute inset-[3px] rounded-full"
                style={{
                  border: '1.5px solid rgba(236, 206, 130, 0.6)',
                  boxShadow: 'inset 0 0 0 1px rgba(100, 30, 40, 0.35)',
                }}
              />
              <span className="absolute top-2 left-3 w-12 h-6 sm:w-14 sm:h-7 rounded-full bg-gradient-to-br from-white/40 via-[#FFD4CC]/18 to-transparent blur-[2.5px] -rotate-[30deg]" />
              <span
                className="absolute inset-[18%] flex items-center justify-center"
                style={{
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle at 45% 40%, #862838 0%, #50141E 65%, #240910 100%)',
                  boxShadow:
                    'inset 0 5px 10px rgba(0,0,0,0.7), inset 0 -2px 3px rgba(255,185,175,0.18)',
                }}
              >
                <svg
                  viewBox="0 0 40 40"
                  className="w-[96%] h-[96%]"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="gyp-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F3E2A8" />
                      <stop offset="50%" stopColor="#D4AF37" />
                      <stop offset="100%" stopColor="#8A6A32" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M20 32 C19.5 26, 18 22, 16 18 M20 28 C20.5 24, 22 20, 24 16 M20 26 C21 23, 20.5 20, 20 17"
                    fill="none"
                    stroke="url(#gyp-gold)"
                    strokeWidth="0.7"
                    strokeLinecap="round"
                    opacity="0.75"
                  />
                  <g fill="url(#gyp-gold)">
                    <circle cx="20" cy="12.2" r="1.15" opacity="0.95" />
                    <circle cx="18.6" cy="13.4" r="1.05" opacity="0.9" />
                    <circle cx="21.4" cy="13.4" r="1.05" opacity="0.9" />
                    <circle cx="19.1" cy="11.2" r="0.95" opacity="0.85" />
                    <circle cx="20.9" cy="11.2" r="0.95" opacity="0.85" />
                    <circle cx="20" cy="12.5" r="0.45" fill="#FFF8E7" opacity="0.7" />
                    <circle cx="14.5" cy="16.5" r="1.05" opacity="0.92" />
                    <circle cx="13.3" cy="17.5" r="0.95" opacity="0.88" />
                    <circle cx="15.6" cy="17.5" r="0.95" opacity="0.88" />
                    <circle cx="13.8" cy="15.6" r="0.85" opacity="0.82" />
                    <circle cx="15.2" cy="15.6" r="0.85" opacity="0.82" />
                    <circle cx="14.5" cy="16.7" r="0.4" fill="#FFF8E7" opacity="0.65" />
                    <circle cx="25.5" cy="15.8" r="1.05" opacity="0.92" />
                    <circle cx="24.3" cy="16.8" r="0.95" opacity="0.88" />
                    <circle cx="26.6" cy="16.8" r="0.95" opacity="0.88" />
                    <circle cx="24.8" cy="14.9" r="0.85" opacity="0.82" />
                    <circle cx="26.2" cy="14.9" r="0.85" opacity="0.82" />
                    <circle cx="25.5" cy="16" r="0.4" fill="#FFF8E7" opacity="0.65" />
                    <circle cx="16.8" cy="21.2" r="0.85" opacity="0.88" />
                    <circle cx="15.9" cy="22" r="0.75" opacity="0.82" />
                    <circle cx="17.7" cy="22" r="0.75" opacity="0.82" />
                    <circle cx="16.3" cy="20.5" r="0.7" opacity="0.78" />
                    <circle cx="17.3" cy="20.5" r="0.7" opacity="0.78" />
                    <circle cx="23.2" cy="20.5" r="0.85" opacity="0.88" />
                    <circle cx="22.3" cy="21.3" r="0.75" opacity="0.82" />
                    <circle cx="24.1" cy="21.3" r="0.75" opacity="0.82" />
                    <circle cx="22.7" cy="19.8" r="0.7" opacity="0.78" />
                    <circle cx="23.7" cy="19.8" r="0.7" opacity="0.78" />
                    <circle cx="18.5" cy="25.5" r="0.7" opacity="0.8" />
                    <circle cx="21.5" cy="24.8" r="0.65" opacity="0.78" />
                    <circle cx="20" cy="27.2" r="0.55" opacity="0.72" />
                  </g>
                </svg>
              </span>
            </span>
          </div>
        </motion.button>

        <button
          type="button"
          aria-label="باز کردن پاکت"
          onClick={handleBreakSeal}
          className="absolute inset-0 z-[25] cursor-pointer bg-transparent border-0 p-0"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        />
      </div>
    </main>
  );
}
