import Band from '../ui/Band'
import SecHead from '../ui/SecHead'
import { ChatArt } from './arts'
import { WA_PACKS } from '../../data/rateCard'
import { inr } from '../../utils/format'

export default function WhatsApp({ q }) {
  return (
    <section id="whatsapp" className="relative border-t border-line pb-[clamp(90px,14vh,160px)]">
      <Band
        art={<ChatArt />} ghost="03" n="03" label="STEP — WHATSAPP" labelColor="#8ef0b4"
        lines={['WHATSAPP', 'BULK MESSAGING']} sub="Straight to the voter's phone." subColor="#8ef0b4"
      />
      <div className="px-gutter ge1180:pr-[calc(340px+90px)]">
        <SecHead rule="OPTIONAL · SELECT ONE PACK">
          Rich-media broadcasts to opt-in lists, kept separate from your internal team groups. Delivery and read reports included.
        </SecHead>

        <div className="no-scrollbar grid grid-cols-3 gap-[18px] lt860:-mx-gutter lt860:flex lt860:snap-x lt860:snap-mandatory lt860:gap-3.5 lt860:overflow-x-auto lt860:px-gutter lt860:pb-[22px] lt860:pt-2">
          {WA_PACKS.map((it) => {
            const sel = q.wa === it.id
            return (
              <article
                key={it.id}
                onClick={() => q.selectWa(it.id)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), q.selectWa(it.id))}
                tabIndex={0} role="button" aria-pressed={sel}
                className={`relative flex cursor-pointer flex-col overflow-hidden rounded-md border px-7 pb-7 pt-[34px] transition-all duration-500 ease-expo lt860:flex-[0_0_84%] lt860:snap-center
                  before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-[linear-gradient(90deg,transparent,#25d366,transparent)] before:transition-transform before:duration-[900ms] before:ease-expo before:content-['']
                  ${sel
                    ? 'border-wa/60 bg-[linear-gradient(180deg,rgba(37,211,102,.09),rgba(255,255,255,.01))] shadow-waglow before:scale-x-100'
                    : 'border-line bg-[linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,.008))] before:scale-x-0 hover:-translate-y-1.5 hover:border-line2'}`}
              >
                {it.badge && <span className="absolute right-4 top-4 rounded-full bg-accent px-[11px] py-1.5 text-[9px] font-semibold tracking-[.22em] text-black">{it.badge}</span>}
                <span className="text-[10px] font-medium tracking-[.3em] text-mute">{it.kicker}</span>
                <h3 className="mb-5 mt-3.5 text-cardh font-semibold leading-[1.1] tracking-[-.02em]">{it.name}</h3>
                <div className="mb-5 whitespace-nowrap border-b border-line pb-[22px] text-price font-extralight leading-none tracking-[-.04em] tabular-nums">
                  {inr(it.price)}
                  <small className="mt-3 block text-[10px] font-medium tracking-[.24em] text-mute">ONE-TIME PACK</small>
                </div>
                <div className="-mt-2 mb-[18px] text-[.86rem] text-soft">
                  <b className="font-medium text-wa2">{it.vol}</b> messages · ₹{(it.price / parseInt(it.vol.replace(/,/g, ''))).toFixed(2)} per message
                </div>
                <ul className="mb-7 flex flex-1 list-none flex-col gap-2.5 text-[.92rem] text-soft">
                  {it.features.map((f) => (
                    <li key={f} className={`flex items-baseline gap-3 before:h-[5px] before:flex-[0_0_5px] before:-translate-y-px before:rounded-full before:border before:transition-all before:duration-[400ms] before:content-[''] ${sel ? 'before:border-wa before:bg-wa' : 'before:border-dim'}`}>
                      {f}
                    </li>
                  ))}
                </ul>
                <span className={`flex w-full justify-center gap-2.5 rounded-full border py-[15px] text-[11px] font-semibold tracking-[.24em] transition-all duration-500 ease-expo ${sel ? 'border-accent bg-accent text-black' : 'border-line2'}`}>
                  <span>{sel ? 'SELECTED' : 'SELECT'}</span>
                  <span className={`inline-block overflow-hidden transition-[width] duration-[400ms] ease-expo ${sel ? 'w-3.5' : 'w-0'}`}>✓</span>
                </span>
              </article>
            )
          })}
        </div>
        <div className="mt-1 hidden text-[10px] tracking-[.24em] text-mute lt860:block">SWIPE FOR MORE</div>
      </div>
    </section>
  )
}
