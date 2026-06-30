import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { MapPin, Maximize2, Compass } from 'lucide-react'
import { cardReveal } from '../animations/variants.js'
import {
  formatPriceCompact,
  shortLocation,
  statusStyle,
  cx,
} from '../lib/utils.js'

// forwardRef so AnimatePresence mode="popLayout" can measure the element.
const LandCard = forwardRef(function LandCard({ land }, ref) {
  const reduce = useReducedMotion()
  const isSold = land.status === 'Sold'

  return (
    <motion.article
      ref={ref}
      layout
      variants={cardReveal}
      whileHover={reduce ? {} : { y: -6 }}
      whileTap={reduce ? {} : { scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      className="group relative"
    >
      <Link
        to={`/land/${land.id}`}
        className="block overflow-hidden rounded-3xl bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover"
      >
        {/* Cover image (zooms gently on hover) inside a clipped frame */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.img
            layoutId={`land-image-${land.id}`}
            src={land.images[0]}
            alt={land.title}
            loading="lazy"
            className={cx(
              'h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105',
              isSold && 'grayscale-[35%]',
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent opacity-60" />

          {/* Status badge (subtle pulse when available) */}
          <div className="absolute left-3 top-3">
            <motion.span
              animate={
                reduce || land.status !== 'Available'
                  ? {}
                  : { scale: [1, 1.06, 1] }
              }
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className={cx(
                'inline-block rounded-full px-3 py-1 text-xs font-semibold backdrop-blur',
                statusStyle(land.status),
              )}
            >
              {land.status}
            </motion.span>
          </div>

          {/* Type tag */}
          <span className="absolute right-3 top-3 rounded-full bg-ink/55 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            {land.type}
          </span>
        </div>

        {/* Body */}
        <div className="p-5">
          <h3 className="font-display text-lg font-semibold leading-snug text-brand-800 line-clamp-2">
            {land.title}
          </h3>

          <p className="mt-2 flex items-center gap-1.5 text-sm text-ink/60">
            <MapPin className="h-4 w-4 shrink-0 text-brand-500" />
            {shortLocation(land.location)}
          </p>

          {/* Meta row */}
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-ink/70">
            <span className="inline-flex items-center gap-1">
              <Maximize2 className="h-3.5 w-3.5 text-gold-600" />
              {land.size.cents ? `${land.size.cents} cents` : `${land.size.acres} acres`}
            </span>
            <span className="inline-flex items-center gap-1">
              <Compass className="h-3.5 w-3.5 text-gold-600" />
              {land.facing} facing
            </span>
          </div>

          {/* Price */}
          <div className="mt-4 flex items-end justify-between border-t border-brand-50 pt-4">
            <div>
              <p className="font-display text-xl font-bold text-brand-800">
                {formatPriceCompact(land.price)}
              </p>
              {land.priceLabel && (
                <p className="text-xs text-ink/50">{land.priceLabel}</p>
              )}
            </div>
            <span className="text-sm font-semibold text-brand-600 transition group-hover:translate-x-0.5 group-hover:text-brand-700">
              View →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
})

export default LandCard
