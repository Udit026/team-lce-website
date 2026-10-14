import { useEffect, useState } from 'react'
import { api } from '../../api'
import { inputCls, btnCls } from './adminStyles'

// [button ka naam, uske neeche dikhne wali samjhaane wali line]
const LABELS = {
  baseFee: ['Base Fee', 'Digital foundation & dashboard monthly fee'],
  platforms: ['Platforms', 'Facebook, Instagram, X, YouTube...  channel fees'],
  content: ['Content Volume', 'Posts, reels, videos  rates'],
  langPct: ['Second Language %', 'another language  extra percent'],
  per: ['Per (units)', 'Content units (per day / per week)'],
  adFee: ['Ad Fee %', 'Paid advertising  management fee'],
  field: ['Field Team', 'Photographer, video, reel desk, photo distribution'],
 cameras: ['Cameras (per day)', '1 / 2 / 3 / 5 camera  rate PER EVENT DAY'],
  liveDest: ['Live Channels', 'Facebook / YouTube / Instagram Live'],
  liveRate: ['Live Rate', 'Live streaming ka rate'],
  liveExtraDest: ['Live Extra Channel', 'Extra destinations  charge'],
  equip: ['Equipment', 'Drone, gimbal, mics, lighting, teleprompter'],
  waPacks: ['WhatsApp Packs', '1 / 5 / 10 lakh message packs'],
  addons: ['Add-ons', 'Go Further  one-time services'],
  presets: ['Packages', 'Digital, Digital + Field, Command Centre'],
  compare: ['Package Comparison', 'Comparison table  ✓ Optional'],
  contact: ['Contact', 'Email & phone'],
}

const clone = (v) => JSON.parse(JSON.stringify(v))
const blankLike = (v) => {
  if (Array.isArray(v)) return []
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, blankLike(x)]))
  if (typeof v === 'number') return 0
  if (typeof v === 'boolean') return false
  return ''
}

function Node({ label, value, onChange }) {
  if (Array.isArray(value)) {
    return (
      <div className="space-y-2 rounded-xl border border-white/10 p-3">
        <p className="text-[11px] tracking-[.2em] text-accent">{label}</p>
        {value.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="min-w-0 flex-1">
              <Node label={`#${i + 1}`} value={item} onChange={(nv) => onChange(value.map((x, j) => (j === i ? nv : x)))} />
            </div>
            <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))}
              className="mt-1 rounded-full border border-red-400/60 px-3 py-1 text-[11px] text-red-400">✕</button>
          </div>
        ))}
        <button type="button" className={btnCls}
          onClick={() => onChange([...value, value.length ? blankLike(value[value.length - 1]) : ''])}>+ ADD ITEM</button>
      </div>
    )
  }
  if (value && typeof value === 'object') {
    return (
      <div className="grid gap-3 rounded-xl border border-white/10 p-3 sm:grid-cols-2">
        {label && <p className="text-[11px] tracking-[.2em] text-accent sm:col-span-2">{label}</p>}
        {Object.entries(value).map(([k, v]) => (
          <div key={k} className={typeof v === 'object' && v !== null ? 'sm:col-span-2' : ''}>
            <Node label={k} value={v} onChange={(nv) => onChange({ ...value, [k]: nv })} />
          </div>
        ))}
      </div>
    )
  }
  if (typeof value === 'boolean')
    return <label className="flex items-center gap-2 text-[13px]"><input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />{label}</label>
  return (
    <label className="block text-[12px] text-mute">
      {label}
      <input className={`${inputCls} mt-1`} type={typeof value === 'number' ? 'number' : 'text'} step="any" value={value ?? ''}
        onChange={(e) => onChange(typeof value === 'number' ? Number(e.target.value) : e.target.value)} />
    </label>
  )
}

export default function PricingTab() {
  const [data, setData] = useState(null)
  const [section, setSection] = useState('')
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    api('/ratecard')
      .then((d) => { setData(clone(d.rateCard)); setSection(Object.keys(d.rateCard)[0]) })
      .catch((e) => setMsg(e.message))
  }, [])

  const title = (k) => LABELS[k]?.[0] || k

  const save = async () => {
    setBusy(true); setMsg('')
    try {
      await api(`/ratecard/${section}`, { method: 'PUT', body: { data: data[section] } })
      setMsg(`"${title(section)}" saved. Site par Ctrl + Shift + R karke dekho.`)
    } catch (e) { setMsg(e.message) } finally { setBusy(false) }
  }

  if (!data) return <p className="text-mute">{msg || 'Loading…'}</p>
  return (
    <div className="space-y-5">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {Object.keys(data).map((k) => (
          <button key={k} onClick={() => { setSection(k); setMsg('') }}
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-[11px] tracking-[.15em] ${section === k ? 'border-accent text-accent' : 'border-white/15 text-mute'}`}>
            {title(k)}
          </button>
        ))}
      </div>

      {LABELS[section]?.[1] && <p className="text-[13px] text-mute">{LABELS[section][1]}</p>}

      <Node label={title(section)} value={data[section]} onChange={(nv) => setData({ ...data, [section]: nv })} />

      <div className="sticky bottom-3 flex flex-wrap items-center gap-4 rounded-full border border-white/10 bg-bg/95 px-4 py-3 backdrop-blur">
        <button disabled={busy} onClick={save} className={btnCls}>{busy ? 'SAVING…' : `SAVE "${title(section)}"`}</button>
        <span className="text-[13px] text-mute">{msg}</span>
      </div>
    </div>
  )
}