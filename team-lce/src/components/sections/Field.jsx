// import { useState } from 'react'

// const ICONS = {
//   user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></>,
//   pin: <><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>,
//   mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
//   lock: <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
// }

// /** Labelled input with left icon. type="password" gets a show/hide eye. */
// export default function Field({ label, icon, type = 'text', value, onChange, error, ...rest }) {
//   const [show, setShow] = useState(false)
//   const isPass = type === 'password'
//   return (
//     <label className="block">
//       <span className="mb-2 block text-[10px] font-medium tracking-[.24em] text-mute">{label}</span>
//       <span
//         className={`group flex items-center gap-3 rounded-lg border bg-white/[.04] px-3.5 transition-colors duration-300 focus-within:border-accent focus-within:bg-accent/[.04] ${
//           error ? 'border-red-400/60' : 'border-line2'
//         }`}
//       >
//         <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0 fill-none stroke-mute stroke-[1.5] transition-colors group-focus-within:stroke-accent">
//           {ICONS[icon]}
//         </svg>
//         <input
//           type={isPass && show ? 'text' : type}
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           className="w-full bg-transparent py-3.5 text-base tracking-normal text-fg outline-none placeholder:text-dim"
//           {...rest}
//         />
//         {isPass && (
//           <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? 'Hide password' : 'Show password'} className="shrink-0 text-[10px] font-semibold tracking-[.18em] text-mute hover:text-accent">
//             {show ? 'HIDE' : 'SHOW'}
//           </button>
//         )}
//       </span>
//       {error && <span className="mt-1.5 block text-[.8rem] text-red-300">{error}</span>}
//     </label>
//   )
// }
import Band from '../ui/Band'
import SecHead from '../ui/SecHead'
import Mod, { ModBody } from '../ui/Mod'
import Row from '../ui/Row'
import Stepper from '../ui/Stepper'
import Segmented from '../ui/Segmented'
import { FieldArt } from './arts'
import { FIELD, CAMS, LIVE_DEST, LIVE_RATE, LIVE_EXTRA_DEST, EQUIP } from '../../data/rateCard'
import { inr } from '../../utils/format'

const DaysRow = ({ title, hint, children }) => (
  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line py-[18px]">
    <div><b className="font-medium">{title}</b><div className="text-[.8rem] text-mute">{hint}</div></div>
    {children}
  </div>
)

export default function Field({ q }) {
  const { cfg: c, totals: t } = q
  const dayOff = !c.days
  const dn = c.dest.size
  const sub = (v) => ({ value: v ? inr(v) : null })

  return (
    <section id="field" className="relative border-t border-line pb-[clamp(90px,14vh,160px)]">
      <Band
        art={<FieldArt />} ghost="02" n="02" label="STEP — FIELD & LIVE"
        lines={['FIELD', '& LIVE']} sub="Cameras at the event. Content out before it ends."
      />
      <div className="px-gutter ge1180:pr-[calc(340px+90px)]">
        <SecHead rule="PRICED PER EVENT DAY">
          Set how many event days we cover each month, then choose the crew, cameras, live streaming and equipment for those days.
        </SecHead>

        <Mod kicker="FIELD PRODUCTION" title="Event coverage" desc="Everything here is charged per event day." sub={sub(t.field)}>
          <ModBody>
            <DaysRow title="Event days per month" hint="Days a field crew is with the candidate">
              <Stepper value={c.days} unit="DAYS" onChange={q.changeDays} />
            </DaysRow>
            {FIELD.map((f) => {
              const on = c.field.has(f.id)
              const rate = f.cams ? CAMS[c.cam].rate : f.rate
              return (
                <Row
                  key={f.id} on={on} off={dayOff} label={f.label}
                  desc={dayOff ? 'Set event days first' : `${f.desc} · ${inr(rate)} per day`}
                  onToggle={() => q.toggleField(f.id)}
                  cost={on && !dayOff ? inr(c.days * rate) : 'Not added'} costOn={on && !dayOff}
                  extra={f.cams && (
                    <>
                      <Segmented options={CAMS.map((k) => k.name)} value={c.cam} onChange={q.setCam} />
                      <span className="text-[.8rem] text-mute">{CAMS[c.cam].desc}</span>
                    </>
                  )}
                  extraFlush
                />
              )
            })}
          </ModBody>
        </Mod>

        <div className="grid grid-cols-2 gap-[18px] lt1100:grid-cols-1">
          <Mod kicker="LIVE STREAMING" title="Where should we stream?" desc="Uses your camera setup, plus encoder and stream engineer." sub={sub(t.live)}>
            <ModBody>
              <DaysRow title="Events streamed per month" hint={dayOff ? 'Set event days first' : `Up to ${c.days} (your event days)`}>
                {dayOff ? <span className="text-[.8rem] text-mute">—</span> : <Stepper value={c.live} unit="EVENTS" onChange={q.changeLive} />}
              </DaysRow>
              {LIVE_DEST.map((d) => (
                <Row key={d.id} on={c.dest.has(d.id)} off={dayOff} label={d.name} onToggle={() => q.toggleDest(d.id)} cost="" />
              ))}
              <p className="pb-1 pt-2.5 text-[.84rem] text-mute">
                {c.live > 0 && dn ? (
                  <>
                    <b className="font-medium text-soft">{dn > 1 ? 'Multi-platform' : 'Single-platform'} stream</b> · {inr(LIVE_RATE + LIVE_EXTRA_DEST * (dn - 1))} per event. Event → cameras → production desk → encoder → {[...c.dest].map((id) => LIVE_DEST.find((d) => d.id === id).name).join(', ')}.
                  </>
                ) : (
                  'Pick the number of events and at least one destination.'
                )}
              </p>
            </ModBody>
          </Mod>

          <Mod kicker="SPECIAL EQUIPMENT" title="Extras on event days" desc="Charged for every event day you've set." sub={sub(t.equip)}>
            <ModBody>
              {EQUIP.map((e) => {
                const on = c.equip.has(e.id)
                return (
                  <Row
                    key={e.id} on={on} off={dayOff} label={e.label} desc={`${e.desc} · ${inr(e.rate)}/day`}
                    onToggle={() => q.toggleEquip(e.id)}
                    cost={on && !dayOff ? inr(c.days * e.rate) : 'Not added'} costOn={on && !dayOff}
                  />
                )
              })}
            </ModBody>
          </Mod>
        </div>
      </div>
    </section>
  )
}