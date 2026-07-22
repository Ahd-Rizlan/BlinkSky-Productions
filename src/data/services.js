import {
  Camera,
  Heart,
  Gem,
  Building2,
  Cake,
  Sparkles,
  Video,
  Users,
  GraduationCap,
  Crown,
  Flame,
} from 'lucide-react'

// Swap `image` for your own work (e.g. /gallery/wedding-hero.jpg) — these are
// placeholders so the section looks alive today.
const u = (id, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

// Each service: the studio's offerings. Add, remove or rename freely — the
// "What We Shoot" grid renders whatever is listed here.
export const services = [
  {
    id: 'wedding',
    title: 'Wedding Shoots',
    icon: Heart,
    image: u('photo-1519741497674-611481863552'),
    blurb:
      'Full-day cinematic coverage of the vows, the tears and the dance floor — photo and film crafted so the day never fades.',
    tags: ['Full Day', 'Cinematic Film', 'Album'],
  },
  {
    id: 'bridal',
    title: 'Bridal Shoots',
    icon: Gem,
    image: u('photo-1594552072238-b8a33785b261'),
    blurb:
      'The dress, the details, the quiet moment before it all begins. Timeless bridal portraits with an editorial edge.',
    tags: ['Portrait', 'Getting Ready', 'Details'],
  },
  {
    id: 'model',
    title: 'Model Shoots',
    icon: Camera,
    image: u('photo-1524504388940-b1c1722653e1'),
    blurb:
      'Editorial and portfolio work that turns a face into a story — studio light, location, and direction that makes the camera fall in love.',
    tags: ['Editorial', 'Portfolio', 'Fashion'],
  },
  {
    id: 'commercial',
    title: 'Commercial Shoots',
    icon: Building2,
    image: u('photo-1523275335684-37898b6baf30'),
    blurb:
      'Product, brand and campaign visuals built to sell — clean, considered and made to look right on every screen.',
    tags: ['Product', 'Brand', 'Campaign'],
  },
  {
    id: 'birthday',
    title: 'Birthday Shoots',
    icon: Cake,
    image: u('photo-1530103862676-de8c9debad1d'),
    blurb:
      'From first birthdays to milestone parties — candid, colourful coverage that keeps the laughter alive for years.',
    tags: ['Candid', 'Family', 'Events'],
  },
  {
    id: 'graduation',
    title: 'Graduation Portraits',
    icon: GraduationCap,
    image: u('photo-1627556704302-624286467c65'),
    blurb:
      'Cap, gown and the pride of the day — solo portraits and group shots that mark the milestone in style.',
    tags: ['Solo', 'Group', 'Convocation'],
  },
  {
    id: 'prom',
    title: 'Prom & Formal Portraits',
    icon: Crown,
    image: u('photo-1566174053879-31528523f8ae'),
    blurb:
      'Prom nights, formals and black-tie moments — polished portraits with all the glamour the occasion deserves.',
    tags: ['Prom', 'Formal', 'Couples'],
  },
  {
    id: 'religious',
    title: 'Religious Ceremonies',
    icon: Flame,
    image: u('photo-1545239705-1564e58b9e4a'),
    blurb:
      'Blessings, poojas, baptisms and cultural rites — documented with respect and a quiet, unobtrusive presence.',
    tags: ['Ceremony', 'Cultural', 'Traditional'],
  },
  {
    id: 'puberty',
    title: 'Puberty Ceremony',
    icon: Sparkles,
    image: u('photo-1464349095431-e9a21285b5f3'),
    blurb:
      'Puberty ceremonies photographed with warmth and cultural care — a coming-of-age milestone captured with dignity.',
    tags: ['Ceremony', 'Traditional', 'Family'],
  },
  {
    id: 'video',
    title: 'Videography',
    icon: Video,
    image: u('photo-1470784789206-3d76d4b5dae0'),
    blurb:
      'Cinematic films, reels and highlight edits — colour-graded and scored to move the way the moment felt.',
    tags: ['Reels', 'Highlight Films', 'Colour Grade'],
  },
  {
    id: 'events',
    title: 'Events & Everything Else',
    icon: Users,
    image: u('photo-1465495976277-4387d4b0b4c6'),
    blurb:
      'Corporate events, engagements, maternity, homecomings and beyond. Whatever the occasion — if it matters to you, we frame it.',
    tags: ['Corporate', 'Engagement', 'Maternity'],
  },
]
