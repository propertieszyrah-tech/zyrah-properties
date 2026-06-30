import { AnimatePresence, motion } from 'framer-motion'
import { SearchX } from 'lucide-react'
import LandCard from './LandCard.jsx'
import { CardSkeleton } from './Skeleton.jsx'
import { staggerContainer } from '../animations/variants.js'
import { viewportOnce } from '../animations/variants.js'

export default function LandGrid({ lands, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (!lands.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-brand-200 bg-white/60 py-20 text-center"
      >
        <SearchX className="h-10 w-10 text-brand-400" />
        <p className="mt-4 font-display text-lg font-semibold text-brand-800">
          No plots match your filters
        </p>
        <p className="mt-1 text-sm text-ink/60">
          Try widening your price range or clearing the filters.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      // `layout` on the grid + AnimatePresence lets cards smoothly re-arrange,
      // fade out when filtered away, and fade in when they return.
      layout
      variants={staggerContainer(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <AnimatePresence mode="popLayout">
        {lands.map((land) => (
          <LandCard key={land.id} land={land} />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
