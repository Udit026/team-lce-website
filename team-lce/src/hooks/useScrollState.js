import { useEffect, useState } from 'react'

const SLIDES = ['about', 'packages', 'process', 'digital', 'field', 'whatsapp', 'addons', 'estimate']

/** Tracks scroll position to drive nav style, side rail, floating panel and active section. */
export default function useScrollState() {
  const [s, setS] = useState({ scrolled: false, railShow: false, panelShow: false, active: null })

  useEffect(() => {
    let ticking = false
    const top = (id) => document.getElementById(id)?.offsetTop ?? Infinity
    const run = () => {
      const y = window.scrollY, vh = window.innerHeight
      const inSvc = y + vh * 0.5 > top('digital')
      const inFinal = y + vh * 0.55 > top('estimate')
      let active = null
      SLIDES.forEach((id) => { if (y + vh * 0.45 >= top(id)) active = id })
      setS({
        scrolled: y > 40,
        railShow: y + vh * 0.5 > top('about'),
        panelShow: inSvc && !inFinal,
        active,
      })
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) { requestAnimationFrame(run); ticking = true }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    run()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return s
}
