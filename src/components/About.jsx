import { motion } from 'framer-motion'
import { ShieldCheck, BadgeCheck, HandCoins } from 'lucide-react'
import { site } from '../data/site.js'
import ScrollReveal from './ScrollReveal.jsx'
import { staggerContainer, fadeUp, viewportOnce } from '../animations/variants.js'

const icons = [ShieldCheck, HandCoins, BadgeCheck]

export default function About() {
  return (
    <section id="about" className="bg-cream py-20 sm:py-28">
      <div className="container-px grid items-center gap-12 lg:grid-cols-2">
        {/* Image collage */}
        <ScrollReveal className="relative">
          <div className="overflow-hidden rounded-[2rem] shadow-card">
            <img
              src="https://images.unsplash.com/photo-1542889601-399c4f3a8402?auto=format&fit=crop&w=1200&q=80"
              alt="Surveyed plot with clear boundaries"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-2 hidden w-40 overflow-hidden rounded-2xl border-4 border-cream shadow-card sm:block">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80"
              alt="Family planning their land purchase"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </ScrollReveal>

        {/* Copy */}
        <div>
          <ScrollReveal>
            <span className="text-sm font-semibold uppercase tracking-widest text-gold-600">
              About Us
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-brand-800 sm:text-4xl">
              {site.about.heading}
            </h2>
          </ScrollReveal>

          {site.about.body.map((p, i) => (
            <ScrollReveal as="p" delay={0.05 * (i + 1)} key={i} className="mt-4 text-ink/70">
              {p}
            </ScrollReveal>
          ))}

          <motion.ul
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-8 space-y-4"
          >
            {site.about.highlights.map((h, i) => {
              const Icon = icons[i % icons.length]
              return (
                <motion.li key={h} variants={fadeUp} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-medium text-ink/80">{h}</span>
                </motion.li>
              )
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
