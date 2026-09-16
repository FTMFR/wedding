import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, PenTool, Check, ChevronDown, X, Type, Search } from 'lucide-react';
import { PersianFontFamily } from '../types';
import { PERSIAN_FONTS } from '../data/persianFonts';

interface PersianFontSelectorProps {
  currentFont?: PersianFontFamily;
  onSelectFont?: (font: PersianFontFamily) => void;
  variant?: 'compact' | 'expanded';
  showLabel?: boolean;
}

export default function PersianFontSelector({
  currentFont = 'nastaliq',
  onSelectFont,
  showLabel = true,
}: PersianFontSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const activeFont = PERSIAN_FONTS.find((f) => f.id === currentFont) || PERSIAN_FONTS[0];

  const handleSelect = (fontId: PersianFontFamily) => {
    if (onSelectFont) {
      onSelectFont(fontId);
    }
    setIsOpen(false);
  };

  const filteredFonts = useMemo(() => {
    return PERSIAN_FONTS.filter((font) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        font.name.includes(searchQuery.trim()) ||
        font.category.includes(searchQuery.trim()) ||
        font.description.includes(searchQuery.trim());

      if (!matchesSearch) return false;

      if (selectedCategory === 'all') return true;
      if (selectedCategory === 'traditional' && ['nastaliq', 'katibeh', 'amiri', 'gulzar', 'scheherazade'].includes(font.id)) return true;
      if (selectedCategory === 'modern' && ['vazirmatn', 'notosans', 'almarai', 'mada', 'cairo'].includes(font.id)) return true;
      if (selectedCategory === 'artistic' && ['arefruqaa', 'lalezar', 'elmessiri', 'lateef', 'mirza', 'rakkas'].includes(font.id)) return true;
      if (selectedCategory === 'classic' && ['markazitext', 'notoserif', 'harmattan', 'reemkufi'].includes(font.id)) return true;

      return true;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      {/* Trigger Button */}
      <button
        type="button"
        id="open-font-family-selector"
        onClick={() => setIsOpen(true)}
        className="group inline-flex items-center justify-between gap-3 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-gradient-to-r from-[#FDFBF7] to-[#F7F2E8] border border-[#D4AF37]/60 hover:border-[#D4AF37] shadow-sm hover:shadow-md transition-all duration-300 text-right cursor-pointer max-w-md w-full"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-[#FAF1E3] border border-[#D4AF37]/40 flex items-center justify-center text-[#8C6D37] shrink-0 group-hover:scale-105 transition-transform">
            <Type className="w-4 h-4" />
          </div>
          <div className="text-right truncate">
            <div className="text-[11px] text-[#8A7865] font-medium leading-none mb-1">
              قلم متن دعوتنامه (انتخاب از بین ۲۰ قلم):
            </div>
            <div className="font-persian text-base sm:text-lg text-[#523E23] font-bold leading-tight truncate">
              {activeFont.name} <span className="text-xs text-[#8C6D37] font-normal font-sans">({activeFont.category})</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/80 border border-[#D4AF37]/30 text-[#8C6D37] text-xs font-medium shrink-0 group-hover:bg-[#FAF1E3] transition-colors">
          <span>تغییر قلم</span>
          <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
        </div>
      </button>

      {showLabel && (
        <p className="text-[11px] sm:text-xs text-[#877564] text-center">
          قلم دلخواه خود را از میان ۲۰ خط متنوع فارسی انتخاب کنید تا بر روی کارت عقد اعمال شود.
        </p>
      )}

      {/* Font Family Selection Modal */}
      <AnimatePresence>
        {isOpen && (
          <div
            id="font-selector-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] bg-[#FAF8F5] rounded-3xl p-4 sm:p-6 border-2 border-[#D4AF37]/40 shadow-2xl overflow-hidden flex flex-col text-[#2E241E] my-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-[#E8DCCF] pb-3 mb-3 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#F5E9D3] to-[#EBD5B3] border border-[#D4AF37] flex items-center justify-center text-[#73582B] shadow-xs">
                    <PenTool className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#3B2C1B]">
                      فهرست ۲۰ قلم اختصاصی کارت دعوت
                    </h3>
                    <p className="text-xs text-[#7A6B5C]">
                      قلم مورد پسند خود را برای نگارش شعر و مشخصات جشن عقد انتخاب کنید
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  id="close-font-selector"
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 rounded-full border border-[#D9CCBF] flex items-center justify-center text-[#6A5A4E] hover:bg-[#EFE5D8] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Category Filter Chips & Search */}
              <div className="space-y-2 mb-2 shrink-0">
                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="جستجو در بین ۲۰ قلم..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#E3D6C5] text-xs sm:text-sm text-[#382D26] placeholder-[#A39282] focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                  <Search className="w-4 h-4 text-[#A39282] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Filter Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCategory === 'all'
                        ? 'bg-[#8C6D37] text-white font-bold'
                        : 'bg-white border border-[#E3D6C5] text-[#6E5D4E] hover:bg-[#F5ECE0]'
                    }`}
                  >
                    همه (۲۰ قلم)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('traditional')}
                    className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCategory === 'traditional'
                        ? 'bg-[#8C6D37] text-white font-bold'
                        : 'bg-white border border-[#E3D6C5] text-[#6E5D4E] hover:bg-[#F5ECE0]'
                    }`}
                  >
                    سنتی و نستعلیق
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('artistic')}
                    className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCategory === 'artistic'
                        ? 'bg-[#8C6D37] text-white font-bold'
                        : 'bg-white border border-[#E3D6C5] text-[#6E5D4E] hover:bg-[#F5ECE0]'
                    }`}
                  >
                    هنری و رمانتیک
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('modern')}
                    className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCategory === 'modern'
                        ? 'bg-[#8C6D37] text-white font-bold'
                        : 'bg-white border border-[#E3D6C5] text-[#6E5D4E] hover:bg-[#F5ECE0]'
                    }`}
                  >
                    مدرن و خوانا
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('classic')}
                    className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCategory === 'classic'
                        ? 'bg-[#8C6D37] text-white font-bold'
                        : 'bg-white border border-[#E3D6C5] text-[#6E5D4E] hover:bg-[#F5ECE0]'
                    }`}
                  >
                    کلاسیک و کوفی
                  </button>
                </div>
              </div>

              {/* Scrollable Font List */}
              <div className="overflow-y-auto space-y-2.5 pr-1 pl-1 py-1 flex-1 max-h-[50vh]">
                {filteredFonts.length === 0 ? (
                  <div className="text-center py-8 text-xs sm:text-sm text-[#877564]">
                    قلمی با این مشخصات یافت نشد.
                  </div>
                ) : (
                  filteredFonts.map((font) => {
                    const originalIndex = PERSIAN_FONTS.findIndex((f) => f.id === font.id);
                    const isSelected = font.id === currentFont;
                    return (
                      <button
                        key={font.id}
                        type="button"
                        id={`font-option-${font.id}`}
                        onClick={() => handleSelect(font.id)}
                        className={`w-full text-right p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col gap-2 relative ${
                          isSelected
                            ? 'bg-[#FBF6EC] border-[#B38F2C] shadow-md ring-2 ring-[#D4AF37]/40'
                            : 'bg-white border-[#E8DFD3] hover:border-[#D4AF37]/60 hover:bg-[#FDFCF9]'
                        }`}
                      >
                        {/* Top Bar: Name, Category, Checkmark */}
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-[#FAF3EA] border border-[#D4AF37]/40 text-[#8C6D37] text-xs font-bold flex items-center justify-center font-sans">
                              {originalIndex + 1}
                            </span>
                            <span className="font-bold text-[#3B2C1B] text-base sm:text-lg">
                              {font.name}
                            </span>
                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#F3EAD9] text-[#7A5F2D] border border-[#E0CEB1] font-medium">
                              {font.category}
                            </span>
                          </div>

                          {isSelected && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#7A5F2D] bg-[#F2E5CC] px-2.5 py-1 rounded-full border border-[#D4AF37]/50">
                              <Check className="w-3.5 h-3.5" />
                              انتخاب شده
                            </span>
                          )}
                        </div>

                        {/* Font Preview Text */}
                        <div
                          dir="rtl"
                          style={{ fontFamily: font.cssFamily }}
                          className="text-lg sm:text-2xl text-[#2F241B] font-medium py-1 text-right leading-relaxed"
                        >
                          {font.previewText}
                        </div>

                        {/* Font Description */}
                        <div className="text-xs text-[#807060] text-right border-t border-[#F0E6D8] pt-1.5 flex items-center justify-between">
                          <span>{font.description}</span>
                          <span className="text-[10px] text-[#A6998A] font-mono" dir="ltr">
                            {font.id}
                          </span>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Modal Footer */}
              <div className="border-t border-[#E8DCCF] pt-3 mt-3 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-1.5 text-xs text-[#7A6B5C]">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>۲۰ قلم فارسی شامل انواع خطوط نستعلیق، نسخ، کوفی، مدرن و دست‌نویس</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2 rounded-xl bg-[#8C6D37] hover:bg-[#73582B] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs"
                >
                  بستن
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
