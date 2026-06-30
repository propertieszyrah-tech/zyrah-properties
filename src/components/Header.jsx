import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, Instagram } from 'lucide-react'
import { site } from '../data/site.js'
import { cx } from '../lib/utils.js'

const navLinks = [
  { label: 'Home', to: '/', hash: '#top' },
  { label: 'Lands', to: '/', hash: '#lands' },
  { label: 'About', to: '/', hash: '#about' },
  { label: 'Contact', to: '/', hash: '#contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Transparent + light text ONLY on the home hero (top of '/'). Everywhere
  // else — scrolled, detail page, 404 — use the solid cream header.
  const onHome = location.pathname === '/'
  const solid = scrolled || !onHome

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Navigate to a homepage section (works from the detail page too).
  const goToSection = (hash) => {
    setOpen(false)
    if (location.pathname !== '/') {
      navigate('/' + hash)
    } else {
      const id = hash.replace('#', '')
      if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' })
      else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cx(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        solid
          ? 'bg-cream/80 shadow-[0_2px_20px_-8px_rgba(19,33,30,0.25)] backdrop-blur-md'
          : 'bg-transparent',
      )}
    >
      <nav
        className={cx(
          'container-px flex items-center justify-between transition-all duration-300',
          scrolled ? 'h-14' : 'h-20',
        )}
      >
        {/* Brand */}
        <button
          onClick={() => goToSection('#top')}
          className="flex items-center gap-2"
          aria-label={`${site.name} — home`}
        >
          <span className="grid place-items-center overflow-hidden rounded-xl bg-white p-0.5 shadow-cta ring-1 ring-black/5">
            <img
              src={site.logo}
              alt="Zyrah Properties logo"
              className={cx('w-auto object-contain transition-all', scrolled ? 'h-9' : 'h-11')}
            />
          </span>
          <span
            className={cx(
              'font-display font-semibold tracking-wide transition-all',
              solid ? 'text-lg text-brand-800' : 'text-xl text-white',
            )}
          >
            Zyrah <span className={solid ? 'text-gold-600' : 'text-gold-300'}>Properties</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <button
              key={l.label}
              onClick={() => goToSection(l.hash)}
              className={cx(
                'rounded-full px-4 py-2 text-sm font-medium transition',
                solid
                  ? 'text-ink/70 hover:bg-brand-100/70 hover:text-brand-800'
                  : 'text-white/90 hover:bg-white/10 hover:text-white',
              )}
            >
              {l.label}
            </button>
          ))}
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Zyrah Properties on Instagram"
            className={cx(
              'ml-1 grid h-9 w-9 place-items-center rounded-full transition',
              solid
                ? 'text-ink/70 hover:bg-brand-100/70 hover:text-brand-800'
                : 'text-white/90 hover:bg-white/10 hover:text-white',
            )}
          >
            <Instagram className="h-5 w-5" />
          </a>
          <button
            onClick={() => goToSection('#contact')}
            className="ml-2 rounded-full bg-brand-700 px-5 py-2 text-sm font-semibold text-white shadow-cta transition hover:bg-brand-800"
          >
            Enquire
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          className={cx(
            'grid h-10 w-10 place-items-center rounded-xl transition md:hidden',
            solid ? 'text-brand-800 hover:bg-brand-100' : 'text-white hover:bg-white/10',
          )}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden bg-cream/95 backdrop-blur-md md:hidden"
      >
        <div className="container-px flex flex-col gap-1 py-3">
          {navLinks.map((l) => (
            <button
              key={l.label}
              onClick={() => goToSection(l.hash)}
              className="rounded-xl px-4 py-3 text-left text-base font-medium text-ink/80 transition hover:bg-brand-100"
            >
              {l.label}
            </button>
          ))}
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-xl px-4 py-3 text-base font-medium text-ink/80 transition hover:bg-brand-100"
          >
            <Instagram className="h-5 w-5 text-gold-600" /> Instagram
          </a>
          <button
            onClick={() => goToSection('#contact')}
            className="mt-1 rounded-xl bg-brand-700 px-4 py-3 text-center text-base font-semibold text-white"
          >
            Enquire Now
          </button>
        </div>
      </motion.div>
    </motion.header>
  )
}
