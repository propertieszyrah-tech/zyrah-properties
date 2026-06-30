import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Check,
  Instagram,
  Navigation,
} from 'lucide-react'
import { site } from '../data/site.js'
import { telTo, whatsappTo } from '../lib/utils.js'
import { useToast } from './Toast.jsx'
import ScrollReveal from './ScrollReveal.jsx'

function Field({ id, label, type = 'text', textarea, value, onChange, required }) {
  const [focused, setFocused] = useState(false)
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <div className="relative">
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink/70">
        {label} {required && <span className="text-gold-600">*</span>}
      </label>
      <div className="relative">
        <Tag
          id={id}
          name={id}
          type={textarea ? undefined : type}
          rows={textarea ? 4 : undefined}
          required={required}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full resize-none rounded-xl border border-brand-200 bg-cream px-4 py-3 text-ink outline-none transition placeholder:text-ink/30 focus:border-brand-500"
        />
        <motion.span
          className="pointer-events-none absolute inset-x-3 bottom-0 h-0.5 origin-left rounded-full bg-brand-600"
          initial={false}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

function ContactForm() {
  const toast = useToast()
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()

    // 1) Open WhatsApp to the primary number (Mohamed Gani) with details
    //    pre-filled. Must run synchronously inside the click so the browser
    //    allows the new tab. The visitor just taps "send".
    const text =
      `New enquiry from the Zyrah Properties website:\n\n` +
      `Name: ${form.name}\n` +
      `Phone / WhatsApp: ${form.phone}` +
      (form.message ? `\nMessage: ${form.message}` : '')
    window.open(
      whatsappTo(site.whatsappNumber, text),
      '_blank',
      'noopener,noreferrer',
    )

    // 2) Email backup (only if a Web3Forms key is configured in site.js).
    //    Fire-and-forget — if it fails, WhatsApp has already captured the lead.
    if (site.web3formsKey) {
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: site.web3formsKey,
          subject: `New enquiry from ${form.name} — Zyrah Properties`,
          from_name: 'Zyrah Properties Website',
          name: form.name,
          phone: form.phone,
          message: form.message || '(no message)',
        }),
      }).catch(() => {})
    }

    setSent(true)
    toast('Opening WhatsApp — just tap send to reach us.', 'success')
    setForm({ name: '', phone: '', message: '' })
    window.setTimeout(() => setSent(false), 2600)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field id="name" label="Your name" value={form.name} onChange={set('name')} required />
      <Field id="phone" label="Phone / WhatsApp" type="tel" value={form.phone} onChange={set('phone')} required />
      <Field id="message" label="Message" textarea value={form.message} onChange={set('message')} />
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        disabled={sent}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-base font-semibold text-white shadow-cta transition hover:bg-[#1ebe5b] disabled:opacity-90"
      >
        <AnimatePresence mode="wait" initial={false}>
          {sent ? (
            <motion.span key="done" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="inline-flex items-center gap-2">
              <motion.span className="grid h-5 w-5 place-items-center rounded-full bg-white/20" initial={{ rotate: -90 }} animate={{ rotate: 0 }}>
                <Check className="h-3.5 w-3.5" />
              </motion.span>
              Sent!
            </motion.span>
          ) : (
            <motion.span key="send" exit={{ opacity: 0 }} className="inline-flex items-center gap-2">
              <MessageCircle className="h-5 w-5" /> Send on WhatsApp
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
      <p className="text-center text-xs text-ink/50">
        This opens WhatsApp with your details ready — just tap send.
      </p>
    </form>
  )
}

function AgentCard({ agent }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-card">
      <p className="font-display text-lg font-semibold text-brand-800">{agent.name}</p>
      <p className="text-xs font-medium uppercase tracking-wider text-gold-600">{agent.role}</p>
      <p className="mt-2 text-sm text-ink/60">{agent.phoneDisplay}</p>
      <div className="mt-4 flex gap-2">
        <a
          href={telTo(agent.phoneDial)}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800"
        >
          <Phone className="h-4 w-4" /> Call
        </a>
        <a
          href={whatsappTo(agent.whatsapp, `Hi ${agent.name}, I'm interested in your plots. Please share details.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1ebe5b]"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
      </div>
    </div>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="bg-brand-50 py-20 sm:py-28">
      <div className="container-px">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-gold-600">
            Contact Us
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-brand-800 sm:text-4xl">
            Let’s find your plot
          </h2>
          <p className="mt-3 text-ink/60">
            Call, WhatsApp, or drop by our office in Pallavaram. We usually reply within a few hours.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Left: agents + reach details + map */}
          <ScrollReveal className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {site.agents.map((a) => (
                <AgentCard key={a.phoneDial} agent={a} />
              ))}
            </div>

            {/* Email + Instagram */}
            <div className="grid gap-4 sm:grid-cols-2">
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-card transition hover:shadow-card-hover">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700">
                  <Mail className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink/50">Email</p>
                  <p className="truncate font-medium text-brand-800">{site.email}</p>
                </div>
              </a>
              <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-card transition hover:shadow-card-hover">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-gold-400 to-brand-600 text-white">
                  <Instagram className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink/50">Instagram</p>
                  <p className="truncate font-medium text-brand-800">@{site.instagramHandle}</p>
                </div>
              </a>
            </div>

            {/* Office address + embedded map */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-card">
              <div className="flex items-start gap-3 p-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700">
                  <MapPin className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink/50">Office</p>
                  <p className="mt-0.5 font-medium text-brand-800">{site.address}</p>
                </div>
                <a href={site.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-brand-800">
                  <Navigation className="h-3.5 w-3.5" /> Directions
                </a>
              </div>
              <iframe
                title="Zyrah Properties office location"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&z=15&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-56 w-full border-0"
              />
            </div>
          </ScrollReveal>

          {/* Right: form */}
          <ScrollReveal delay={0.1} className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
            <ContactForm />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
