import {
  Camera,
  Heart,
  Gem,
  Building2,
  Cake,
  Sparkles,
  Video,
  Users,
} from 'lucide-react'

// Each service: the studio's offerings. Swap descriptions freely.
export const services = [
  {
    id: 'model',
    title: 'Model Shoots',
    icon: Camera,
    blurb:
      'Editorial and portfolio work that turns a face into a story — studio light, location, and direction that makes the camera fall in love.',
    tags: ['Editorial', 'Portfolio', 'Fashion'],
  },
  {
    id: 'wedding',
    title: 'Wedding Shoots',
    icon: Heart,
    blurb:
      'Full-day cinematic coverage of the vows, the tears and the dance floor — photo and film crafted so the day never fades.',
    tags: ['Full Day', 'Cinematic Film', 'Album'],
  },
  {
    id: 'bridal',
    title: 'Bridal Shoots',
    icon: Gem,
    blurb:
      'The dress, the details, the quiet moment before it all begins. Timeless bridal portraits with an editorial edge.',
    tags: ['Portrait', 'Getting Ready', 'Details'],
  },
  {
    id: 'commercial',
    title: 'Commercial Shoots',
    icon: Building2,
    blurb:
      'Product, brand and campaign visuals built to sell — clean, considered and made to look right on every screen.',
    tags: ['Product', 'Brand', 'Campaign'],
  },
  {
    id: 'birthday',
    title: 'Birthday Shoots',
    icon: Cake,
    blurb:
      'From first birthdays to milestone parties — candid, colourful coverage that keeps the laughter alive for years.',
    tags: ['Candid', 'Family', 'Events'],
  },
  {
    id: 'puberty',
    title: 'Coming-of-Age Shoots',
    icon: Sparkles,
    blurb:
      'Puberty and coming-of-age ceremonies photographed with warmth and cultural care — a milestone captured with dignity.',
    tags: ['Ceremony', 'Traditional', 'Family'],
  },
  {
    id: 'video',
    title: 'Videography',
    icon: Video,
    blurb:
      'Cinematic films, reels and highlight edits — colour-graded and scored to move the way the moment felt.',
    tags: ['Reels', 'Highlight Films', 'Colour Grade'],
  },
  {
    id: 'events',
    title: 'Events & More',
    icon: Users,
    blurb:
      'Corporate events, engagements, maternity and beyond. If it matters to you, we frame it — just ask.',
    tags: ['Corporate', 'Engagement', 'Maternity'],
  },
]
