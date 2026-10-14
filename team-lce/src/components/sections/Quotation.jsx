// import { useMemo, useState } from 'react'
// import Reveal from '../ui/Reveal'
// import Button from '../ui/Button'
// import SectionNum from '../ui/SectionNum'
// import { GRP } from '../../utils/pricing'
// import { inr } from '../../utils/format'
// import { CONTACT } from '../../data/rateCard'

// export default function Quotation({ q, grand, user }) {
//   const { lines, totals: t } = q
//   const [name, setName] = useState(user.name)
//   const [seat, setSeat] = useState(user.constituency)

//   const mailto = useMemo(() => {
//     const body = lines.length
//       ? `Hi Team LCE,\n\nCandidate: ${name || '__________'}\nConstituency: ${seat || '__________'}\n\nRequested configuration:\n${lines.map((l) => `• ${l.name}: ${inr(l.v)}\n   ${l.detail}`).join('\n')}\n\nMonthly service fee: ${inr(t.service)} + GST\nOne-time (WhatsApp + add-ons): ${inr(t.wa + t.addons)}\nApproved media spend: ${inr(t.spend)}\nFirst month total: ${inr(t.grand)}\n\nThanks.`
//       : `Hi Team LCE,\n\nI'd like a quotation for the Candidate Digital Command Centre.\n\nThanks.`
//     return `mailto:${CONTACT.email}?subject=${encodeURIComponent('Command Centre Quotation' + (name ? ' — ' + name : ''))}&body=${encodeURIComponent(body)}`
//   }, [lines, t, name, seat])

//   const inputCls = 'rounded-lg border border-line2 bg-white/[.04] px-3.5 py-3 text-base tracking-normal text-fg focus:border-accent focus:outline-none'
//   const labelCls = 'flex flex-col gap-2 text-[10px] font-medium tracking-[.24em] text-mute'

//   return (
//     <section id="estimate" className="relative min-h-screen overflow-hidden border-t border-line pb-[clamp(80px,12vh,140px)] pt-[clamp(120px,18vh,190px)]">
//       <div className="relative mx-auto max-w-[1400px] px-gutter">
//         <Reveal><SectionNum n="05">STEP — QUOTATION</SectionNum></Reveal>
//         <Reveal as="h2" delay={1} className="text-finalh font-extrabold leading-[.86] tracking-[-.055em]">
//           YOUR COMMAND CENTRE.<br /><span className="stroke-text">YOUR QUOTATION.</span>
//         </Reveal>

//         <div className="mt-[clamp(60px,9vh,100px)] grid grid-cols-[1.2fr_1fr] items-start gap-[clamp(40px,6vw,100px)] lt1100:grid-cols-1">
//           <Reveal delay={2}>
//             <div className="mb-[22px] grid grid-cols-2 gap-3 lt860:grid-cols-1">
//               <label className={labelCls}>CANDIDATE NAME
//                 <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Anita Sharma" autoComplete="off" />
//               </label>
//               <label className={labelCls}>CONSTITUENCY
//                 <input className={inputCls} value={seat} onChange={(e) => setSeat(e.target.value)} placeholder="e.g. Dehradun Cantt" autoComplete="off" />
//               </label>
//             </div>

//             <div className="border-t border-line2">
//               {!lines.length ? (
//                 <div className="py-10 text-mute">
//                   <b className="mb-2.5 block text-base font-semibold tracking-[.22em] text-fg">NOTHING SELECTED YET</b>
//                   Pick a package or tick services to see your quotation.<br /><br />
//                   <Button href="#digital" size="sm">START</Button>
//                 </div>
//               ) : (
//                 lines.map((l) => (
//                   <div key={l.name} className="grid animate-liInSlow grid-cols-[190px_1fr_auto] items-baseline gap-5 border-b border-line py-6 lt860:grid-cols-[1fr_auto] lt860:gap-x-4 lt860:gap-y-2">
//                     <i className={`text-[10px] font-semibold not-italic tracking-[.26em] lt860:col-span-full ${l.cls === 'wa' ? 'text-wa2' : 'text-accent2'}`}>{GRP[l.grp].split(' · ')[0]}</i>
//                     <div className="flex flex-col gap-1.5">
//                       <span className="text-[1.15rem] font-normal tracking-[-.01em]">
//                         {l.name}<small className="mt-0.5 block text-[.82rem] text-mute">{l.detail}</small>
//                       </span>
//                     </div>
//                     <b className="whitespace-nowrap text-right text-[1.15rem] font-light">{inr(l.v)}</b>
//                   </div>
//                 ))
//               )}
//             </div>
//           </Reveal>

//           <Reveal delay={3} className="rounded-[10px] border border-line2 bg-[linear-gradient(160deg,rgba(253,130,7,.10),rgba(255,176,77,.03)_60%,rgba(255,255,255,.02))] p-[clamp(28px,3vw,44px)] ge1101:sticky ge1101:top-[120px]">
//             <small className="text-[11px] font-medium tracking-[.3em] text-soft">FIRST MONTH INVOICE</small>
//             <div className="mb-2.5 mt-[22px] break-words text-big font-extralight leading-none tracking-[-.055em] tabular-nums">{inr(grand)}</div>
//             <div className="mb-[22px] mt-5">
//               {[['Monthly service fee', t.service], ['WhatsApp pack', t.wa], ['Add-ons', t.addons], ['Approved media spend', t.spend]].map(([k, v]) => (
//                 <div key={k} className={`flex justify-between gap-3.5 border-b border-line py-[7px] text-[.92rem] ${v ? 'text-soft' : 'text-mute'}`}>
//                   <span>{k}</span><b className={`font-normal tabular-nums ${v ? 'text-fg' : ''}`}>{v ? inr(v) : '—'}</b>
//                 </div>
//               ))}
//             </div>
//             <p className="mb-7 border-t border-line pt-[22px] font-serif text-[1.05rem] italic leading-normal text-mute">
//               Indicative quotation, plus 18% GST on service fees. Final pricing depends on constituency size, languages, travel and event schedule.
//             </p>
//             <div className="flex flex-wrap gap-3.5">
//               <Button onClick={q.reset} className="flex-1 justify-center">START OVER</Button>
//               <Button href={mailto} variant="solid" className="flex-1 justify-center">SEND TO TEAM LCE</Button>
//             </div>
//           </Reveal>
//         </div>
//       </div>
//     </section>
//   )
// }


// 2nd change 

// import { useMemo, useState } from 'react'
// import Reveal from '../ui/Reveal'
// import Button from '../ui/Button'
// import SectionNum from '../ui/SectionNum'
// import { GRP } from '../../utils/pricing'
// import { inr } from '../../utils/format'
// import { CONTACT } from '../../data/rateCard'

// export default function Quotation({ q, grand, user }) {
//   const { lines, totals: t } = q
//   const [name, setName] = useState(user.name)
//   const [seat, setSeat] = useState(user.constituency)

//   const mailto = useMemo(() => {
//     const body = lines.length
//       ? `Hi Team LCE,\n\nCandidate: ${name || '__________'}\nConstituency: ${seat || '__________'}\n\nRequested configuration:\n${lines.map((l) => `• ${l.name}: ${inr(l.v)}\n   ${l.detail}`).join('\n')}\n\nMonthly service fee: ${inr(t.service)} + GST\nOne-time (WhatsApp + add-ons): ${inr(t.wa + t.addons)}\nApproved media spend: ${inr(t.spend)}\nFirst month total: ${inr(t.grand)}\n\nThanks.`
//       : `Hi Team LCE,\n\nI'd like a quotation for the Candidate Digital Command Centre.\n\nThanks.`
//     return `mailto:${CONTACT.email}?subject=${encodeURIComponent('Command Centre Quotation' + (name ? ' — ' + name : ''))}&body=${encodeURIComponent(body)}`
//   }, [lines, t, name, seat])

//   const inputCls = 'rounded-lg border border-line2 bg-white/[.04] px-3.5 py-3 text-base tracking-normal text-fg focus:border-accent focus:outline-none'
//   const labelCls = 'flex flex-col gap-2 text-[10px] font-medium tracking-[.24em] text-mute'

//   return (
//     <section id="estimate" className="relative min-h-screen overflow-hidden border-t border-line pb-[clamp(80px,12vh,140px)] pt-[clamp(120px,18vh,190px)]">
//       <div className="relative mx-auto max-w-[1400px] px-gutter">
//         <Reveal><SectionNum n="05">STEP — QUOTATION</SectionNum></Reveal>
//         <Reveal as="h2" delay={1} className="text-finalh font-extrabold leading-[.86] tracking-[-.055em]">
//           YOUR COMMAND CENTRE.<br /><span className="stroke-text">YOUR QUOTATION.</span>
//         </Reveal>

//         <div className="mt-[clamp(60px,9vh,100px)] grid grid-cols-[1.2fr_1fr] items-start gap-[clamp(40px,6vw,100px)] lt1100:grid-cols-1">
//           <Reveal delay={2}>
//             <div className="mb-[22px] grid grid-cols-2 gap-3 lt860:grid-cols-1">
//               <label className={labelCls}>CANDIDATE NAME
//                 <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Anita Sharma" autoComplete="off" />
//               </label>
//               <label className={labelCls}>CONSTITUENCY
//                 <input className={inputCls} value={seat} onChange={(e) => setSeat(e.target.value)} placeholder="e.g. Dehradun Cantt" autoComplete="off" />
//               </label>
//             </div>

//             <div className="border-t border-line2">
//               {!lines.length ? (
//                 <div className="py-10 text-mute">
//                   <b className="mb-2.5 block text-base font-semibold tracking-[.22em] text-fg">NOTHING SELECTED YET</b>
//                   Pick a package or tick services to see your quotation.<br /><br />
//                   <Button href="#digital" size="sm">START</Button>
//                 </div>
//               ) : (
//                 lines.map((l) => (
//                   <div key={l.name} className="grid animate-liInSlow grid-cols-[190px_1fr_auto] items-baseline gap-5 border-b border-line py-6 lt860:grid-cols-[1fr_auto] lt860:gap-x-4 lt860:gap-y-2">
//                     <i className={`text-[10px] font-semibold not-italic tracking-[.26em] lt860:col-span-full ${l.cls === 'wa' ? 'text-wa2' : 'text-accent2'}`}>{GRP[l.grp].split(' · ')[0]}</i>
//                     <div className="flex flex-col gap-1.5">
//                       <span className="text-[1.15rem] font-normal tracking-[-.01em]">
//                         {l.name}<small className="mt-0.5 block text-[.82rem] text-mute">{l.detail}</small>
//                       </span>
//                     </div>
//                     <b className="whitespace-nowrap text-right text-[1.15rem] font-light">{inr(l.v)}</b>
//                   </div>
//                 ))
//               )}
//             </div>
//           </Reveal>

//           <Reveal delay={3} className="rounded-[10px] border border-line2 bg-[linear-gradient(160deg,rgba(253,130,7,.10),rgba(255,176,77,.03)_60%,rgba(255,255,255,.02))] p-[clamp(28px,3vw,44px)] ge1101:sticky ge1101:top-[120px]">
//             <small className="text-[11px] font-medium tracking-[.3em] text-soft">FIRST MONTH INVOICE</small>
//             <div className="mb-2.5 mt-[22px] break-words text-big font-extralight leading-none tracking-[-.055em] tabular-nums">{inr(grand)}</div>
//             <div className="mb-[22px] mt-5">
//               {[['Monthly service fee', t.service], ['WhatsApp pack', t.wa], ['Add-ons', t.addons], ['Approved media spend', t.spend]].map(([k, v]) => (
//                 <div key={k} className={`flex justify-between gap-3.5 border-b border-line py-[7px] text-[.92rem] ${v ? 'text-soft' : 'text-mute'}`}>
//                   <span>{k}</span><b className={`font-normal tabular-nums ${v ? 'text-fg' : ''}`}>{v ? inr(v) : '—'}</b>
//                 </div>
//               ))}
//             </div>
//             <p className="mb-7 border-t border-line pt-[22px] font-serif text-[1.05rem] italic leading-normal text-mute">
//               Indicative quotation, plus 18% GST on service fees. Final pricing depends on constituency size, languages, travel and event schedule.
//             </p>
//             <div className="flex flex-wrap gap-3.5">
//               <Button onClick={q.reset} className="min-w-[140px] flex-1">START OVER</Button>
//               <Button href={mailto} variant="solid" className="min-w-[180px] flex-[1.4]">SEND TO TEAM LCE</Button>
//             </div>
//           </Reveal>
//         </div>
//       </div>
//     </section>
//   )
// }






import { useMemo, useState } from 'react'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import SectionNum from '../ui/SectionNum'
import { GRP } from '../../utils/pricing'
import { inr } from '../../utils/format'
import { CONTACT } from '../../data/rateCard'
import { api } from '../../api'

export default function Quotation({ q, grand, user }) {
  const { lines, totals: t } = q
  const [name, setName] = useState(user.name)
  const [seat, setSeat] = useState(user.constituency)

  // "SEND TO TEAM LCE": mail khulti hai aur quotation database mein bhi save hoti hai
  const saveQuote = () => {
    if (!lines.length) return
    api('/quotes', { method: 'POST', body: { candidateName: name, constituency: seat, lines, totals: t } }).catch(() => { })
  }

  const mailto = useMemo(() => {
    const body = lines.length
      ? `Hi Team LCE,\n\nCandidate: ${name || '__________'}\nConstituency: ${seat || '__________'}\n\nRequested configuration:\n${lines.map((l) => `• ${l.name}: ${inr(l.v)}\n   ${l.detail}`).join('\n')}\n\nMonthly service fee: ${inr(t.service)} + GST\nOne-time (WhatsApp + add-ons): ${inr(t.wa + t.addons)}\nApproved media spend: ${inr(t.spend)}\nFirst month total: ${inr(t.grand)}\n\nThanks.`
      : `Hi Team LCE,\n\nI'd like a quotation for the Candidate Digital Command Centre.\n\nThanks.`
    return `mailto:${CONTACT.email}?subject=${encodeURIComponent('Command Centre Quotation' + (name ? ' — ' + name : ''))}&body=${encodeURIComponent(body)}`
  }, [lines, t, name, seat])

  const inputCls = 'rounded-lg border border-line2 bg-white/[.04] px-3.5 py-3 text-base tracking-normal text-fg focus:border-accent focus:outline-none'
  const labelCls = 'flex flex-col gap-2 text-[10px] font-medium tracking-[.24em] text-mute'

  return (
    <section id="estimate" className="relative min-h-screen overflow-hidden border-t border-line pb-[clamp(80px,12vh,140px)] pt-[clamp(120px,18vh,190px)]">
      <div className="relative mx-auto max-w-[1400px] px-gutter">
        <Reveal><SectionNum n="05">STEP — QUOTATION</SectionNum></Reveal>
        <Reveal as="h2" delay={1} className="text-finalh font-extrabold leading-[.86] tracking-[-.055em]">
          YOUR COMMAND CENTRE.<br /><span className="stroke-text">YOUR QUOTATION.</span>
        </Reveal>

        <div className="mt-[clamp(60px,9vh,100px)] grid grid-cols-[1.2fr_1fr] items-start gap-[clamp(40px,6vw,100px)] lt1100:grid-cols-1">
          <Reveal delay={2}>
            <div className="mb-[22px] grid grid-cols-2 gap-3 lt860:grid-cols-1">
              <label className={labelCls}>CANDIDATE NAME
                <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Anita Sharma" autoComplete="off" />
              </label>
              <label className={labelCls}>CONSTITUENCY
                <input className={inputCls} value={seat} onChange={(e) => setSeat(e.target.value)} placeholder="e.g. Dehradun Cantt" autoComplete="off" />
              </label>
            </div>

            <div className="border-t border-line2">
              {!lines.length ? (
                <div className="py-10 text-mute">
                  <b className="mb-2.5 block text-base font-semibold tracking-[.22em] text-fg">NOTHING SELECTED YET</b>
                  Pick a package or tick services to see your quotation.<br /><br />
                  <Button href="#digital" size="sm">START</Button>
                </div>
              ) : (
                lines.map((l) => (
                  <div key={l.name} className="grid animate-liInSlow grid-cols-[190px_1fr_auto] items-baseline gap-5 border-b border-line py-6 lt860:grid-cols-[1fr_auto] lt860:gap-x-4 lt860:gap-y-2">
                    <i className={`text-[10px] font-semibold not-italic tracking-[.26em] lt860:col-span-full ${l.cls === 'wa' ? 'text-wa2' : 'text-accent2'}`}>{GRP[l.grp].split(' · ')[0]}</i>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[1.15rem] font-normal tracking-[-.01em]">
                        {l.name}<small className="mt-0.5 block text-[.82rem] text-mute">{l.detail}</small>
                      </span>
                    </div>
                    <b className="whitespace-nowrap text-right text-[1.15rem] font-light">{inr(l.v)}</b>
                  </div>
                ))
              )}
            </div>
          </Reveal>

          <Reveal delay={3} className="rounded-[10px] border border-line2 bg-[linear-gradient(160deg,rgba(253,130,7,.10),rgba(255,176,77,.03)_60%,rgba(255,255,255,.02))] p-[clamp(28px,3vw,44px)] ge1101:sticky ge1101:top-[120px]">
            <small className="text-[11px] font-medium tracking-[.3em] text-soft">FIRST MONTH INVOICE</small>
            <div className="mb-2.5 mt-[22px] break-words text-big font-extralight leading-none tracking-[-.055em] tabular-nums">{inr(grand)}</div>
            <div className="mb-[22px] mt-5">
              {[['Monthly service fee', t.service], ['WhatsApp pack', t.wa], ['Add-ons', t.addons], ['Approved media spend', t.spend]].map(([k, v]) => (
                <div key={k} className={`flex justify-between gap-3.5 border-b border-line py-[7px] text-[.92rem] ${v ? 'text-soft' : 'text-mute'}`}>
                  <span>{k}</span><b className={`font-normal tabular-nums ${v ? 'text-fg' : ''}`}>{v ? inr(v) : '—'}</b>
                </div>
              ))}
            </div>
            <p className="mb-7 border-t border-line pt-[22px] font-serif text-[1.05rem] italic leading-normal text-mute">
              Indicative quotation, plus 18% GST on service fees. Final pricing depends on constituency size, languages, travel and event schedule.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <Button onClick={q.reset} className="min-w-[140px] flex-1">START OVER</Button>
           <Button href={mailto} onClick={saveQuote} variant="solid" className="min-w-[180px] flex-[1.4]">SEND TO TEAM LCE</Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}