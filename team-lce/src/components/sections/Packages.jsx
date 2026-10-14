import Reveal from '../ui/Reveal'
import GhostNum from '../ui/GhostNum'
import SectionNum from '../ui/SectionNum'
import { PRESETS, COMPARE } from '../../data/rateCard'

export default function Packages() {
  const heads = PRESETS.slice(0, 3)
  return (
    <section id="packages" className="relative flex min-h-screen flex-col justify-center border-t border-line pb-[clamp(80px,12vh,130px)] pt-[clamp(120px,16vh,170px)]">
      <GhostNum>02</GhostNum>
      <div className="relative px-gutter">
        <Reveal><SectionNum n="02">THREE STARTING POINTS</SectionNum></Reveal>
        <Reveal as="h2" delay={1} className="mt-[26px] text-pgtitle font-extrabold leading-[.9] tracking-[-.05em]">
          Start with a package.<br />
          <em className="font-serif font-normal italic tracking-[-.02em] text-soft">Change any part of it.</em>
        </Reveal>

        <Reveal className="overflow-x-auto">
          <table className="mt-[clamp(40px,6vh,60px)] w-full min-w-[620px] border-collapse text-[.93rem]">
            <thead>
              <tr>
                <th className="border-b border-line2 px-4 py-[13px] text-left text-[10px] font-semibold tracking-[.24em]">SERVICE</th>
                {heads.map((p, i) => (
                  <th key={p.id} className={`border-b border-line2 px-4 py-[13px] text-center text-[10px] font-semibold tracking-[.24em] ${i === 2 ? 'text-accent' : ''}`}>
                    {p.name.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((r) => (
                <tr key={r[0]}>
                  <td className="border-b border-line px-4 py-[13px] text-left text-soft">{r[0]}</td>
                  {r.slice(1).map((v, i) => (
                    <td
                      key={i}
                      className={`border-b border-line px-4 py-[13px] text-center ${
                        v === '—' ? 'text-dim' : v === '✓' ? 'text-fg' : 'text-[.85rem] text-mute'
                      }`}
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  )
}
