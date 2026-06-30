import { motion } from 'framer-motion'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { cx } from '../lib/utils.js'

const TYPES = ['All', 'Residential', 'Agricultural', 'Commercial']

// Price buckets (in rupees). value is [min, max]; null max = no upper bound.
const PRICES = [
  { label: 'Any price', value: [0, null] },
  { label: 'Under ₹50 L', value: [0, 5000000] },
  { label: '₹50 L – ₹1 Cr', value: [5000000, 10000000] },
  { label: '₹1 Cr – ₹2 Cr', value: [10000000, 20000000] },
  { label: '₹2 Cr+', value: [20000000, null] },
]

// Size buckets (in cents).
const SIZES = [
  { label: 'Any size', value: [0, null] },
  { label: 'Up to 5 cents', value: [0, 5] },
  { label: '5 – 50 cents', value: [5, 50] },
  { label: '50+ cents / acres', value: [50, null] },
]

export default function SearchFilters({ filters, setFilters, locations, resultCount }) {
  const update = (patch) => setFilters((f) => ({ ...f, ...patch }))

  const reset = () =>
    setFilters({
      q: '',
      type: 'All',
      location: 'All',
      price: [0, null],
      size: [0, null],
    })

  const isDirty =
    filters.q ||
    filters.type !== 'All' ||
    filters.location !== 'All' ||
    filters.price[0] !== 0 ||
    filters.price[1] !== null ||
    filters.size[0] !== 0 ||
    filters.size[1] !== null

  const selectClass =
    'w-full appearance-none rounded-xl border border-brand-200 bg-cream px-4 py-3 text-sm font-medium text-ink transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30'

  return (
    <div className="rounded-3xl border border-brand-100 bg-white p-4 shadow-card sm:p-6">
      {/* Search input */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-500" />
        <input
          type="search"
          value={filters.q}
          onChange={(e) => update({ q: e.target.value })}
          placeholder="Search by title, area, city…"
          className="w-full rounded-xl border border-brand-200 bg-cream py-3.5 pl-12 pr-4 text-base text-ink placeholder:text-ink/40 transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
          aria-label="Search listings"
        />
      </div>

      {/* Type chips */}
      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
        {TYPES.map((t) => (
          <button
            key={t}
            onClick={() => update({ type: t })}
            className={cx(
              'shrink-0 rounded-full px-4 py-2 text-sm font-medium transition',
              filters.type === t
                ? 'bg-brand-700 text-white shadow-cta'
                : 'bg-brand-50 text-brand-700 hover:bg-brand-100',
            )}
          >
            {t === 'All' ? 'All types' : t}
          </button>
        ))}
      </div>

      {/* Dropdown filters */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="relative">
          <select
            className={selectClass}
            value={filters.location}
            onChange={(e) => update({ location: e.target.value })}
            aria-label="Filter by location"
          >
            <option value="All">All locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <select
            className={selectClass}
            value={JSON.stringify(filters.price)}
            onChange={(e) => update({ price: JSON.parse(e.target.value) })}
            aria-label="Filter by price"
          >
            {PRICES.map((p) => (
              <option key={p.label} value={JSON.stringify(p.value)}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <select
            className={selectClass}
            value={JSON.stringify(filters.size)}
            onChange={(e) => update({ size: JSON.parse(e.target.value) })}
            aria-label="Filter by size"
          >
            {SIZES.map((s) => (
              <option key={s.label} value={JSON.stringify(s.value)}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Result count + reset */}
      <div className="mt-4 flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm text-ink/60">
          <SlidersHorizontal className="h-4 w-4 text-brand-500" />
          <span>
            <strong className="text-brand-800">{resultCount}</strong>{' '}
            {resultCount === 1 ? 'plot' : 'plots'} found
          </span>
        </p>
        {isDirty && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={reset}
            className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium text-ink/60 transition hover:bg-brand-50 hover:text-brand-700"
          >
            <X className="h-4 w-4" /> Clear filters
          </motion.button>
        )}
      </div>
    </div>
  )
}
