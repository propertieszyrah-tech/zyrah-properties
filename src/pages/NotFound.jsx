import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Seo from '../components/Seo.jsx'

export default function NotFound() {
  return (
    <div className="container-px flex min-h-[80vh] flex-col items-center justify-center text-center">
      <Seo title="Page not found — Zyrah Properties" description="The page you are looking for does not exist." />
      <p className="font-display text-7xl font-bold text-brand-200">404</p>
      <h1 className="mt-2 font-display text-2xl font-bold text-brand-800">Page not found</h1>
      <p className="mt-2 text-ink/60">The page you’re looking for doesn’t exist or has moved.</p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-700 px-6 py-3 font-semibold text-white shadow-cta"
      >
        <ArrowLeft className="h-4 w-4" /> Back home
      </Link>
    </div>
  )
}
