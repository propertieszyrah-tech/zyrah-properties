import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Swipeable image carousel with crossfade, arrows, and dot indicators.
// The first image uses `layoutId` so it morphs from the clicked card.
export default function ImageGallery({ images = [], landId, alt }) {
  const [[index, dir], setState] = useState([0, 0])

  const paginate = (newDir) => {
    setState(([i]) => {
      const next = (i + newDir + images.length) % images.length
      return [next, newDir]
    })
  }

  const goTo = (i) => setState(([cur]) => [i, i > cur ? 1 : -1])

  if (!images.length) return null

  return (
    <div className="relative overflow-hidden rounded-3xl bg-brand-900 shadow-card">
      <div className="relative aspect-[4/3] sm:aspect-[16/10]">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.img
            // Morph target only on the first slide
            layoutId={index === 0 ? `land-image-${landId}` : undefined}
            key={index}
            src={images[index]}
            alt={`${alt} — photo ${index + 1}`}
            custom={dir}
            initial={{ opacity: 0, x: dir * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -60 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            drag={images.length > 1 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              if (info.offset.x < -60) paginate(1)
              else if (info.offset.x > 60) paginate(-1)
            }}
            className="absolute inset-0 h-full w-full cursor-grab object-cover active:cursor-grabbing"
          />
        </AnimatePresence>

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => paginate(-1)}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-brand-800 shadow-card backdrop-blur transition hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => paginate(1)}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-brand-800 shadow-card backdrop-blur transition hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Counter */}
        <span className="absolute right-3 top-3 rounded-full bg-ink/55 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {index + 1} / {images.length}
        </span>
      </div>

      {/* Dots */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2 bg-brand-900 py-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to photo ${i + 1}`}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === index ? 24 : 8,
                backgroundColor: i === index ? '#D9B266' : 'rgba(255,255,255,0.35)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
