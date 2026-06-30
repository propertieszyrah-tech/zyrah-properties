import { useEffect } from 'react'

// Lightweight SEO helper — no extra dependency. Sets the document <title> and
// meta description/og tags per page. Render it once near the top of a page.
export default function Seo({ title, description, image }) {
  useEffect(() => {
    if (title) document.title = title

    const setMeta = (selector, attr, value) => {
      if (!value) return
      let el = document.head.querySelector(selector)
      if (!el) {
        el = document.createElement('meta')
        const [, key, name] = selector.match(/\[(.+?)="(.+?)"\]/) || []
        if (key && name) el.setAttribute(key, name)
        document.head.appendChild(el)
      }
      el.setAttribute(attr, value)
    }

    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
    if (image) setMeta('meta[property="og:image"]', 'content', image)
  }, [title, description, image])

  return null
}
