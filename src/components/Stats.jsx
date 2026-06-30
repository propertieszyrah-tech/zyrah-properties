import { motion } from 'framer-motion'
import { site } from '../data/site.js'
import AnimatedNumber from './AnimatedNumber.jsx'
import { staggerContainer, fadeUp, viewportOnce } from '../animations/variants.js'

export default function Stats() {
  return (
    <section className="bg-brand-800">
      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="container-px grid grid-cols-2 gap-6 py-12 sm:py-14 lg:grid-cols-4"
      >
        {site.stats.map((s) => (
          <motion.div key={s.label} variants={fadeUp} className="text-center">
            <div className="font-display text-4xl font-bold text-gold-400 sm:text-5xl">
              <AnimatedNumber value={s.value} suffix={s.suffix} />
            </div>
            <p className="mt-2 text-sm font-medium uppercase tracking-wider text-brand-100/80">
              {s.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
