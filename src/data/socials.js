// Single source of truth for the studio's contact + social links.
// Update these and every section (nav, feed, contact, footer, CTAs) follows.
export const studio = {
  email: 'hello@blinkskyproductions.com',
  phone: '+94 77 000 0000',
  // Digits only, with country code and no +, spaces or dashes — used for wa.me links.
  // TODO: replace with the studio's real WhatsApp number.
  whatsapp: '94770000000',
  location: 'Colombo, Sri Lanka',
  instagramHandle: 'blink_sky_production',
  instagram: 'https://www.instagram.com/blink_sky_production',
  facebook: 'https://www.facebook.com/share/19CaU4mRox/',
  tiktok: 'https://www.tiktok.com/@blinkskyproduction',
}

/** Build a WhatsApp deep link with a pre-filled message. */
export function whatsappLink(message = "Hi BlinkSky! I'd like to enquire about a shoot.") {
  return `https://wa.me/${studio.whatsapp}?text=${encodeURIComponent(message)}`
}
