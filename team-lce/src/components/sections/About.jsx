import Reveal from '../ui/Reveal'
import GhostNum from '../ui/GhostNum'
import SectionNum from '../ui/SectionNum'
import useInView from '../../hooks/useInView'
import { useEffect, useState } from 'react'

const STATS = [
  { to: 18, sup: '+', label: 'YEARS IN LIVE PRODUCTION' },
  { to: 2000, sup: '+', label: 'EVENTS DELIVERED' },
  { to: 10, sup: '', label: 'ASSETS FROM ONE EVENT' },
  { text: '1–5', label: 'CAMERAS PER EVENT' },
]

function Counter({ to, sup }) {
  const [ref, inView] = useInView({ threshold: 0.5 })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const t0 = performance.now()
    let raf
    const tick = (now) => {
      const p = Math.min((now - t0) / 1800, 1)
      setV(Math.round(to * (1 - Math.pow(1 - p, 4))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])
  return (
    <b ref={ref} className="block text-stat font-extralight leading-none tracking-[-.05em]">
      {v.toLocaleString('en-IN')}
      <sup className="ml-0.5 align-[.9em] text-[.4em] font-normal text-accent">{sup}</sup>
    </b>
  )
}

export default function About() {
  return (
    <section id="about" className="relative flex min-h-screen flex-col justify-center border-t border-line pb-[clamp(80px,12vh,130px)] pt-[clamp(120px,16vh,170px)]">
      <GhostNum>01</GhostNum>
      <div className="relative px-gutter">
        <Reveal><SectionNum n="01">WHAT WE BUILD</SectionNum></Reveal>
        <Reveal as="h2" delay={1} className="mt-[26px] text-pgtitle font-extrabold leading-[.9] tracking-[-.05em]">
          Same platform.<br />
          <em className="font-serif font-normal italic tracking-[-.02em] text-soft">Your choice of everything else.</em>
        </Reveal>
        <Reveal as="p" delay={2} className="mt-[30px] max-w-[54ch] text-pglead leading-[1.6] text-soft">
          Every candidate gets the same foundation: one official identity, one dashboard, one approval system and one media library. On top of it, each candidate chooses their own channels, how much content they need, which events we cover, how many cameras, and where to stream. The quotation changes with every choice.
        </Reveal>

        <div className="mt-[clamp(60px,9vh,100px)] grid grid-cols-4 border-t border-line lt860:grid-cols-2">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i}
              className={`border-r border-line pb-2.5 pt-[34px] last:border-r-0 lt860:border-b lt860:pb-5 lt860:pt-7 ${
                i === 0 ? 'pr-6 lt860:pr-3.5' : 'px-6 lt860:px-3.5'
              } ${i === 1 ? 'lt860:border-r-0 lt860:pl-3.5' : ''} ${i === 3 ? 'lt860:border-r-0 lt860:pl-3.5' : ''}`}
            >
              {s.text ? (
                <b className="block text-stat font-extralight leading-none tracking-[-.05em]">{s.text}</b>
              ) : (
                <Counter to={s.to} sup={s.sup} />
              )}
              <span className="mt-3.5 block text-[11px] font-medium tracking-[.22em] text-mute">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
