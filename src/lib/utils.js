import { site } from '../data/site.js'

// Format a rupee amount in Indian numbering (e.g. 4500000 -> "₹45,00,000").
export function formatPrice(value) {
  if (value == null || Number.isNaN(value)) return 'Price on request'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

// Compact rupee label for cards (e.g. "₹45.0 L", "₹1.85 Cr").
export function formatPriceCompact(value) {
  if (value == null || Number.isNaN(value)) return 'On request'
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)} L`
  return formatPrice(value)
}

// Build a wa.me link with an optional pre-filled message.
export function whatsappLink(message = '') {
  const base = `https://wa.me/${site.whatsappNumber}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

// Build a tel: link.
export function telLink() {
  return `tel:+${site.phoneDial}`
}

// Build a wa.me link to a SPECIFIC number (e.g. a particular agent).
export function whatsappTo(number, message = '') {
  const base = `https://wa.me/${number}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

// Build a tel: link to a specific dial number.
export function telTo(dial) {
  return `tel:+${dial}`
}

// Pre-filled enquiry message for a specific plot.
export function enquiryMessage(land) {
  return `Hi, I'm interested in ${land.title} listed for ${formatPrice(
    land.price,
  )}. Please share more details.`
}

// Google Maps embed URL from lat/lng (no API key required).
export function mapEmbedUrl(lat, lng) {
  return `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`
}

// Google Maps "open in app/browser" link.
export function mapLink(lat, lng) {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
}

// Human-readable location string.
export function locationString(location) {
  if (!location) return ''
  return [location.area, location.city, location.district, location.state]
    .filter(Boolean)
    .join(', ')
}

// Short location (area, city) for cards.
export function shortLocation(location) {
  if (!location) return ''
  return [location.area, location.city].filter(Boolean).join(', ')
}

// Tailwind classes for a status badge.
export function statusStyle(status) {
  switch (status) {
    case 'Sold':
      return 'bg-rose-100 text-rose-700 ring-1 ring-rose-200'
    case 'Under Offer':
      return 'bg-gold-300/40 text-gold-700 ring-1 ring-gold-400/50'
    case 'Available':
    default:
      return 'bg-brand-100 text-brand-700 ring-1 ring-brand-200'
  }
}

// classnames helper
export function cx(...parts) {
  return parts.filter(Boolean).join(' ')
}
