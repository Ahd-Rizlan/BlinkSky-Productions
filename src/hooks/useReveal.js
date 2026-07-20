import { useEffect, useRef, useState } from 'react'

/** Reveal-on-scroll using IntersectionObserver. Returns [ref, isVisible]. */
export function useReveal(options = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.unobserve(entry.target)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px', ...options },
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [])

  return [ref, visible]
}
