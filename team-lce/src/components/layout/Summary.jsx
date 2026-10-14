import { GRP } from '../../utils/pricing'
import { inr } from '../../utils/format'

/** Grouped list of selected items (used in the side panel + mobile bar). */
export default function Summary({ lines }) {
  if (!lines.length) {
    return (
      <div className="py-[30px]">
        <div className="mb-[22px] h-11 w-11 animate-spinSlow rounded-full border border-dashed border-dim" />
        <b className="mb-3 block text-[12px] font-semibold tracking-[.22em]">BUILD YOUR QUOTATION</b>
        <p className="text-[.9rem] leading-relaxed text-mute">Pick a package or tick services to begin.</p>
      </div>
    )
  }
  const g = {}
  lines.forEach((l) => (g[l.grp] ||= []).push(l))
  return Object.keys(GRP).filter((k) => g[k]).map((k) => (
    <div key={k} className="border-b border-line py-3.5 last:border-0">
      <i className={`mb-2 block text-[9px] font-semibold not-italic tracking-[.3em] ${k === 'wa' ? 'text-wa2' : k === 'ms' ? 'text-[#f0c46a]' : 'text-accent2'}`}>
        {GRP[k]}
      </i>
      {g[k].map((l) => (
        <div key={l.name} className="flex animate-liIn items-baseline justify-between gap-3.5 py-[5px] text-[.88rem]">
          <span className="text-soft">{l.name.replace('WhatsApp — ', '')}</span>
          <b className="whitespace-nowrap font-normal">{inr(l.v)}</b>
        </div>
      ))}
    </div>
  ))
}
