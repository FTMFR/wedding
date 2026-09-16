import React, { useState } from 'react';
import { Sparkles, Palette, Check, HelpCircle, ShieldCheck } from 'lucide-react';
import { attirePalettes } from '../data/weddingData';

export default function AttireGuideSection() {
  const [selectedPaletteIndex, setSelectedPaletteIndex] = useState(0);
  const currentPalette = attirePalettes[selectedPaletteIndex];

  return (
    <section
      id="attire-guide"
      className="py-16 sm:py-28 px-3 sm:px-6 bg-[#F5EFE6] border-y border-[#EADBCC] relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#E3D4C1] mb-4 shadow-xs">
            <Palette className="w-3.5 h-3.5 text-[#8C6D37]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A6342] font-medium">
              Guest Attire &amp; Color Palette
            </span>
          </div>

          <h2 className="font-serif-luxury text-3xl min-[360px]:text-4xl sm:text-5xl text-[#2B231D] tracking-tight mb-3 px-2">
            Harmonious Dress Code Guide
          </h2>

          <p className="font-serif-luxury italic text-base sm:text-xl text-[#6B5A4E] px-2">
            Black-Tie &amp; Formal Tuscan Garden Elegance. We invite our honored guests to wear tones that harmonize with our celebration.
          </p>
        </div>

        {/* Interactive Palette Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4 mb-8 sm:mb-10">
          {attirePalettes.map((palette, idx) => {
            const isSelected = selectedPaletteIndex === idx;
            return (
              <button
                key={palette.name}
                id={`palette-card-${idx}`}
                type="button"
                onClick={() => setSelectedPaletteIndex(idx)}
                className={`p-3 sm:p-4 rounded-2xl text-left transition-all duration-300 border cursor-pointer touch-manipulation ${
                  isSelected
                    ? 'bg-white shadow-md border-[#8C6D37] ring-2 ring-[#8C6D37]/20 scale-102'
                    : 'bg-white/70 hover:bg-white border-[#E3D6C5] shadow-xs'
                }`}
              >
                {/* Dual Color Swatch circles */}
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <div
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full shadow-inner border border-black/10 shrink-0"
                    style={{ backgroundColor: palette.hex }}
                  />
                  <div
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full shadow-inner border border-black/10 -ml-3 shrink-0"
                    style={{ backgroundColor: palette.complementaryHex }}
                  />
                  {isSelected && <Check className="w-4 h-4 text-[#8C6D37] ml-auto shrink-0" />}
                </div>

                <div className="font-serif-luxury text-sm sm:text-base font-semibold text-[#302720] leading-tight mb-1 truncate">
                  {palette.name}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[#8A796C] truncate">
                  {palette.role}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Palette Deep-Dive Card */}
        <div className="bg-white/95 rounded-3xl p-4 sm:p-8 border border-[#EADBCC] shadow-sm mb-8 sm:mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl shadow-inner border-2 border-white flex items-center justify-center text-white shrink-0"
                style={{ backgroundColor: currentPalette.hex }}
              >
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-sm" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-[#8C6D37] font-semibold">
                  Recommended Shade:
                </span>
                <h3 className="font-serif-luxury text-xl sm:text-3xl text-[#2B231D] font-normal">
                  {currentPalette.name}
                </h3>
                <p className="text-xs text-[#7B6A5C] mt-0.5">
                  Hex code: <code>{currentPalette.hex}</code> &bull; Ideal for {currentPalette.role}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#5C4F44] max-w-md font-sans-clean leading-relaxed">
              {currentPalette.description}
            </p>
          </div>
        </div>

        {/* Etiquette & Practical Footwear Advice */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white/80 border border-[#E5D8C9]">
            <h4 className="font-serif-luxury text-xl text-[#332922] mb-2 font-semibold flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#8C6D37]" />
              <span>For The Ladies</span>
            </h4>
            <ul className="text-xs text-[#5C4F44] space-y-2 leading-relaxed font-sans-clean">
              <li>&bull; Floor-length or sophisticated midi dresses in gentle silk, satin, or chiffon.</li>
              <li>&bull; <strong>Heel Advisory:</strong> Since ceremony pathways traverse ancient flagstone and lawn terraces, block heels or elegant wedges are strongly encouraged. Heel protectors will be offered upon arrival.</li>
              <li>&bull; We kindly ask that guests reserve pure ivory, white, and champagne tones for the bride and her cathedral gown.</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white/80 border border-[#E5D8C9]">
            <h4 className="font-serif-luxury text-xl text-[#332922] mb-2 font-semibold flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#8C6D37]" />
              <span>For The Gentlemen</span>
            </h4>
            <ul className="text-xs text-[#5C4F44] space-y-2 leading-relaxed font-sans-clean">
              <li>&bull; Classic black tuxedos, deep midnight navy suiting, or sharp tailored formal dinner jackets.</li>
              <li>&bull; Crisp white dress shirts with bow ties or silk ties in warm bronze, terracotta, or champagne accents.</li>
              <li>&bull; Polished leather dress shoes or velvet smoking slippers for the evening reception.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
