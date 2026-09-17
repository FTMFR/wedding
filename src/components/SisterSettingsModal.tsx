import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, RotateCcw, Settings, Heart, Sparkles } from 'lucide-react';
import { WeddingConfig } from '../types';
import { initialWeddingConfig } from '../data/weddingData';
import { triggerWeddingPetals } from '../utils/confettiEffects';

interface SisterSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: WeddingConfig;
  onSaveConfig: (updated: WeddingConfig) => void;
}

export default function SisterSettingsModal({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}: SisterSettingsModalProps) {
  const [formData, setFormData] = useState<WeddingConfig>(config);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(formData);
    triggerWeddingPetals();
    onClose();
  };

  const handleReset = () => {
    setFormData(initialWeddingConfig);
    onSaveConfig(initialWeddingConfig);
  };

  return (
    <AnimatePresence>
      <div
        id="sister-settings-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-[#FAF7F2] rounded-3xl p-4 sm:p-8 border border-[#EADBCC] shadow-2xl my-auto text-[#2E241E]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E8DCD0] pb-3 sm:pb-4 mb-4 sm:mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#FAF3EA] border border-[#D4AF37]/50 flex items-center justify-center text-[#8C6D37] shrink-0">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold">
                  Sister's Wedding Customizer
                </h3>
                <span className="text-[11px] uppercase tracking-wider text-[#8A796C]">
                  Personalize names, dates, and venue
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full border border-[#D9CCBF] flex items-center justify-center text-[#6A5A4E] hover:bg-[#EFE5D8] transition-colors shrink-0 touch-manipulation cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            {/* Bride and Groom names */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#68574B] font-semibold mb-1">
                  Sister's Name (Bride) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.brideName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      brideName: e.target.value,
                      coupleMonogram: `${e.target.value[0] || 'B'} & ${formData.groomName[0] || 'G'}`,
                    })
                  }
                  className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-[#E3D6C5] bg-white text-sm focus:outline-none focus:border-[#8C6D37]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#68574B] font-semibold mb-1">
                  Fiancé's Name (Groom) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.groomName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      groomName: e.target.value,
                      coupleMonogram: `${formData.brideName[0] || 'B'} & ${e.target.value[0] || 'G'}`,
                    })
                  }
                  className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-[#E3D6C5] bg-white text-sm focus:outline-none focus:border-[#8C6D37]"
                />
              </div>
            </div>

            {/* Wedding Date & Shamsi Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#68574B] font-semibold mb-1">
                  تاریخ شمسی عقد (Shamsi Date) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.shamsiDate || '۱۴۰۵/۰۷/۰۳'}
                  onChange={(e) => setFormData({ ...formData, shamsiDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-[#E3D6C5] bg-white text-sm focus:outline-none focus:border-[#8C6D37]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#68574B] font-semibold mb-1">
                  Wedding Date &amp; Time (Gregorian)
                </label>
                <input
                  type="datetime-local"
                  required
                  value={formData.weddingDate.slice(0, 16)}
                  onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-[#E3D6C5] bg-white text-sm focus:outline-none focus:border-[#8C6D37]"
                />
              </div>
            </div>

            {/* Monogram and Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#68574B] font-semibold mb-1">
                  Monogram Seal Letters
                </label>
                <input
                  type="text"
                  value={formData.coupleMonogram}
                  onChange={(e) => setFormData({ ...formData, coupleMonogram: e.target.value })}
                  className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-[#E3D6C5] bg-white text-sm focus:outline-none focus:border-[#8C6D37]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#68574B] font-semibold mb-1">
                  City &amp; Region *
                </label>
                <input
                  type="text"
                  required
                  value={formData.venueLocation}
                  onChange={(e) => setFormData({ ...formData, venueLocation: e.target.value })}
                  className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-[#E3D6C5] bg-white text-sm focus:outline-none focus:border-[#8C6D37]"
                />
              </div>
            </div>

            {/* Venue Name */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#68574B] font-semibold mb-1">
                Venue Name (نام محل برگزاری) *
              </label>
              <input
                type="text"
                required
                value={formData.venueName}
                onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-[#E3D6C5] bg-white text-sm focus:outline-none focus:border-[#8C6D37]"
              />
            </div>

            {/* Street Address */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#68574B] font-semibold mb-1">
                Full Street Address (نشانی کامل)
              </label>
              <input
                type="text"
                value={formData.venueAddress}
                onChange={(e) => setFormData({ ...formData, venueAddress: e.target.value })}
                className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-[#E3D6C5] bg-white text-sm focus:outline-none focus:border-[#8C6D37]"
              />
            </div>

            {/* Love Quote */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#68574B] font-semibold mb-1">
                Romantic Devotion Quote / Tagline
              </label>
              <input
                type="text"
                value={formData.storyQuote}
                onChange={(e) => setFormData({ ...formData, storyQuote: e.target.value })}
                className="w-full px-3.5 py-2.5 min-h-[44px] rounded-xl border border-[#E3D6C5] bg-white text-sm focus:outline-none focus:border-[#8C6D37]"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pt-4 border-t border-[#E8DCD0] gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-1.5 min-h-[44px] text-xs text-[#8A796C] hover:text-[#524438] underline touch-manipulation cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Default</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 sm:flex-none px-4 py-2 min-h-[44px] rounded-full border border-[#D9C8B6] text-xs uppercase tracking-wider text-[#6B5A4E] touch-manipulation cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  id="settings-save-btn"
                  type="submit"
                  className="flex-1 sm:flex-none px-6 py-2 min-h-[44px] rounded-full bg-[#8C6D37] text-white hover:bg-[#73582B] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-xs cursor-pointer touch-manipulation"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Apply Changes</span>
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
