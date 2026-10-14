import Band from '../ui/Band'
import SecHead from '../ui/SecHead'
import Toggle from '../ui/Toggle'
import { ProfileArt } from './arts'
import { ADDONS } from '../../data/rateCard'
import { inr } from '../../utils/format'

export default function Addons({ q }) {
  return (
    <section id="addons" className="relative border-t border-line pb-[clamp(90px,14vh,160px)]">
      <Band art={<ProfileArt />} ghost="04" n="04" label="STEP — ADD-ONS" lines={['GO', 'FURTHER.']} short />
      <div className="px-gutter ge1180:pr-[calc(340px+90px)]">
        <SecHead rule="SELECT ANY">One-time services for launches, rally weeks and the final push.</SecHead>

        <div className="grid grid-cols-2 border-t border-line lt860:grid-cols-1">
          {ADDONS.map((a, i) => {
            const sel = q.addons.has(a.id)
            return (
              <div
                key={a.id}
                role="switch" aria-checked={sel} tabIndex={0}
                onClick={() => q.toggleAddon(a.id)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), q.toggleAddon(a.id))}
                className={`relative flex cursor-pointer items-center gap-5 border-b border-line py-6 pr-1.5
                  odd:border-r odd:border-line odd:pr-[34px] even:pl-[34px]
                  lt860:!border-r-0 lt860:!px-0 lt860:py-5`}
              >
                <span className={`pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(253,130,7,.09),transparent_70%)] transition-opacity duration-[600ms] ${sel ? 'opacity-100' : 'opacity-0'}`} />
                <span className={`relative w-[22px] text-[11px] font-medium transition-colors duration-[400ms] ${sel ? 'text-accent' : 'text-dim'}`}>{String(i + 1).padStart(2, '0')}</span>
                <div className="relative flex-1">
                  <b className="block text-[1.08rem] font-medium tracking-[-.01em]">{a.name}</b>
                  <small className="text-[.84rem] text-mute">{a.desc}</small>
                </div>
                <span className="relative whitespace-nowrap text-right text-[1.2rem] font-light tracking-[-.02em]">{inr(a.price)}</span>
                <Toggle on={sel} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
