import { Phone, MessageCircle, Mail, MapPin, Instagram, Navigation } from 'lucide-react'
import { site } from '../data/site.js'
import { telTo, whatsappTo } from '../lib/utils.js'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-brand-900 text-brand-100">
      <div className="container-px grid gap-10 py-14 lg:grid-cols-[1.1fr_2.6fr] lg:gap-16">
        {/* Brand */}
        <div>
          <div className="inline-flex items-center rounded-2xl bg-white p-3 shadow-card">
            <img
              src={site.logo}
              alt="Zyrah Properties logo"
              className="h-24 w-24 object-contain"
            />
          </div>
          <p className="mt-4 max-w-xs text-sm text-brand-200/80">{site.tagline}</p>

          {/* Instagram */}
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
          >
            <Instagram className="h-4 w-4 text-gold-400" />
            @{site.instagramHandle}
          </a>
        </div>

        {/* Info columns — always sit together in their own aligned row */}
        <div className="grid gap-10 sm:grid-cols-3">
        {/* Quick links */}
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="#top" className="text-brand-200/80 transition hover:text-white">Home</a></li>
            <li><a href="#lands" className="text-brand-200/80 transition hover:text-white">Lands</a></li>
            <li><a href="#about" className="text-brand-200/80 transition hover:text-white">About Us</a></li>
            <li><a href="#contact" className="text-brand-200/80 transition hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Team contacts */}
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
            Our Team
          </h3>
          <ul className="mt-4 space-y-4 text-sm">
            {site.agents.map((a) => (
              <li key={a.phoneDial}>
                <p className="font-medium text-white">{a.name}</p>
                <p className="text-xs text-brand-200/60">{a.role}</p>
                <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
                  <a href={telTo(a.phoneDial)} className="inline-flex items-center gap-1.5 text-brand-200/90 transition hover:text-white">
                    <Phone className="h-3.5 w-3.5 text-gold-400" /> {a.phoneDisplay}
                  </a>
                  <a href={whatsappTo(a.whatsapp, `Hi ${a.name}, I'd like to know more about your plots.`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-brand-200/90 transition hover:text-white">
                    <MessageCircle className="h-3.5 w-3.5 text-gold-400" /> WhatsApp
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Reach us */}
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
            Reach Us
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-brand-200/90 transition hover:text-white">
                <Mail className="h-4 w-4 text-gold-400" /> {site.email}
              </a>
            </li>
            <li className="flex items-start gap-3 text-brand-200/90">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" /> {site.address}
            </li>
            <li>
              <a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-medium text-white transition hover:bg-white/20">
                <Navigation className="h-4 w-4 text-gold-400" /> Get directions
              </a>
            </li>
          </ul>
        </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-px flex flex-col items-center justify-between gap-2 py-5 text-xs text-brand-200/70 sm:flex-row">
          <p>© {year} Zyrah Properties. All rights reserved.</p>
          <p>Building dreams, creating homes.</p>
        </div>
      </div>
    </footer>
  )
}
