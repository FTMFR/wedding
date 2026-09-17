import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Check,
  Heart,
  Sparkles,
  Send,
  Music,
  Utensils,
  UserCheck,
  QrCode,
  Calendar,
  RotateCcw,
} from 'lucide-react';
import { WeddingConfig, RsvpSubmission } from '../types';
import { triggerWeddingPetals, triggerGoldSparkle } from '../utils/confettiEffects';

interface RsvpSectionProps {
  config: WeddingConfig;
}

const STORAGE_KEY = 'wedding_rsvp_submission';

export default function RsvpSection({ config }: RsvpSectionProps) {
  const [submission, setSubmission] = useState<RsvpSubmission | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    attending: 'attending' as 'attending' | 'declined',
    guestsCount: 2,
    mealPreference: 'Filet Mignon' as RsvpSubmission['mealPreference'],
    dietaryNotes: '',
    songRequest: '',
    blessingMessage: '',
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setSubmission(JSON.parse(saved));
      }
    } catch (e) {
      // Ignore local storage error
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) return;

    const newSub: RsvpSubmission = {
      id: 'rsvp-' + Date.now(),
      ...formData,
      submittedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    setSubmission(newSub);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSub));
    } catch (err) {
      // ignore
    }

    if (formData.attending === 'attending') {
      triggerGoldSparkle();
      setTimeout(triggerWeddingPetals, 300);
    }
  };

  const handleReset = () => {
    setSubmission(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      // ignore
    }
  };

  const formattedWeddingDate = new Date(config.weddingDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <section id="rsvp" className="py-16 sm:py-28 px-3 sm:px-6 bg-[#FAF7F2] relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E3D6C5] mb-4 shadow-xs">
            <UserCheck className="w-3.5 h-3.5 text-[#8C6D37]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A6342] font-medium">
              Response Requested
            </span>
          </div>

          <h2 className="font-persian text-3xl min-[360px]:text-4xl sm:text-5xl text-[#2B231D] tracking-tight mb-3 px-2 font-bold">
            اعلام حضور در عقد (RSVP)
          </h2>

          <p className="font-persian text-base sm:text-xl text-[#756557] px-2 leading-relaxed">
            لطفاً تا تاریخ {config.rsvpDeadline} حضور پرمهر خود را جهت رزرو جایگاه اختصاصی در {config.venueName} اعلام فرمایید.
          </p>
        </div>

        {submission ? (
          /* SUCCESS STATE: Luxury Digital Boarding Pass */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-5 sm:p-12 border-2 border-[#D4AF37]/50 shadow-xl text-center relative overflow-hidden"
          >
            {/* Top gold shimmer bar */}
            <div className="absolute top-0 inset-x-0 h-2 gold-shimmer" />

            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FAF4EB] border border-[#E5D7C5] flex items-center justify-center mx-auto mb-4 sm:mb-5 text-[#8C6D37]">
              {submission.attending === 'attending' ? (
                <Heart className="w-7 h-7 sm:w-8 sm:h-8 fill-[#8C6D37]" />
              ) : (
                <Check className="w-7 h-7 sm:w-8 sm:h-8" />
              )}
            </div>

            <span className="text-xs uppercase tracking-[0.3em] text-[#8C6D37] font-semibold block mb-1">
              {submission.attending === 'attending'
                ? 'Joyfully Confirmed'
                : 'Response Received'}
            </span>

            <h3 className="font-serif-luxury text-2xl sm:text-4xl text-[#2B231D] mb-2 px-2">
              Thank You, {submission.fullName}!
            </h3>

            <p className="text-xs sm:text-sm text-[#66574B] max-w-md mx-auto mb-6 sm:mb-8 font-sans-clean px-2">
              {submission.attending === 'attending'
                ? `We are delighted to celebrate our wedding and gown reveal with you at ${config.venueName}. Your confirmation pass is active.`
                : `We will dearly miss your presence on our wedding day. Thank you for sending your warm love and blessing.`}
            </p>

            {/* Pass details breakdown */}
            <div className="bg-[#FAF6F0] rounded-2xl p-4 sm:p-6 border border-[#EADBCC] max-w-md mx-auto text-left text-xs text-[#52443A] space-y-2 mb-6 sm:mb-8">
              <div className="flex justify-between border-b border-[#E8DCCE] pb-2">
                <span className="text-[#87786B]">Guest Count:</span>
                <span className="font-semibold">{submission.guestsCount} Reserved Seat(s)</span>
              </div>
              <div className="flex justify-between border-b border-[#E8DCCE] pb-2">
                <span className="text-[#87786B]">Selected Entrée:</span>
                <span className="font-semibold">{submission.mealPreference}</span>
              </div>
              {submission.songRequest && (
                <div className="flex justify-between border-b border-[#E8DCCE] pb-2">
                  <span className="text-[#87786B]">Song Request:</span>
                  <span className="font-semibold italic">"{submission.songRequest}"</span>
                </div>
              )}
              <div className="flex justify-between pt-1">
                <span className="text-[#87786B]">Date &amp; Venue:</span>
                <span className="font-semibold">{config.shamsiDate || '۱۴۰۵/۰۷/۰۳'} &bull; {config.venueName}</span>
              </div>
            </div>

            <button
              id="rsvp-change-response-btn"
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[42px] rounded-full border border-[#D9CABB] text-xs uppercase tracking-wider text-[#68574B] hover:border-[#8C6D37] hover:text-[#8C6D37] transition-all cursor-pointer touch-manipulation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Modify My RSVP Response</span>
            </button>
          </motion.div>
        ) : (
          /* RSVP FORM */
          <div className="bg-white/95 rounded-3xl p-5 sm:p-10 md:p-12 border border-[#E8DCD0] shadow-md">
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Attending Toggle */}
              <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-3 sm:gap-4">
                <label
                  className={`p-3.5 sm:p-4 rounded-2xl border-2 cursor-pointer text-center transition-all min-h-[64px] touch-manipulation ${
                    formData.attending === 'attending'
                      ? 'border-[#8C6D37] bg-[#FAF5EC] text-[#30261F]'
                      : 'border-[#EADBCC] bg-white text-[#6F6053] hover:border-[#D5C3AF]'
                  }`}
                >
                  <input
                    type="radio"
                    name="attending"
                    value="attending"
                    checked={formData.attending === 'attending'}
                    onChange={() => setFormData({ ...formData, attending: 'attending' })}
                    className="sr-only"
                  />
                  <div className="font-serif-luxury text-lg sm:text-xl font-bold mb-0.5">Joyfully Accept</div>
                  <div className="text-[11px] text-[#8C6D37] font-medium">I will be there to celebrate</div>
                </label>

                <label
                  className={`p-3.5 sm:p-4 rounded-2xl border-2 cursor-pointer text-center transition-all min-h-[64px] touch-manipulation ${
                    formData.attending === 'declined'
                      ? 'border-[#8C6D37] bg-[#FAF5EC] text-[#30261F]'
                      : 'border-[#EADBCC] bg-white text-[#6F6053] hover:border-[#D5C3AF]'
                  }`}
                >
                  <input
                    type="radio"
                    name="attending"
                    value="declined"
                    checked={formData.attending === 'declined'}
                    onChange={() => setFormData({ ...formData, attending: 'declined' })}
                    className="sr-only"
                  />
                  <div className="font-serif-luxury text-lg sm:text-xl font-bold mb-0.5">Regretfully Decline</div>
                  <div className="text-[11px] text-[#908174]">Will celebrate from afar</div>
                </label>
              </div>

              {/* Guest Names & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="rsvp-fullname" className="block text-xs uppercase tracking-wider text-[#63554A] font-semibold mb-2">
                    Full Name(s) *
                  </label>
                  <input
                    id="rsvp-fullname"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g., Lord & Lady Hastings"
                    className="w-full px-4 py-3 min-h-[44px] rounded-xl border border-[#E3D6C5] bg-[#FAF7F2] text-[#2C231C] text-base sm:text-sm focus:outline-none focus:border-[#8C6D37] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="rsvp-email" className="block text-xs uppercase tracking-wider text-[#63554A] font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    id="rsvp-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="hastings@example.com"
                    className="w-full px-4 py-3 min-h-[44px] rounded-xl border border-[#E3D6C5] bg-[#FAF7F2] text-[#2C231C] text-base sm:text-sm focus:outline-none focus:border-[#8C6D37] transition-colors"
                  />
                </div>
              </div>

              {formData.attending === 'attending' && (
                <>
                  {/* Guest Count & Entrée Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="rsvp-guest-count" className="block text-xs uppercase tracking-wider text-[#63554A] font-semibold mb-2">
                        Total Attending Guests
                      </label>
                      <select
                        id="rsvp-guest-count"
                        value={formData.guestsCount}
                        onChange={(e) => setFormData({ ...formData, guestsCount: Number(e.target.value) })}
                        className="w-full px-4 py-3 min-h-[44px] rounded-xl border border-[#E3D6C5] bg-[#FAF7F2] text-[#2C231C] text-base sm:text-sm focus:outline-none focus:border-[#8C6D37] transition-colors"
                      >
                        <option value={1}>1 Guest (Just Myself)</option>
                        <option value={2}>2 Guests (With Plus-One)</option>
                        <option value={3}>3 Guests (Family)</option>
                        <option value={4}>4 Guests (Family)</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="rsvp-meal-pref" className="block text-xs uppercase tracking-wider text-[#63554A] font-semibold mb-2">
                        Dinner Entrée Preference
                      </label>
                      <select
                        id="rsvp-meal-pref"
                        value={formData.mealPreference}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            mealPreference: e.target.value as RsvpSubmission['mealPreference'],
                          })
                        }
                        className="w-full px-4 py-3 min-h-[44px] rounded-xl border border-[#E3D6C5] bg-[#FAF7F2] text-[#2C231C] text-base sm:text-sm focus:outline-none focus:border-[#8C6D37] transition-colors"
                      >
                        <option value="Filet Mignon">Tuscan Prime Filet Mignon with Truffle Glaze</option>
                        <option value="Chilean Seabass">Pan-Seared Chilean Seabass with Saffron Coulis</option>
                        <option value="Wild Truffle Risotto (V)">Aged Acquerello Carnaroli Risotto with Summer Truffles (V)</option>
                        <option value="Child Meal">Artisanal Handmade Pasta (Children's Course)</option>
                      </select>
                    </div>
                  </div>

                  {/* Dietary Requirements */}
                  <div>
                    <label htmlFor="rsvp-dietary" className="block text-xs uppercase tracking-wider text-[#63554A] font-semibold mb-2">
                      Dietary Allergies or Special Requests (Optional)
                    </label>
                    <input
                      id="rsvp-dietary"
                      type="text"
                      value={formData.dietaryNotes}
                      onChange={(e) => setFormData({ ...formData, dietaryNotes: e.target.value })}
                      placeholder="e.g. Gluten-free, nut allergy, vegan"
                      className="w-full px-4 py-3 min-h-[44px] rounded-xl border border-[#E3D6C5] bg-[#FAF7F2] text-[#2C231C] text-base sm:text-sm focus:outline-none focus:border-[#8C6D37] transition-colors"
                    />
                  </div>

                  {/* Song Request for Dance Floor */}
                  <div>
                    <label htmlFor="rsvp-song" className="block text-xs uppercase tracking-wider text-[#63554A] font-semibold mb-2">
                      Song That Will Get You on The Dance Floor
                    </label>
                    <div className="relative">
                      <Music className="w-4 h-4 text-[#8C6D37] absolute left-4 top-3.5" />
                      <input
                        id="rsvp-song"
                        type="text"
                        value={formData.songRequest}
                        onChange={(e) => setFormData({ ...formData, songRequest: e.target.value })}
                        placeholder="Song title and artist..."
                        className="w-full pl-11 pr-4 py-3 min-h-[44px] rounded-xl border border-[#E3D6C5] bg-[#FAF7F2] text-[#2C231C] text-base sm:text-sm focus:outline-none focus:border-[#8C6D37] transition-colors"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Message to Sister / Couple */}
              <div>
                <label htmlFor="rsvp-blessing" className="block text-xs uppercase tracking-wider text-[#63554A] font-semibold mb-2">
                  Special Note or Blessing for {config.brideName} &amp; {config.groomName}
                </label>
                <textarea
                  id="rsvp-blessing"
                  rows={3}
                  value={formData.blessingMessage}
                  onChange={(e) => setFormData({ ...formData, blessingMessage: e.target.value })}
                  placeholder="Share a wish or advice for the happy couple..."
                  className="w-full px-4 py-3 rounded-xl border border-[#E3D6C5] bg-[#FAF7F2] text-[#2C231C] text-base sm:text-sm focus:outline-none focus:border-[#8C6D37] transition-colors"
                />
              </div>

              {/* Submit Button */}
              <button
                id="rsvp-submit-btn"
                type="submit"
                className="w-full py-4 min-h-[48px] rounded-full bg-[#8C6D37] text-white hover:bg-[#725627] transition-all font-semibold text-xs sm:text-sm uppercase tracking-widest shadow-md flex items-center justify-center gap-2 cursor-pointer touch-manipulation"
              >
                <Send className="w-4 h-4" />
                <span>Submit RSVP Response</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
