// Shared Framer Motion variants. Keeping them in one place keeps the motion
// language consistent (and easy to tweak globally).

// Fade + slide up — the core "reveal" used for hero items and sections.
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

// Container that staggers its children (hero text, card grids, etc.).
export const staggerContainer = (stagger = 0.12, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
})

// Card entrance for grids.
export const cardReveal = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

// Page transition (used with AnimatePresence in App.jsx).
export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25 } },
}

// Standard viewport config for scroll reveals: trigger once, a bit early.
export const viewportOnce = { once: true, amount: 0.2, margin: '0px 0px -10% 0px' }

// Tap/press feedback for buttons & cards (mobile-friendly).
export const tapScale = { scale: 0.96 }
export const hoverLift = { y: -6 }
