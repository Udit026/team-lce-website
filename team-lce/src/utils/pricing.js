import {
  BASE_FEE, PLATFORMS, CONTENT, LANG_PCT, PER, CAMS, FIELD, LIVE_DEST,
  LIVE_RATE, LIVE_EXTRA_DEST, EQUIP, AD_FEE, WA_PACKS, ADDONS,
} from '../data/rateCard'
import { fmtShort } from './format'

export const blankCfg = () => ({
  plats: new Set(), content: {}, lang: false, days: 0,
  field: new Set(), cam: 0, live: 0, dest: new Set(), equip: new Set(), ads: 0,
})

export const cloneCfg = (c) => ({
  ...c,
  plats: new Set(c.plats), content: { ...c.content },
  field: new Set(c.field), dest: new Set(c.dest), equip: new Set(c.equip),
})

export const cfgFromPreset = (p) => {
  const c = blankCfg()
  c.plats = new Set(p.plats || [])
  c.content = { ...(p.content || {}) }
  c.lang = !!p.lang
  c.days = p.days || 0
  c.field = new Set(p.field || [])
  c.cam = p.cam || 0
  c.live = p.live || 0
  c.dest = new Set(p.dest || [])
  c.equip = new Set(p.equip || [])
  c.ads = p.ads || 0
  return c
}

export const contentOn = (cfg, r) => r.plats.some((p) => cfg.plats.has(p))
export const qty = (cfg, r) => (contentOn(cfg, r) ? cfg.content[r.id] || 0 : 0)
export const monthlyQty = (cfg, r) => qty(cfg, r) * PER[r.per]

export function calc(cfg, waId, addonSet) {
  const m = 1
  const anything = cfg.plats.size || cfg.days || cfg.ads
  const base = anything ? BASE_FEE * m : 0
  const platforms = PLATFORMS.filter((p) => cfg.plats.has(p.id)).reduce((s, p) => s + p.rate * m, 0)
  const contentOnly = CONTENT.reduce((s, r) => s + monthlyQty(cfg, r) * r.rate * m, 0)
  const lang = cfg.lang ? contentOnly * LANG_PCT : 0
  const perDay = FIELD.filter((f) => cfg.field.has(f.id)).reduce((s, f) => s + (f.cams ? CAMS[cfg.cam].rate : f.rate), 0)
  const field = cfg.days * perDay * m
  const live = cfg.days && cfg.live && cfg.dest.size ? cfg.live * (LIVE_RATE + LIVE_EXTRA_DEST * (cfg.dest.size - 1)) * m : 0
  const equip = cfg.days * EQUIP.filter((e) => cfg.equip.has(e.id)).reduce((s, e) => s + e.rate, 0) * m
  const adFee = cfg.ads * AD_FEE
  const service = base + platforms + contentOnly + lang + field + live + equip + adFee
  const wa = waId ? WA_PACKS.find((w) => w.id === waId).price : 0
  const addons = ADDONS.filter((a) => addonSet.has(a.id)).reduce((s, a) => s + a.price, 0)
  return {
    base, platforms, content: contentOnly + lang, contentOnly, lang, field, live, equip, adFee,
    service, wa, addons, spend: cfg.ads, grand: service + wa + addons + cfg.ads,
  }
}

/* Group labels for the summary panel / quotation */
export const GRP = {
  cc: 'COMMAND CENTRE · MONTHLY',
  wa: 'WHATSAPP',
  add: 'ADD-ONS · ONE-TIME',
  ms: 'MEDIA SPEND · AT ACTUALS',
}

export function buildLines(cfg, waId, addonSet) {
  const t = calc(cfg, waId, addonSet)
  const out = []
  const L = (grp, name, detail, v, cls = '') => v && out.push({ grp, name, detail, v, cls })

  L('cc', 'Foundation & dashboard', 'Branding, dashboard, approvals, media library, reports', t.base)
  L('cc', 'Platform management', PLATFORMS.filter((p) => cfg.plats.has(p.id)).map((p) => p.name).join(', '), t.platforms)
  L('cc', 'Content plan',
    CONTENT.filter((r) => qty(cfg, r)).map((r) => `${r.label} ${qty(cfg, r)}/${r.per}`).join(' · ') + (cfg.lang ? ' · second language' : ''),
    t.content)
  L('cc', 'Field production',
    `${cfg.days} event days · ` + FIELD.filter((f) => cfg.field.has(f.id)).map((f) => (f.cams ? CAMS[cfg.cam].name + ' video' : f.label.toLowerCase())).join(', '),
    t.field)
  L('cc', 'Live streaming',
    `${cfg.live} events · ${cfg.dest.size > 1 ? 'multi-platform' : 'single-platform'} · ` + [...cfg.dest].map((id) => LIVE_DEST.find((d) => d.id === id).name).join(', '),
    t.live)
  L('cc', 'Special equipment',
    EQUIP.filter((e) => cfg.equip.has(e.id)).map((e) => e.label).join(', ') + ` × ${cfg.days} days`,
    t.equip)
  L('cc', 'Ad management fee', `10% of ${fmtShort(cfg.ads)} spend`, t.adFee)
  if (waId) {
    const w = WA_PACKS.find((x) => x.id === waId)
    L('wa', 'WhatsApp — ' + w.name, 'One-time pack', w.price, 'wa')
  }
  ADDONS.filter((a) => addonSet.has(a.id)).forEach((a) => L('add', a.name, 'One-time', a.price))
  L('ms', 'Approved media spend', 'Billed at actuals, reported separately', cfg.ads, 'ms')
  return out
}