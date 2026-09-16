import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Wind,
  RotateCw,
  Eye,
  Check,
  Feather,
  Sliders,
  ChevronRight,
  Maximize2,
  Volume2,
} from 'lucide-react';
import { DressStyle } from '../types';
import { dressStylesList } from '../data/weddingData';
import { triggerGoldSparkle, triggerWeddingPetals } from '../utils/confettiEffects';

interface DressAtelierProps {
  brideName: string;
}

// Sound effect synthesizer for dress interaction (soft chime)
function playChimeNote(freq = 880) {
  try {
    const AudioCtxClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtxClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1.2);
  } catch (e) {
    // Audio contexts might be muted by browser policy before interaction
  }
}

export default function DressAtelier({ brideName }: DressAtelierProps) {
  const [selectedDressIndex, setSelectedDressIndex] = useState(0);
  const [isTwirling, setIsTwirling] = useState(false);
  const [windLevel, setWindLevel] = useState<number>(2); // 1 = Whisper, 2 = Breeze, 3 = Waltz, 4 = Gust
  const [activeHotspot, setActiveHotspot] = useState<string | null>('bodice');
  const [veilLifted, setVeilLifted] = useState(false);
  const [showMacroModal, setShowMacroModal] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePosRef = useRef({ x: 0.5, y: 0.5, active: false });

  const currentDress = dressStylesList[selectedDressIndex];

  // Wind speed labels and multipliers
  const windPresets = [
    { level: 1, label: 'Whisper', speed: 1.2, amp: 14 },
    { level: 2, label: 'Tuscan Breeze', speed: 2.4, amp: 26 },
    { level: 3, label: 'Cathedral Waltz', speed: 3.8, amp: 42 },
    { level: 4, label: 'Mistral Gust', speed: 5.6, amp: 64 },
  ];
  const activeWind = windPresets[windLevel - 1];

  // Real-time Canvas Simulation for Gossamer Silk Veil & Trailing Ribbon Physics
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Set canvas resolution
    const updateCanvasSize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Floating micro-pearl dust particles
    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 2.5 + 0.8,
      speed: Math.random() * 0.002 + 0.001,
      alpha: Math.random() * 0.7 + 0.3,
      sparklePhase: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      time += 0.02 * activeWind.speed;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Veil Origin (top head area)
      const originX = w * 0.5;
      const originY = veilLifted ? h * 0.15 : h * 0.22;

      // Mouse interactive deflection
      const mouseInfluenceX = mousePosRef.current.active
        ? (mousePosRef.current.x - 0.5) * 60
        : 0;
      const mouseInfluenceY = mousePosRef.current.active
        ? (mousePosRef.current.y - 0.5) * 40
        : 0;

      // Draw 5 layered sheer gossamer waves for veil & train
      const layers = [
        { alpha: 0.14, widthOffset: 120, waveOffset: 0, color: 'rgba(255, 250, 240,' },
        { alpha: 0.22, widthOffset: 85, waveOffset: 1.2, color: 'rgba(253, 246, 235,' },
        { alpha: 0.28, widthOffset: 55, waveOffset: 2.4, color: 'rgba(255, 255, 255,' },
        { alpha: 0.18, widthOffset: 150, waveOffset: 3.6, color: 'rgba(248, 237, 222,' },
      ];

      layers.forEach((layer, layerIdx) => {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(originX, originY);

        const steps = 30;
        const trainLengthFactor = veilLifted ? 0.6 : 0.95;
        const totalHeight = h * trainLengthFactor;

        for (let i = 0; i <= steps; i++) {
          const t = i / steps;
          const currentY = originY + t * totalHeight;

          // Sinusoidal wind ripple + mouse vortex
          const windSway =
            Math.sin(time + t * 4 + layer.waveOffset) * activeWind.amp * (t * 1.5) +
            Math.cos(time * 0.7 + t * 2) * (activeWind.amp * 0.5) +
            mouseInfluenceX * t;

          // Billowing spread as veil descends
          const spread = Math.pow(t, 1.4) * (layer.widthOffset * (w / 600));
          const currentX = originX + windSway + (layerIdx % 2 === 0 ? spread : -spread * 0.8);

          if (i === 0) {
            ctx.moveTo(currentX, currentY);
          } else {
            ctx.lineTo(currentX, currentY);
          }
        }

        // Return path creating the gossamer ribbon volume
        for (let i = steps; i >= 0; i--) {
          const t = i / steps;
          const currentY = originY + t * totalHeight + mouseInfluenceY * t;
          const windSway =
            Math.sin(time + t * 3.5 + layer.waveOffset + 0.8) *
              activeWind.amp *
              (t * 1.3) +
            mouseInfluenceX * t;
          const spread = Math.pow(t, 1.4) * (layer.widthOffset * 0.6 * (w / 600));
          const currentX =
            originX + windSway - (layerIdx % 2 === 0 ? spread * 0.4 : -spread);

          ctx.lineTo(currentX, currentY);
        }

        ctx.closePath();

        // Shimmer gradient
        const grad = ctx.createLinearGradient(0, originY, 0, h);
        grad.addColorStop(0, `${layer.color} 0.05)`);
        grad.addColorStop(0.3, `${layer.color} ${layer.alpha})`);
        grad.addColorStop(0.8, `${layer.color} ${layer.alpha * 0.7})`);
        grad.addColorStop(1, `${layer.color} 0)`);

        ctx.fillStyle = grad;
        ctx.fill();

        // Subtle French scalloped lace edge outline
        ctx.strokeStyle = `rgba(212, 175, 55, ${layer.alpha * 0.6})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
      });

      // Render floating micro-pearl sparkles along the veil current
      particles.forEach((p) => {
        p.y += p.speed * activeWind.speed;
        p.x += Math.sin(time + p.y * 5) * 0.001 * activeWind.speed;
        if (p.y > 1) p.y = 0;
        if (p.x > 1) p.x = 0;
        if (p.x < 0) p.x = 1;

        const px = p.x * w;
        const py = p.y * h;
        const sparkle = Math.sin(time * 3 + p.sparklePhase) * 0.5 + 0.5;

        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, p.size * (0.8 + sparkle * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 248, 230, ${p.alpha * sparkle})`;
        ctx.shadowColor = '#D4AF37';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeWind, veilLifted]);

  // Handle Twirl Gown action
  const handleTwirl = () => {
    if (isTwirling) return;
    setIsTwirling(true);
    playChimeNote(1046.5); // High C chime
    triggerGoldSparkle();
    setTimeout(() => {
      setIsTwirling(false);
    }, 1600);
  };

  // Handle Lift Veil flourish
  const handleToggleVeil = () => {
    setVeilLifted(!veilLifted);
    playChimeNote(1318.51); // E chime
    triggerWeddingPetals();
  };

  // Track cursor and touch on the dress canvas for dynamic breeze vortex
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mousePosRef.current = { x, y, active: true };
  };

  const handleMouseLeave = () => {
    mousePosRef.current.active = false;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (touch.clientX - rect.left) / rect.width;
      const y = (touch.clientY - rect.top) / rect.height;
      mousePosRef.current = { x, y, active: true };
    }
  };

  const handleTouchEnd = () => {
    mousePosRef.current.active = false;
  };

  return (
    <section
      id="dress-atelier"
      className="relative py-16 sm:py-28 px-3 sm:px-6 bg-radial from-[#FDFBF7] via-[#FAF6F0] to-[#F3ECE0] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#FAF7F2] to-transparent pointer-events-none" />
      <div className="absolute -left-40 top-1/3 w-96 h-96 rounded-full bg-[#EADCCB]/40 blur-3xl pointer-events-none" />
      <div className="absolute -right-40 bottom-1/4 w-96 h-96 rounded-full bg-[#EFE3D3]/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#E3D4C1] mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#8C6D37]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A6342] font-medium">
              Haute Couture Bridal Atelier
            </span>
          </div>

          <h2 className="font-serif-luxury text-3xl min-[360px]:text-4xl sm:text-5xl lg:text-6xl text-[#2B231D] tracking-tight mb-3 sm:mb-4 px-2">
            The Wedding Gown Experience
          </h2>

          <p className="font-serif-luxury italic text-base sm:text-xl text-[#6B5C50] leading-relaxed px-2">
            Inspired by classic Italian romance and French hand-beaded lace. Interact with the flowing veil physics, twirl the couture gown, and discover the bespoke silhouette tailored for {brideName}’s walk down the aisle.
          </p>
        </div>

        {/* Silhouette Switcher Tabs */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-3 flex-wrap mb-8 sm:mb-10 px-1">
          {dressStylesList.map((dress, idx) => {
            const isSelected = selectedDressIndex === idx;
            return (
              <button
                key={dress.id}
                id={`dress-tab-${dress.id}`}
                type="button"
                onClick={() => {
                  setSelectedDressIndex(idx);
                  playChimeNote(659.25 + idx * 80);
                }}
                className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 sm:gap-2 border cursor-pointer min-h-[38px] touch-manipulation ${
                  isSelected
                    ? 'bg-[#8C6D37] text-white border-[#8C6D37] shadow-md font-medium'
                    : 'bg-white/80 text-[#5F5146] border-[#E3D6C5] hover:border-[#8C6D37]/50 hover:bg-[#F8F2E8]'
                }`}
              >
                <span>{dress.silhouette}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#FFDF85]" />}
              </button>
            );
          })}
        </div>

        {/* MAIN STAGE: Dress Showcase + Interactive Physics Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Interactive Visual Canvas with Billowing Veil */}
          <div className="lg:col-span-7 flex flex-col items-center w-full">
            <div
              id="dress-canvas-stage"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchMove}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="relative w-full max-w-lg aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white bg-linear-to-b from-[#FAF5EC] to-[#E9DEC2] group select-none touch-none"
            >
              {/* Background Model / Gown Image with Twirl Animation */}
              <motion.div
                key={currentDress.id}
                animate={
                  isTwirling
                    ? {
                        rotateY: [0, 180, 360],
                        scale: [1, 1.05, 1],
                      }
                    : {
                        rotateY: 0,
                        scale: 1,
                      }
                }
                transition={{
                  duration: 1.6,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 w-full h-full flex items-center justify-center perspective-[1000px]"
              >
                <img
                  src={currentDress.image}
                  alt={currentDress.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                {/* Soft gradient overlay for contrast */}
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
              </motion.div>

              {/* REAL-TIME HTML5 CANVAS FOR BILLOWING VEIL & PARTICLES */}
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
              />

              {/* Interactive Hotspots for Dress Details */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                {/* Bodice / Pearl Hotspot */}
                <button
                  id="hotspot-bodice"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveHotspot('bodice');
                    playChimeNote(987.77);
                  }}
                  className={`pointer-events-auto absolute top-[36%] left-[48%] -translate-x-1/2 -translate-y-1/2 w-9 h-9 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all cursor-pointer touch-manipulation ${
                    activeHotspot === 'bodice'
                      ? 'bg-[#8C6D37] ring-4 ring-white/80 scale-110 shadow-lg'
                      : 'bg-white/80 text-[#8C6D37] hover:scale-110 shadow-xs'
                  }`}
                  title="View Pearl & Lace Bodice"
                >
                  <Sparkles
                    className={`w-4 h-4 ${
                      activeHotspot === 'bodice' ? 'text-white' : 'text-[#8C6D37]'
                    }`}
                  />
                </button>

                {/* Veil Hotspot */}
                <button
                  id="hotspot-veil"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveHotspot('veil');
                    playChimeNote(1174.66);
                  }}
                  className={`pointer-events-auto absolute top-[18%] right-[28%] w-9 h-9 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all cursor-pointer touch-manipulation ${
                    activeHotspot === 'veil'
                      ? 'bg-[#8C6D37] ring-4 ring-white/80 scale-110 shadow-lg'
                      : 'bg-white/80 text-[#8C6D37] hover:scale-110 shadow-xs'
                  }`}
                  title="View Gossamer Cathedral Veil"
                >
                  <Wind
                    className={`w-4 h-4 ${
                      activeHotspot === 'veil' ? 'text-white' : 'text-[#8C6D37]'
                    }`}
                  />
                </button>

                {/* Train Hotspot */}
                <button
                  id="hotspot-train"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveHotspot('train');
                    playChimeNote(783.99);
                  }}
                  className={`pointer-events-auto absolute bottom-[22%] left-[30%] w-9 h-9 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all cursor-pointer touch-manipulation ${
                    activeHotspot === 'train'
                      ? 'bg-[#8C6D37] ring-4 ring-white/80 scale-110 shadow-lg'
                      : 'bg-white/80 text-[#8C6D37] hover:scale-110 shadow-xs'
                  }`}
                  title="View Scalloped Cathedral Train"
                >
                  <Feather
                    className={`w-4 h-4 ${
                      activeHotspot === 'train' ? 'text-white' : 'text-[#8C6D37]'
                    }`}
                  />
                </button>
              </div>

              {/* Floating Bottom Live Status Pill */}
              <div className="absolute bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-4 z-20 flex items-center justify-between pointer-events-none">
                <div className="bg-black/60 backdrop-blur-md px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-white text-[10px] sm:text-[11px] flex items-center gap-1.5 sm:gap-2 border border-white/20">
                  <Wind className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4AF37] animate-pulse" />
                  <span>Wind: <strong>{activeWind.label}</strong></span>
                </div>

                <div className="bg-white/90 backdrop-blur-md px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[#3A2F27] text-[10px] sm:text-[11px] font-medium border border-[#E0D2C2] shadow-xs">
                  <span className="hidden sm:inline">Hover to ripple veil</span>
                  <span className="sm:hidden">Touch to ripple veil</span>
                </div>
              </div>
            </div>

            {/* Canvas Interactive Controls Bar */}
            <div className="w-full max-w-lg mt-4 sm:mt-5 bg-white/90 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-[#EADFD2] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              {/* Twirl Button */}
              <button
                id="dress-action-twirl-btn"
                type="button"
                onClick={handleTwirl}
                disabled={isTwirling}
                className="w-full sm:w-auto px-4 py-2.5 min-h-[42px] rounded-xl bg-[#8C6D37] text-white hover:bg-[#725627] transition-all text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs cursor-pointer touch-manipulation"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isTwirling ? 'animate-spin' : ''}`} />
                <span>{isTwirling ? 'Swirling...' : 'Twirl Gown (360°)'}</span>
              </button>

              {/* Lift Veil Button */}
              <button
                id="dress-action-lift-veil-btn"
                type="button"
                onClick={handleToggleVeil}
                className={`w-full sm:w-auto px-4 py-2.5 min-h-[42px] rounded-xl border text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer touch-manipulation ${
                  veilLifted
                    ? 'bg-[#EFE5D8] border-[#8C6D37] text-[#73582B]'
                    : 'bg-white border-[#D9CCBF] text-[#55473D] hover:bg-[#FAF5ED]'
                }`}
              >
                <Feather className="w-3.5 h-3.5 text-[#8C6D37]" />
                <span>{veilLifted ? 'Lower Veil' : 'Flourish Veil'}</span>
              </button>

              {/* Wind Speed Selector */}
              <div className="flex items-center justify-center gap-1.5 w-full sm:w-auto pt-1 sm:pt-0">
                <span className="text-[11px] text-[#807062] uppercase tracking-wider mr-1">Breeze:</span>
                {[1, 2, 3, 4].map((lvl) => (
                  <button
                    key={lvl}
                    id={`wind-level-btn-${lvl}`}
                    type="button"
                    onClick={() => {
                      setWindLevel(lvl);
                      playChimeNote(500 + lvl * 100);
                    }}
                    className={`w-8 h-8 sm:w-7 sm:h-7 min-w-[32px] min-h-[32px] rounded-lg text-xs font-medium transition-all touch-manipulation ${
                      windLevel === lvl
                        ? 'bg-[#3A3028] text-white shadow-xs'
                        : 'bg-[#F2EAE0] text-[#6A5A4D] hover:bg-[#E8DCCF]'
                    }`}
                    title={windPresets[lvl - 1].label}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Couture Specs, Atelier Notes & Fabric Inspection */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-white/95 rounded-3xl p-6 sm:p-8 border border-[#E9DFD3] shadow-md relative">
              {/* Silhouette Tag */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs uppercase tracking-[0.2em] text-[#8C6D37] font-semibold">
                  {currentDress.silhouette}
                </span>
                <span className="text-xs text-[#8A796C] bg-[#FAF5EE] px-3 py-1 rounded-full border border-[#EDE2D3]">
                  Train: {currentDress.trainLength}
                </span>
              </div>

              {/* Dress Name */}
              <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#2B231D] mb-2 font-normal">
                {currentDress.name}
              </h3>

              {/* Tagline */}
              <p className="font-serif-luxury italic text-base sm:text-lg text-[#6B5A4E] mb-6">
                "{currentDress.tagline}"
              </p>

              {/* Description */}
              <p className="text-sm text-[#5B4E44] leading-relaxed mb-6 font-sans-clean">
                {currentDress.description}
              </p>

              {/* Fabrics Pill List */}
              <div className="mb-6">
                <span className="block text-[11px] uppercase tracking-wider text-[#938275] mb-2 font-medium">
                  Haute Couture Textiles &amp; Materials
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentDress.fabrics.map((fabric) => (
                    <span
                      key={fabric}
                      className="px-3 py-1 rounded-full bg-[#FAF5ED] border border-[#E5D7C7] text-xs text-[#4F433A] font-medium"
                    >
                      {fabric}
                    </span>
                  ))}
                </div>
              </div>

              {/* Dynamic Hotspot Information Card */}
              <div className="p-4 rounded-2xl bg-[#FAF5EC] border border-[#E7D9C9] mb-6">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#8C6D37] font-semibold mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {activeHotspot === 'bodice'
                      ? 'Embroidered Bodice & Pearls'
                      : activeHotspot === 'veil'
                      ? 'Flowing Cathedral Veil'
                      : 'Scalloped Train & Godets'}
                  </span>
                </div>
                <p className="text-xs text-[#635347] leading-relaxed">
                  {activeHotspot === 'bodice'
                    ? 'Adorned with over 1,200 micro seed pearls and crystal droplets that catch the Tuscan sunset light.'
                    : activeHotspot === 'veil'
                    ? `Handcrafted ${currentDress.veilType} that billows in the ambient wind, framing every photograph with ethereal majesty.`
                    : `Dramatic ${currentDress.trainLength} designed to glide smoothly down the church aisle and ballroom terraces.`}
                </p>
              </div>

              {/* Couture Key Features */}
              <div className="space-y-2.5 mb-6">
                {currentDress.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-[#4E4137]">
                    <div className="w-4 h-4 rounded-full bg-[#EADCCB] text-[#785B28] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Sister Personal Curator Note */}
              <div className="p-4 rounded-2xl bg-[#F5EFE6] border-l-4 border-[#8C6D37] text-xs text-[#52443A] italic font-serif-luxury leading-relaxed mb-6">
                <strong>Curator’s Note:</strong> {currentDress.curatorNote}
              </div>

              {/* Quick Action: Confetti Shower for the Sister */}
              <button
                id="dress-celebrate-bride-btn"
                type="button"
                onClick={() => {
                  triggerWeddingPetals();
                  triggerGoldSparkle();
                  playChimeNote(1318.51);
                }}
                className="w-full py-3 rounded-full bg-[#FAF4EB] border border-[#D9C8B6] hover:border-[#8C6D37] hover:bg-[#F2E5D5] transition-all text-xs uppercase tracking-widest text-[#785F32] font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-[#8C6D37]" />
                <span>Shower {brideName} With Petals</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
