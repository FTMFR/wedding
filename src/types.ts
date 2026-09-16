export type PersianFontId =
  | 'nastaliq'
  | 'vazirmatn'
  | 'amiri'
  | 'katibeh'
  | 'arefruqaa'
  | 'lalezar'
  | 'elmessiri'
  | 'gulzar'
  | 'lateef'
  | 'mirza'
  | 'markazitext'
  | 'scheherazade'
  | 'harmattan'
  | 'reemkufi'
  | 'cairo'
  | 'mada'
  | 'notoserif'
  | 'notosans'
  | 'almarai'
  | 'rakkas';

export type PersianFontFamily = PersianFontId;

export interface PersianFontOption {
  id: PersianFontId;
  name: string;
  category: string;
  cssFamily: string;
  previewText: string;
  description: string;
}

export interface WeddingConfig {
  brideName: string;
  groomName: string;
  weddingDate: string; // ISO or date string e.g. "2026-09-25T16:00:00"
  shamsiDate?: string; // e.g. "۱۴۰۵/۰۷/۰۳"
  tagline: string;
  venueName: string;
  venueLocation: string;
  venueAddress: string;
  mapsUrl: string;
  rsvpDeadline: string;
  coupleMonogram: string;
  storyHeading: string;
  storyQuote: string;
  dressTheme: string;
  persianFontFamily?: PersianFontFamily;
}

export interface DressStyle {
  id: string;
  name: string;
  silhouette: 'Cathedral A-Line' | 'Royal Ballgown' | 'Sheath Mermaid' | 'Ethereal Slip';
  tagline: string;
  description: string;
  fabrics: string[];
  veilType: string;
  trainLength: string;
  accentColor: string;
  image: string;
  features: string[];
  curatorNote: string;
}

export interface EventScheduleItem {
  id: string;
  time: string;
  title: string;
  location: string;
  description: string;
  dressNote?: string;
  iconName: string;
}

export interface RsvpSubmission {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  attending: 'attending' | 'declined';
  guestsCount: number;
  dietaryNotes?: string;
  mealPreference: 'Filet Mignon' | 'Chilean Seabass' | 'Wild Truffle Risotto (V)' | 'Child Meal';
  songRequest?: string;
  blessingMessage?: string;
  submittedAt: string;
}

export interface GuestbookWish {
  id: string;
  name: string;
  message: string;
  relation: string;
  stamp: '🥂' | '💍' | '🕊️' | '🌹' | '👰' | '✨';
  likes: number;
  createdAt: string;
}

export interface AttireColorPalette {
  name: string;
  hex: string;
  complementaryHex: string;
  description: string;
  role: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  composer: string;
  category: string;
  durationFormatted: string;
  audioUrl: string;
  description: string;
  coverImage?: string;
}
