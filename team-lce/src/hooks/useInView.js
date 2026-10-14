import { useEffect, useRef, useState } from 'react'

/** Returns [ref, inView]. Becomes true once and stays true. */
export default function useInView(options = { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true)
        io.disconnect()
      }
    }, options)
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return [ref, inView]
}
