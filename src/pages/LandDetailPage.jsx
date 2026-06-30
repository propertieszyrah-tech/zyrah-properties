import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  MapPin,
  Compass,
  Maximize2,
  Ruler,
  Route,
  FileText,
  ScrollText,
  BadgeCheck,
  CheckCircle2,
} from 'lucide-react'
import { lands } from '../data/lands.js'
import Seo from '../components/Seo.jsx'
import ImageGallery from '../components/ImageGallery.jsx'
import MapEmbed from '../components/MapEmbed.jsx'
import ShareButton from '../components/ShareButton.jsx'
import { CallButton, WhatsAppButton } from '../components/CtaButtons.jsx'
import {
  formatPrice,
  locationString,
  enquiryMessage,
  statusStyle,
  cx,
} from '../lib/utils.js'

function DetailRow({ Icon, label, value }) {
  if (!value) return null
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-card">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-ink/50">{label}</p>
        <p className="mt-0.5 font-medium text-brand-800">{value}</p>
      </div>
    </div>
  )
}

export default function LandDetailPage() {
  const { id } = useParams()
  const land = lands.find((l) => l.id === id)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [id])

  if (!land) {
    return (
      <div className="container-px flex min-h-[70vh] flex-col items-center justify-center text-center">
        <h1 className="font-display text-3xl font-bold text-brand-800">Plot not found</h1>
        <p className="mt-2 text-ink/60">This listing may have been removed or sold.</p>
        <Link
          to="/#lands"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-700 px-6 py-3 font-semibold text-white shadow-cta"
        >
          <ArrowLeft className="h-4 w-4" /> Back to listings
        </Link>
      </div>
    )
  }

  const sizeParts = [
    land.size?.cents ? `${land.size.cents} cents` : null,
    land.size?.acres ? `${land.size.acres} acres` : null,
    land.size?.sqft ? `${land.size.sqft.toLocaleString('en-IN')} sq.ft` : null,
  ].filter(Boolean)

  return (
    <article className="bg-cream pb-28 pt-20 sm:pb-16">
      <Seo
        title={`${land.title} — Zyrah Properties`}
        description={`${land.type} plot in ${locationString(land.location)} — ${formatPrice(land.price)}. ${land.approval}. Enquire on WhatsApp.`}
        image={land.images[0]}
      />

      <div className="container-px">
        {/* Back link */}
        <Link
          to="/#lands"
          className="inline-flex items-center gap-2 py-4 text-sm font-medium text-ink/60 transition hover:text-brand-700"
        >
          <ArrowLeft className="h-4 w-4" /> Back to listings
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Left: gallery + description */}
          <div className="space-y-8">
            <ImageGallery images={land.images} landId={land.id} alt={land.title} />

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-3xl bg-white p-6 shadow-card sm:p-8"
            >
              <h2 className="font-display text-xl font-bold text-brand-800">Overview</h2>
              <p className="mt-3 leading-relaxed text-ink/70">{land.description}</p>

              {/* Nearby */}
              {land.nearby?.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-display text-base font-semibold text-brand-800">
                    Nearby landmarks & amenities
                  </h3>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {land.nearby.map((n) => (
                      <li key={n} className="flex items-start gap-2 text-sm text-ink/70">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>

            {/* Map */}
            <MapEmbed lat={land.latitude} lng={land.longitude} title={land.title} />
          </div>

          {/* Right: sticky summary */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl bg-white p-6 shadow-card"
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={cx(
                    'inline-block rounded-full px-3 py-1 text-xs font-semibold',
                    statusStyle(land.status),
                  )}
                >
                  {land.status}
                </span>
                <ShareButton title={land.title} price={formatPrice(land.price)} />
              </div>

              <h1 className="mt-4 font-display text-2xl font-bold leading-tight text-brand-800">
                {land.title}
              </h1>
              <p className="mt-2 flex items-start gap-1.5 text-sm text-ink/60">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                {locationString(land.location)}
              </p>

              <div className="mt-5 border-t border-brand-50 pt-5">
                <p className="font-display text-3xl font-bold text-brand-800">
                  {formatPrice(land.price)}
                </p>
                {land.priceLabel && (
                  <p className="text-sm text-ink/50">{land.priceLabel}</p>
                )}
              </div>

              {/* CTAs */}
              <div className="mt-6 flex flex-col gap-3">
                <WhatsAppButton
                  full
                  label="Enquire on WhatsApp"
                  message={enquiryMessage(land)}
                />
                <CallButton full />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Full detail grid */}
        <div className="mt-8">
          <h2 className="font-display text-xl font-bold text-brand-800">Plot details</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <DetailRow Icon={Maximize2} label="Total size" value={sizeParts.join(' · ')} />
            <DetailRow Icon={Ruler} label="Dimensions" value={land.dimensions} />
            <DetailRow Icon={Compass} label="Facing" value={`${land.facing} facing`} />
            <DetailRow Icon={Route} label="Road access" value={land.roadAccess} />
            <DetailRow Icon={FileText} label="Survey number" value={land.surveyNumber} />
            <DetailRow Icon={ScrollText} label="Patta" value={land.patta} />
            <DetailRow Icon={BadgeCheck} label="Approval" value={land.approval} />
            <DetailRow Icon={MapPin} label="Type" value={land.type} />
          </div>
        </div>
      </div>

      {/* Mobile sticky CTA bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-100 bg-cream/95 p-3 backdrop-blur lg:hidden">
        <div className="container-px flex gap-3">
          <CallButton full label="Call" className="!px-3 !text-sm" />
          <WhatsAppButton
            full
            label="Enquire"
            message={enquiryMessage(land)}
            className="!px-3 !text-sm"
          />
        </div>
      </div>
    </article>
  )
}
