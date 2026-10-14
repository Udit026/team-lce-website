import { useState, useCallback, useMemo } from 'react'
import { PRESETS, CONTENT, FIELD, CAMS } from '../data/rateCard'
import { blankCfg, cloneCfg, cfgFromPreset, calc, contentOn, qty, buildLines } from '../utils/pricing'
import { clamp } from '../utils/format'

/**
 * All the quotation state + every action lives here.
 * Components only call these actions — no pricing logic inside UI files.
 */
export default function useQuote() {
  const [preset, setPreset] = useState(null)
  const [cfg, setCfg] = useState(blankCfg)
  const [wa, setWa] = useState(null)
  const [addons, setAddons] = useState(() => new Set())

  // mark that the user changed something after picking a preset
  const markEdited = useCallback(() => {
    setPreset((p) => (!p ? 'custom:blank' : p.startsWith('custom') ? p : 'custom:' + p))
  }, [])

  const edit = useCallback(
    (fn) => {
      setCfg((prev) => {
        const c = cloneCfg(prev)
        const res = fn(c)
        return res === false ? prev : c
      })
      markEdited()
    },
    [markEdited]
  )

  const actions = useMemo(
    () => ({
      applyPreset: (id) => {
        setCfg(cfgFromPreset(PRESETS.find((x) => x.id === id).cfg))
        setPreset(id)
      },
      togglePlat: (id) => edit((c) => (c.plats.has(id) ? c.plats.delete(id) : c.plats.add(id))),
      toggleContent: (id) =>
        edit((c) => {
          const r = CONTENT.find((x) => x.id === id)
          if (!contentOn(c, r)) return false
          c.content[id] = qty(c, r) ? 0 : 1
        }),
      changeContent: (id, d) =>
        edit((c) => {
          const r = CONTENT.find((x) => x.id === id)
          if (!contentOn(c, r)) return false
          c.content[id] = clamp((c.content[id] || 0) + d, 0, r.max)
        }),
      toggleLang: () =>
        edit((c) => {
          if (!calc(c, null, new Set()).contentOnly) return false
          c.lang = !c.lang
        }),
      changeDays: (d) =>
        edit((c) => {
          c.days = clamp(c.days + d, 0, 30)
          c.live = Math.min(c.live, c.days)
        }),
      toggleField: (id) =>
        edit((c) => {
          if (!c.days) return false
          if (c.field.has(id)) c.field.delete(id)
          else {
            c.field.add(id)
            const f = FIELD.find((x) => x.id === id)
            if (f.needs) c.field.add(f.needs)
          }
        }),
      setCam: (i) =>
        edit((c) => {
          c.cam = +i
          c.field.add('video')
        }),
      changeLive: (d) =>
        edit((c) => {
          c.live = clamp(c.live + d, 0, c.days)
          if (c.live) {
            c.field.add('video')
            if (!c.dest.size) c.dest.add('fbl')
          }
        }),
      toggleDest: (id) =>
        edit((c) => {
          if (!c.days) return false
          c.dest.has(id) ? c.dest.delete(id) : c.dest.add(id)
          if (c.dest.size && !c.live) {
            c.live = 1
            c.field.add('video')
          }
        }),
      toggleEquip: (id) =>
        edit((c) => {
          if (!c.days) return false
          c.equip.has(id) ? c.equip.delete(id) : c.equip.add(id)
        }),
      setAds: (v) => edit((c) => { c.ads = +v }),
      selectWa: (id) => setWa((cur) => (cur === id ? null : id)),
      toggleAddon: (id) =>
        setAddons((prev) => {
          const n = new Set(prev)
          n.has(id) ? n.delete(id) : n.add(id)
          return n
        }),
      reset: () => {
        setCfg(cfgFromPreset({}))
        setPreset('blank')
        setWa(null)
        setAddons(new Set())
      },
    }),
    [edit]
  )

  const totals = useMemo(() => calc(cfg, wa, addons), [cfg, wa, addons])
  const lines = useMemo(() => buildLines(cfg, wa, addons), [cfg, wa, addons])

  return { preset, cfg, wa, addons, totals, lines, ...actions, CAMS }
}
