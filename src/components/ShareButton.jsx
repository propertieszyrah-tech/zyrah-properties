import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Share2, Link2, Check, MessageCircle } from 'lucide-react'
import { whatsappLink } from '../lib/utils.js'
import { useToast } from './Toast.jsx'

// Share control: uses the native share sheet on mobile when available,
// otherwise falls back to a small menu (copy link / WhatsApp share).
export default function ShareButton({ title, price }) {
  const toast = useToast()
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const url = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = `Check out this plot from Zyrah Properties: ${title} (${price})`

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: shareText, url })
      } catch {
        /* user cancelled */
      }
    } else {
      setOpen((o) => !o)
    }
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast('Link copied to clipboard', 'success')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast('Could not copy link', 'info')
    }
    setOpen(false)
  }

  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={nativeShare}
        className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
      >
        <Share2 className="h-4 w-4" /> Share
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-2xl border border-brand-100 bg-white p-1.5 shadow-card"
          >
            <button
              onClick={copyLink}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-ink/80 transition hover:bg-brand-50"
            >
              {copied ? <Check className="h-4 w-4 text-brand-600" /> : <Link2 className="h-4 w-4 text-brand-600" />}
              {copied ? 'Copied!' : 'Copy link'}
            </button>
            <a
              href={whatsappLink(`${shareText}\n${url}`)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-ink/80 transition hover:bg-brand-50"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366]" /> Share on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
