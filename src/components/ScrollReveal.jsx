import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from '../animations/variants.js'

// Wrap any section/element to make it fade-and-slide into view on scroll (once).
// Usage: <ScrollReveal><h2>Title</h2></ScrollReveal>
export default function ScrollReveal({
  children,
  as = 'div',
  delay = 0,
  className = '',
  variants = fadeUp,
  ...rest
}) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
