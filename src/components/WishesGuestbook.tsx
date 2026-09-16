import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Send, MessageSquare, Plus } from 'lucide-react';
import { GuestbookWish } from '../types';
import { initialGuestWishes } from '../data/weddingData';
import { triggerWeddingPetals } from '../utils/confettiEffects';

interface WishesGuestbookProps {
  brideName: string;
}

const GUESTBOOK_STORAGE_KEY = 'wedding_guestbook_wishes';

export default function WishesGuestbook({ brideName }: WishesGuestbookProps) {
  const [wishes, setWishes] = useState<GuestbookWish[]>(() => {
    try {
      const saved = localStorage.getItem(GUESTBOOK_STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialGuestWishes;
    } catch {
      return initialGuestWishes;
    }
  });

  const [authorName, setAuthorName] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');
  const [selectedStamp, setSelectedStamp] = useState<GuestbookWish['stamp']>('👰');
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const availableStamps: GuestbookWish['stamp'][] = ['👰', '🥂', '💍', '🕊️', '🌹', '✨'];

  const handlePostWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim()) return;

    const newWish: GuestbookWish = {
      id: 'wish-' + Date.now(),
      name: authorName.trim(),
      relation: relation.trim() || 'Honored Guest',
      message: message.trim(),
      stamp: selectedStamp,
      likes: 1,
      createdAt: 'Just now',
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem(GUESTBOOK_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }

    setAuthorName('');
    setRelation('');
    setMessage('');
    triggerWeddingPetals();
  };

  const handleLike = (id: string) => {
    if (likedMap[id]) return;
    setLikedMap((prev) => ({ ...prev, [id]: true }));
    const updated = wishes.map((w) => (w.id === id ? { ...w, likes: w.likes + 1 } : w));
    setWishes(updated);
    try {
      localStorage.setItem(GUESTBOOK_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  return (
    <section id="guestbook" className="py-16 sm:py-28 px-3 sm:px-6 bg-[#FAF7F2] relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E3D6C5] mb-4 shadow-xs">
            <MessageSquare className="w-3.5 h-3.5 text-[#8C6D37]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A6342] font-medium">
              Words of Devotion
            </span>
          </div>

          <h2 className="font-serif-luxury text-3xl min-[360px]:text-4xl sm:text-5xl text-[#2B231D] tracking-tight mb-3 px-2">
            The Digital Wishes Wall
          </h2>

          <p className="font-serif-luxury italic text-base sm:text-xl text-[#756557] px-2">
            Leave a blessing, share a favorite memory, or express your joy for {brideName}’s walk down the aisle.
          </p>
        </div>

        {/* Input Form Card */}
        <div className="bg-white/95 rounded-3xl p-5 sm:p-8 border border-[#EADBCC] shadow-md max-w-2xl mx-auto mb-10 sm:mb-14">
          <form onSubmit={handlePostWish} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#63554A] font-semibold mb-1.5">
                  Your Name(s) *
                </label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Aunt Clarissa"
                  className="w-full px-4 py-2.5 min-h-[44px] rounded-xl border border-[#E3D6C5] bg-[#FAF7F2] text-[#2C231C] text-base sm:text-sm focus:outline-none focus:border-[#8C6D37] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#63554A] font-semibold mb-1.5">
                  Relationship to Couple
                </label>
                <input
                  type="text"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  placeholder="e.g. Sister, Best Friend, Cousin"
                  className="w-full px-4 py-2.5 min-h-[44px] rounded-xl border border-[#E3D6C5] bg-[#FAF7F2] text-[#2C231C] text-base sm:text-sm focus:outline-none focus:border-[#8C6D37] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#63554A] font-semibold mb-1.5">
                Your Blessing Message *
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your heartfelt blessing or compliment on the bride's gown..."
                className="w-full px-4 py-2.5 rounded-xl border border-[#E3D6C5] bg-[#FAF7F2] text-[#2C231C] text-base sm:text-sm focus:outline-none focus:border-[#8C6D37] transition-colors"
              />
            </div>

            {/* Stamp Selector & Submit */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs uppercase tracking-wider text-[#7A6A5E] font-medium mr-1">
                  Wax Stamp:
                </span>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {availableStamps.map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setSelectedStamp(st)}
                      aria-label={`Select ${st} stamp`}
                      className={`w-10 h-10 min-w-[40px] min-h-[40px] rounded-full text-base flex items-center justify-center transition-all cursor-pointer touch-manipulation ${
                        selectedStamp === st
                          ? 'bg-[#FAF2E6] border-2 border-[#8C6D37] scale-110 shadow-xs'
                          : 'bg-[#F5EDE1] border border-transparent hover:bg-[#EADBCA]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <button
                id="guestbook-submit-btn"
                type="submit"
                className="w-full sm:w-auto px-6 py-3 min-h-[44px] rounded-full bg-[#8C6D37] text-white hover:bg-[#745729] transition-all text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-xs cursor-pointer touch-manipulation"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Blessing</span>
              </button>
            </div>
          </form>
        </div>

        {/* Wishes Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {wishes.map((wish) => (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/90 rounded-2xl p-5 sm:p-6 border border-[#E8DCD0] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-2xl shrink-0">{wish.stamp}</span>
                    <div className="min-w-0">
                      <h4 className="font-serif-luxury text-base sm:text-lg font-bold text-[#2E241E] truncate">
                        {wish.name}
                      </h4>
                      <span className="text-[11px] uppercase tracking-wider text-[#8C7A6D] block truncate">
                        {wish.relation}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] text-[#A6978A] shrink-0">{wish.createdAt}</span>
                </div>

                <p className="font-serif-luxury italic text-sm sm:text-base text-[#4D3F35] leading-relaxed mb-4">
                  "{wish.message}"
                </p>
              </div>

              <div className="flex items-center justify-end pt-3 border-t border-[#F2E8DC]">
                <button
                  type="button"
                  onClick={() => handleLike(wish.id)}
                  aria-label={`Send love, currently ${wish.likes}`}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-full text-xs transition-colors cursor-pointer touch-manipulation ${
                    likedMap[wish.id]
                      ? 'text-rose-600 font-semibold bg-rose-50'
                      : 'text-[#8C7A6D] hover:text-rose-600 hover:bg-[#FAF5EC]'
                  }`}
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      likedMap[wish.id] ? 'fill-rose-600' : ''
                    }`}
                  />
                  <span>{wish.likes}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
