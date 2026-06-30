import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import Hero from '../components/Hero.jsx'
import SearchFilters from '../components/SearchFilters.jsx'
import LandGrid from '../components/LandGrid.jsx'
import Stats from '../components/Stats.jsx'
import About from '../components/About.jsx'
import Contact from '../components/Contact.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'
import { lands as allLands } from '../data/lands.js'

const initialFilters = {
  q: '',
  type: 'All',
  location: 'All',
  price: [0, null],
  size: [0, null],
}

export default function HomePage() {
  const location = useLocation()
  const [filters, setFilters] = useState(initialFilters)
  const [loading, setLoading] = useState(true)

  // Brief skeleton state on first load (then content fades in).
  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 650)
    return () => clearTimeout(t)
  }, [])

  // If we arrived with a hash (e.g. /#lands from the detail page), scroll to it.
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      window.setTimeout(
        () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }),
        100,
      )
    }
  }, [location.hash])

  // Unique location options for the filter dropdown.
  const locations = useMemo(() => {
    const set = new Set()
    allLands.forEach((l) => {
      if (l.location?.area) set.add(l.location.area)
      if (l.location?.city) set.add(l.location.city)
    })
    return [...set].sort()
  }, [])

  // Apply all filters.
  const filtered = useMemo(() => {
    const q = filters.q.trim().toLowerCase()
    return allLands.filter((l) => {
      if (filters.type !== 'All' && l.type !== filters.type) return false

      if (filters.location !== 'All') {
        const matches =
          l.location?.area === filters.location ||
          l.location?.city === filters.location
        if (!matches) return false
      }

      const [pMin, pMax] = filters.price
      if (l.price < pMin) return false
      if (pMax != null && l.price > pMax) return false

      const [sMin, sMax] = filters.size
      const cents = l.size?.cents ?? 0
      if (cents < sMin) return false
      if (sMax != null && cents > sMax) return false

      if (q) {
        const haystack = [
          l.title,
          l.type,
          l.location?.area,
          l.location?.city,
          l.location?.district,
          l.location?.state,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })
  }, [filters])

  return (
    <>
      <Seo
        title="Zyrah Properties — Premium Plots & Land for Sale"
        description="Buy verified residential, agricultural and commercial plots. DTCP/RERA approved land with clear titles. Browse listings and enquire on WhatsApp."
      />

      <Hero />

      {/* Listings */}
      <section id="lands" className="bg-cream py-16 sm:py-24">
        <div className="container-px">
          <ScrollReveal className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-gold-600">
              Available Plots
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-brand-800 sm:text-4xl">
              Find your perfect piece of land
            </h2>
            <p className="mt-3 text-ink/60">
              Filter by location, budget, size, and type to discover plots that fit your plans.
            </p>
          </ScrollReveal>

          <div className="mx-auto mt-10 max-w-4xl">
            <SearchFilters
              filters={filters}
              setFilters={setFilters}
              locations={locations}
              resultCount={filtered.length}
            />
          </div>

          <div className="mt-10">
            <LandGrid lands={filtered} loading={loading} />
          </div>
        </div>
      </section>

      <Stats />
      <About />
      <Contact />
    </>
  )
}
