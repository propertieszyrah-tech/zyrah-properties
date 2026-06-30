import { ExternalLink } from 'lucide-react'
import { mapEmbedUrl, mapLink } from '../lib/utils.js'

// Embedded Google Map from lat/lng — no API key needed.
export default function MapEmbed({ lat, lng, title }) {
  if (lat == null || lng == null) return null
  return (
    <div className="overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-card">
      <iframe
        title={`Map location of ${title}`}
        src={mapEmbedUrl(lat, lng)}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-72 w-full border-0"
        allowFullScreen
      />
      <a
        href={mapLink(lat, lng)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 border-t border-brand-100 py-3 text-sm font-medium text-brand-700 transition hover:bg-brand-50"
      >
        Open in Google Maps <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  )
}
