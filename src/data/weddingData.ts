import { WeddingConfig, DressStyle, EventScheduleItem, AttireColorPalette, GuestbookWish } from '../types';

export const initialWeddingConfig: WeddingConfig = {
  brideName: 'پریا',
  groomName: 'محسن',
  weddingDate: '2026-09-25T14:00:00',
  shamsiDate: '۱۴۰۵/۰۷/۰۳',
  tagline: 'با نامش و در پناهش • جشن عقد پریا و محسن',
  venueName: 'خانه عقد آوین',
  venueLocation: 'خیابان جابرانصاری،بین کوچه ۷ و ۹، خانه عقد آوین',
  venueAddress: 'خیابان جابرانصاری،بین کوچه ۷ و ۹، خانه عقد آوین',
  mapsUrl: 'https://neshan.org/maps/places/f02ea3f41f2882c01772581103cc2ff0#c32.704-51.671-21z-0p/32.70433931273475/51.671024689537326',
  rsvpDeadline: '۱۴۰۵/۰۶/۲۵',
  coupleMonogram: 'P & M',
  storyHeading: 'جشن عقد پریا و محسن',
  storyQuote: '“تو نوبرانه یک عمر انتظار منی - حضورتان یادگار است و خاطره‌ای ماندگار”',
  dressTheme: 'شکوه ابریشم و تور عروس',
  persianFontFamily: 'nastaliq'
};

export const dressStylesList: DressStyle[] = [
  {
    id: 'cathedral-lace',
    name: 'The Chantilly Cathedral Heirloom',
    silhouette: 'Cathedral A-Line',
    tagline: 'Cascading gossamer veil & French scalloped floral embroidery',
    description: 'Breathtaking hand-appliquéd Chantilly lace over warm champagne organza. Features an illusion sweetheart neckline, semi-sheer bodice adorned with freshwater seed pearls, and a dramatic 3.5-meter cathedral train designed to flow seamlessly in the wind.',
    fabrics: ['French Chantilly Lace', 'Mulberry Silk Organza', 'Illusion Tulle', 'Seed Pearls'],
    veilType: '3.5m Cathedral Gossamer Veil with Blusher',
    trainLength: '120 inches (Cathedral)',
    accentColor: '#F5EBE6',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    features: [
      'Interactive flowing veil physics in ambient breeze',
      'Hand-sewn micro-pearl bodice accents that glint in sunlight',
      'French scalloped lace hem with invisible horsehair braid for floating movement',
      'Detachable gossamer off-shoulder sleeves for reception dance'
    ],
    curatorNote: 'Eleanor’s dream design: tailored specifically for the golden hour sunset breeze across the Tuscan cypress hills.'
  },
  {
    id: 'sculpted-mikado',
    name: 'The Royal Sovereign Silk Mikado',
    silhouette: 'Royal Ballgown',
    tagline: 'Architectural drapery with hidden pockets & pearl-capped spine',
    description: 'Sculpted from luminous Italian Mikado silk that holds dramatic, liquid folds of light. An architectural fold-over portrait collar frames the decolletage, flowing into a structured corseted waist and regal box-pleated skirt.',
    fabrics: ['Italian Mikado Silk', 'Duchess Silk Satin', 'Silk Grosgrain Ribbon'],
    veilType: 'Double-tier Waltz Length with Silk Ribbon Edge',
    trainLength: '90 inches (Chapel)',
    accentColor: '#FBF8F5',
    image: 'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=1200&q=85',
    features: [
      'Sculptural asymmetric neckline catching cinematic ambient light',
      'Seventy-two functioning silk-covered buttons trailing down the train',
      'Contoured inner corset with 16 flex-spiral steel bones for graceful posture',
      'Concealed velvet-lined pockets for vows and handkerchief'
    ],
    curatorNote: 'Timeless old-world luxury reminiscent of mid-century couture royalty.'
  },
  {
    id: 'ethereal-mermaid',
    name: 'The Celestial Botanical Siren',
    silhouette: 'Sheath Mermaid',
    tagline: '3D embroidered wisteria vines, low illusion back & godet flares',
    description: 'A romantic silhouette that hugs natural contours before bursting into dramatic godets of layered silk tulle. Three-dimensional wisteria petals cascade from the shoulder down to the swirling floor puddle.',
    fabrics: ['Crepe de Chine', 'Layered English Netting', '3D Laser-cut Silk Petals'],
    veilType: 'Fingertip Length Scattered Pearl Drops',
    trainLength: '70 inches (Semi-Cathedral)',
    accentColor: '#F4ECE4',
    image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=85',
    features: [
      'Plunging illusion spine with floating crystalline drop pendants',
      'Dimensional flower petals that flutter with each step',
      'Lightweight crepe base providing effortless movement on stone terraces',
      'Seamless transition from ceremony solemnity to reception romance'
    ],
    curatorNote: 'Created for the botanical waltz among the olive groves.'
  },
  {
    id: 'minimalist-liquid',
    name: 'The Golden Hour Liquid Slip',
    silhouette: 'Ethereal Slip',
    tagline: '40mm heavy silk crepe with draped cowl & removable capelet',
    description: 'The epitome of contemporary understated allure. Cut on the bias in heavy 40mm silk crepe, creating an effortless liquid drape that shimmers like molten champagne under candle glow.',
    fabrics: ['40mm Heavy Silk Crepe', 'Silk Habotai Lining', 'Swarovski Crystal Fringe'],
    veilType: 'Floor-Sweeping Silk Organza Capelet',
    trainLength: '45 inches (Sweep Train)',
    accentColor: '#EFE8DE',
    image: 'https://images.unsplash.com/photo-1546804784-896d0dca3805?auto=format&fit=crop&w=1200&q=85',
    features: [
      'Bias cut that follows body kinetics with fluid, rippling motion',
      'Delicate spaghetti straps with back diamond-cross harness',
      'Removable sheer silk organza flutter capelet for breezy outdoor moments',
      'Unrivaled ease for twirling on the dance floor until midnight'
    ],
    curatorNote: 'Eleanor’s selected after-party dress for the moonlit midnight waltz.'
  }
];

export const weddingSchedule: EventScheduleItem[] = [
  {
    id: 'welcome',
    time: '15:30',
    title: 'Guest Arrival & Prosecco Prelude',
    location: 'The Olive Grove Terrace',
    description: 'Chamber string quartet plays gentle classical melodies as guests are greeted with chilled Bellinis and Tuscan hors d\'oeuvres.',
    dressNote: 'Garden Cocktail & Formal Elegance',
    iconName: 'GlassWater'
  },
  {
    id: 'ceremony',
    time: '16:30',
    title: 'The Sacred Vow Exchange',
    location: 'The Cypress Arc & Stone Chapel',
    description: 'The bridal processional, blessing of the rings, and exchange of lifelong promises under the romantic stone pergola.',
    dressNote: 'Cathedral Gown & Veil Reveal',
    iconName: 'HeartHandshake'
  },
  {
    id: 'cocktail',
    time: '17:45',
    title: 'Golden Hour Aperitivo & Bridal Photos',
    location: 'Belvedere Sunset Lawn',
    description: 'Watch the sun dip behind the rolling hills with artisanal cheeses, local Chianti, and live acoustic Italian waltzes.',
    dressNote: 'Veil in the Golden Hour Breeze',
    iconName: 'Sun'
  },
  {
    id: 'banquet',
    time: '19:15',
    title: 'Candlelit Banquet & Heartfelt Toasts',
    location: 'The Glasshouse Orangery',
    description: 'A four-course culinary journey celebrating regional Italian heritage, paired with speeches from family and dearest friends.',
    dressNote: 'Black-Tie / Warm Romantic Attire',
    iconName: 'Utensils'
  },
  {
    id: 'dance-cake',
    time: '21:30',
    title: 'First Dance & Millefoglie Cutting',
    location: 'The Grand Courtyard Fountain',
    description: 'Eleanor and Alexander’s first dance surrounded by hundreds of floating tea lights, followed by live pastry preparation.',
    dressNote: 'Bride Gown Transformation / Swirl',
    iconName: 'Sparkles'
  },
  {
    id: 'sendoff',
    time: '23:45',
    title: 'Midnight Sparkler Send-Off',
    location: 'The Cypress Avenue Walkway',
    description: 'A luminous farewell under the starry Tuscan sky as the newlyweds depart in a vintage Alfa Romeo.',
    dressNote: 'Liquid Silk After-Party Gown',
    iconName: 'Moon'
  }
];

export const attirePalettes: AttireColorPalette[] = [
  {
    name: 'Champagne & Rose Gold',
    hex: '#E8D5C4',
    complementaryHex: '#C5A059',
    description: 'Warm, luminous shades that echo the golden embroidery and bridal shimmer.',
    role: 'Bridesmaids & Immediate Family'
  },
  {
    name: 'Tuscan Olive & Sage',
    hex: '#A3B19B',
    complementaryHex: '#6F7E68',
    description: 'Subtle botanical greens inspired by century-old olive groves and eucalyptus foliage.',
    role: 'Honored Guests & Matrons'
  },
  {
    name: 'Dusty Terracotta & Clay',
    hex: '#C88A75',
    complementaryHex: '#8C5645',
    description: 'Rich sunset tones that bring warm Mediterranean romance into the evening lights.',
    role: 'Wedding Party & Evening Attire'
  },
  {
    name: 'Midnight Navy & Black Tie',
    hex: '#1E293B',
    complementaryHex: '#475569',
    description: 'Sharp, timeless tailoring creating high contrast against the ethereal ivory gowns.',
    role: 'Groomsmen & Formal Suiting'
  },
  {
    name: 'Warm Cashmere Sand',
    hex: '#DFD7CA',
    complementaryHex: '#A69B89',
    description: 'Soft neutral linen and silk palettes ensuring guests look effortlessly cohesive.',
    role: 'Daytime Cocktail Guests'
  }
];

export const storyMilestones = [
  {
    year: '2021',
    title: 'The Serendipitous Library Encounter',
    subtitle: 'Florence',
    description: 'Reaching for the exact same antique volume of Renaissance poetry, their eyes met across the sunlit marble desk. What began as an afternoon espresso discussion became hours of endless laughter.',
    image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80'
  },
  {
    year: '2023',
    title: 'The Sunset Proposal on Lake Como',
    subtitle: 'Varenna',
    description: 'Aboard a wooden Riva boat as the pink alpine glow illuminated the tranquil waters, Alexander knelt with an heirloom ring passed down through generations. Eleanor said yes through tears of joy.',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80'
  },
  {
    year: '2025',
    title: 'The Paris Atelier Dress Fitting',
    subtitle: 'Rue du Faubourg Saint-Honoré',
    description: 'Accompanied by her sister, Eleanor stepped into the bridal salon. When the gossamer veil was placed and the cathedral train cascaded down the salon stairs, the entire room fell silent in awe.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
  }
];

export const initialGuestWishes: GuestbookWish[] = [
  {
    id: 'wish-1',
    name: 'Camilla & Matteo (Sister & Brother-in-law)',
    message: 'To my dearest sister Eleanor: Watching you find your forever love in Alexander has been the greatest gift. You are going to take everyone’s breath away in that dress! We love you unconditionally!',
    relation: 'Sister of the Bride',
    stamp: '👰',
    likes: 24,
    createdAt: '2 hours ago'
  },
  {
    id: 'wish-2',
    name: 'Grandmother Genevieve',
    message: 'May your marriage be blessed with deep patience, joyful laughter, and kindness that grows sweeter with every passing season.',
    relation: 'Family Matriarch',
    stamp: '🕊️',
    likes: 19,
    createdAt: 'Yesterday'
  },
  {
    id: 'wish-3',
    name: 'Oliver & Sophie Vance',
    message: 'Counting down the days! Already polishing our dancing shoes and can’t wait to raise a glass of Chianti to the most beautiful couple.',
    relation: 'Close Friends',
    stamp: '🥂',
    likes: 15,
    createdAt: '2 days ago'
  },
  {
    id: 'wish-4',
    name: 'Dr. Arthur Sterling',
    message: 'Alexander, you are the luckiest man alive. Eleanor, you radiate joy and warmth wherever you walk. Cheers to a lifetime of adventures!',
    relation: 'University Mentor',
    stamp: '💍',
    likes: 12,
    createdAt: '3 days ago'
  }
];
