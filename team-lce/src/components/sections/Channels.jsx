import Band from '../ui/Band'
import SecHead from '../ui/SecHead'
import Mod, { ModBody } from '../ui/Mod'
import Row from '../ui/Row'
import Check from '../ui/Check'
import Stepper from '../ui/Stepper'
import { FeedArt } from './arts'
import { PRESETS, PLATFORMS, CONTENT } from '../../data/rateCard'
import { contentOn, qty, monthlyQty } from '../../utils/pricing'
import { inr, fmtShort } from '../../utils/format'

const INCLUDED = [
  'Official name, profile & cover images', 'Biography & constituency information', 'Branding templates, colours & type',
  'Verified / official account links', 'Campaign dashboard & calendar', 'Approval queue with full record',
  'Structured media library', 'Publishing system', 'Daily publication report',
]

export default function Channels({ q }) {
  const { cfg, totals: t, preset } = q
  const basePreset = preset ? preset.replace('custom:', '') : null
  const isCustom = preset && preset.startsWith('custom')
  const note = !preset
    ? 'Choose a starting point above.'
    : isCustom
    ? <><b className="font-medium text-accent2">Customised</b>{basePreset !== 'blank' ? ` from ${PRESETS.find((p) => p.id === basePreset).name}` : ''}. Your changes are included in the quotation.</>
    : <><b className="font-medium text-accent2">{PRESETS.find((p) => p.id === preset).name}</b> loaded. Change anything below.</>

  const sub = (v, label) => ({ value: v ? inr(v) : null, label })

  return (
    <section id="digital" className="relative border-t border-line pb-[clamp(90px,14vh,160px)]">
      <Band
        art={<FeedArt />} ghost="01" n="01" label="STEP — CHANNELS & CONTENT"
        lines={['CHANNELS', '& CONTENT']} sub="Pick your platforms. Set how much goes out."
      />
      <div className="px-gutter ge1180:pr-[calc(340px+90px)]">
        <SecHead rule="PRICES PER MONTH">
          Start from a package or from scratch, then tick exactly what you want. Every item can be changed.
        </SecHead>

        {/* presets */}
        <div className="mb-[34px] grid grid-cols-4 gap-3 lt1100:grid-cols-2 lt560:grid-cols-1">
          {[...PRESETS.filter((p) => p.id === 'blank'), ...PRESETS.filter((p) => p.id !== 'blank')].map((p) => {
            const on = basePreset === p.id
            return (
              <button
                key={p.id}
                onClick={() => q.applyPreset(p.id)}
                className={`flex flex-col gap-1.5 rounded-[10px] border p-5 pb-[18px] text-left transition-all duration-[450ms] ease-expo ${
                  on
                    ? 'border-accent/65 bg-[linear-gradient(180deg,rgba(253,130,7,.13),rgba(253,130,7,.02))] shadow-[0_24px_60px_-30px_rgba(253,130,7,.35)]'
                    : 'border-line bg-white/[.02] hover:border-line2'
                }`}
              >
                <span className="text-[10px] font-semibold tracking-[.22em] text-accent2">{p.id === 'blank' ? 'BUILD YOUR OWN' : 'OR START FROM'}</span>
                <b className="text-[1.1rem] font-semibold tracking-[-.01em]">{p.name}</b>
                <small className="text-[.84rem] leading-[1.45] text-mute">{p.desc}</small>
              </button>
            )
          })}
        </div>
        <p className="-mt-[18px] mb-[30px] text-[.88rem] text-mute">{note}</p>

        {/* foundation */}
        <Mod kicker="INCLUDED FOR EVERY CANDIDATE" title="Digital foundation & dashboard" desc="Set up once and kept consistent across every channel." sub={sub(t.base)}>
          <ModBody>
            <ul className="grid grid-cols-3 gap-x-[26px] gap-y-2.5 py-3.5 lt1100:grid-cols-2 lt560:grid-cols-1">
              {INCLUDED.map((x) => (
                <li key={x} className="flex list-none items-baseline gap-2.5 text-[.9rem] text-soft before:text-[.8rem] before:text-accent before:content-['✓']">{x}</li>
              ))}
            </ul>
          </ModBody>
        </Mod>

        {/* platforms */}
        <Mod kicker="PLATFORMS" title="Which channels should we manage?" desc="Management fee per channel per month." sub={sub(t.platforms)}>
          <ModBody>
            <div className="grid grid-cols-4 gap-2.5 py-3.5 lt1100:grid-cols-2 lt560:grid-cols-1">
              {PLATFORMS.map((p) => {
                const on = cfg.plats.has(p.id)
                return (
                  <button
                    key={p.id}
                    onClick={() => q.togglePlat(p.id)}
                    role="checkbox"
                    aria-checked={on}
                    className={`flex items-start gap-3 rounded-lg border px-4 py-3.5 text-left transition-all duration-[350ms] ease-expo ${
                      on ? 'border-accent bg-accent/10' : 'border-line2'
                    }`}
                  >
                    <Check on={on} />
                    <span>
                      <b className="block text-[.98rem] font-medium">{p.name}</b>
                      <small className="text-[.78rem] text-mute">{p.sub} · {inr(p.rate)}</small>
                    </span>
                  </button>
                )
              })}
            </div>
          </ModBody>
        </Mod>

        {/* content volume */}
        <Mod kicker="CONTENT VOLUME" title="How much goes out?" desc="Only the channels you ticked above can be set. Reels are cut once and published to Instagram, Facebook and YouTube Shorts." sub={sub(t.content)}>
          <ModBody>
            {CONTENT.map((r) => {
              const enabled = contentOn(cfg, r), n = qty(cfg, r), on = n > 0
              const need = r.plats.map((id) => PLATFORMS.find((p) => p.id === id).name).join(' or ')
              return (
                <Row
                  key={r.id} on={on} off={!enabled} label={r.label}
                  desc={enabled ? `${r.desc} · ${inr(r.rate)} each` : `Tick ${need} above to add`}
                  onToggle={() => q.toggleContent(r.id)}
                  control={<Stepper value={n} unit={'/ ' + r.per.toUpperCase()} onChange={(d) => q.changeContent(r.id, d)} />}
                  cost={on ? inr(monthlyQty(cfg, r) * r.rate) : 'Not added'} costOn={on}
                  extra={on && <span className="text-[.8rem] text-mute"><b className="font-medium text-accent2">{monthlyQty(cfg, r)}</b> per month</span>}
                />
              )
            })}
            <Row
              on={cfg.lang} off={!t.contentOnly} label="Second language version"
              desc="Every post and reel also in Hindi, English or local dialect · +25% of content"
              onToggle={q.toggleLang} cost={cfg.lang ? inr(t.lang) : 'Not added'} costOn={cfg.lang}
            />
          </ModBody>
        </Mod>

        {/* ads */}
        <Mod kicker="MEDIA BUYING" title="Paid advertising" desc="Ad spend is billed at actuals and shown separately on your invoice. Our management fee is 10% of spend." sub={{ value: t.adFee ? inr(t.adFee) : null, label: 'FEE PER MONTH' }}>
          <ModBody>
            <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-[22px] gap-y-2.5 py-4 lt860:grid-cols-[1fr_auto]">
              <div>
                <b className="block text-[.98rem] font-medium">Monthly ad spend managed</b>
                <small className="text-[.8rem] text-mute">Meta and Google, with MCMC certificates and required disclosures</small>
              </div>
              <span className="lt860:hidden" />
              <span className={`min-w-24 whitespace-nowrap text-right text-[.95rem] tabular-nums lt860:col-start-2 lt860:row-start-1 ${cfg.ads > 0 ? 'text-fg' : 'text-soft'}`}>
                {cfg.ads > 0 ? inr(t.adFee) : 'Not added'}
              </span>
              <div className="col-span-full flex min-w-[180px] items-center gap-4">
                <input
                  type="range" min="0" max="1000000" step="25000" value={cfg.ads}
                  onChange={(e) => q.setAds(e.target.value)} aria-label="Ad spend"
                  style={{ '--f': `${cfg.ads / 10000}%` }}
                />
                <output className="min-w-[92px] text-right text-[1.05rem] font-medium tabular-nums">{cfg.ads ? fmtShort(cfg.ads) : 'None'}</output>
              </div>
            </div>
          </ModBody>
        </Mod>
      </div>
    </section>
  )
}
