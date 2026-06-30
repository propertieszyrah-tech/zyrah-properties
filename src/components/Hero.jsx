import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { site } from '../data/site.js'
import { fadeUp, staggerContainer } from '../animations/variants.js'
import { CallButton, WhatsAppButton } from './CtaButtons.jsx'

export default function Hero() {
  const reduce = useReducedMotion()

  const scrollToLands = () =>
    document.getElementById('lands')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Ken Burns background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=80"
          alt="Open green land at golden hour"
          className={`h-full w-full object-cover ${reduce ? '' : 'animate-kenburns'}`}
        />
        {/* Gradient overlays for text legibility + premium mood */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-brand-900/55 to-brand-900/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/60 to-transparent" />
      </div>

      {/* Content */}
      <motion.div
        variants={staggerContainer(0.15, 0.2)}
        initial="hidden"
        animate="show"
        className="container-px relative z-10 max-w-3xl pt-24 pb-28 text-white"
      >
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-gold-300 ring-1 ring-white/20 backdrop-blur"
        >
          Verified Plots • Clear Titles
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl"
        >
          Zyrah <span className="text-gold-400">Properties</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-5 max-w-xl text-lg text-brand-50/90 sm:text-xl"
        >
          {site.tagline}
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mt-3 max-w-xl text-sm text-brand-100/70 sm:text-base"
        >
          {site.shortPitch}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <CallButton />
          <WhatsAppButton message="Hi, I found Zyrah Properties and would like to know about available plots." />
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      {!reduce && (
        <motion.button
          onClick={scrollToLands}
          aria-label="Scroll to listings"
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/70"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-7 w-7" />
        </motion.button>
      )}
    </section>
  )
}
