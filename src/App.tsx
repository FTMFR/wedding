import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { WeddingConfig, PersianFontFamily } from './types';
import { initialWeddingConfig } from './data/weddingData';
import WaxSealEnvelope from './components/WaxSealEnvelope';
import FullWidthInvitationCard from './components/FullWidthInvitationCard';
import RomanticMusicPlayer from './components/RomanticMusicPlayer';

const CONFIG_STORAGE_KEY = 'wedding_sister_config_v4';

export default function App() {
  const [config] = useState<WeddingConfig>(() => {
    try {
      const saved =
        localStorage.getItem(CONFIG_STORAGE_KEY) ||
        localStorage.getItem('wedding_sister_config_v3') ||
        localStorage.getItem('wedding_sister_config_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.coupleMonogram && parsed.coupleMonogram !== 'E & A') {
          const merged: WeddingConfig = { ...initialWeddingConfig, ...parsed };
          if (merged.tagline) {
            merged.tagline = merged.tagline
              .replace(/در ایتالیا/g, '')
              .replace(/ایتالیا/g, '')
              .trim();
          }
          if (merged.venueLocation) {
            merged.venueLocation = merged.venueLocation
              .replace(/\(ایتالیا\)/g, '')
              .replace(/Italy/gi, '')
              .replace(/ایتالیا/g, '')
              .trim();
          }
          if (merged.storyHeading) {
            merged.storyHeading = merged.storyHeading
              .replace(/در ایتالیا/g, '')
              .replace(/ایتالیا/g, '')
              .trim();
          }
          merged.persianFontFamily =
            (parsed.persianFontFamily as PersianFontFamily) || 'nastaliq';
          return merged;
        }
      }
      return initialWeddingConfig;
    } catch {
      return initialWeddingConfig;
    }
  });

  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);

  return (
    <div
      data-persian-font={config.persianFontFamily || 'nastaliq'}
      className="min-h-dvh bg-[#FAF7F2] text-[#2C2724] font-sans-clean selection:bg-[#E8D8C8] selection:text-[#382D26]"
    >
      <div className="relative w-full min-h-dvh">
        <AnimatePresence initial={false}>
          {!isEnvelopeOpened ? (
            <motion.div
              key="envelope-stage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="w-full min-h-dvh absolute inset-0 z-10"
            >
              <WaxSealEnvelope config={config} onOpen={() => setIsEnvelopeOpened(true)} />
            </motion.div>
          ) : (
            <motion.div
              key="card-stage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="w-full min-h-dvh relative z-0"
            >
              <FullWidthInvitationCard config={config} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <RomanticMusicPlayer />
    </div>
  );
}
