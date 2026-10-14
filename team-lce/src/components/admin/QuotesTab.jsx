import { useEffect, useState } from 'react'
import { api } from '../../api'
import { btnCls } from './adminStyles'

const STATUSES = ['new', 'contacted', 'closed']
const money = (n) => '₹ ' + Number(n || 0).toLocaleString('en-IN')

export default function QuotesTab() {
  const [quotes, setQuotes] = useState(null)
  const [stats, setStats] = useState(null)
  const [err, setErr] = useState('')
  const [open, setOpen] = useState(null)

  const load = () => {
    api('/quotes').then((d) => setQuotes(d.quotes || [])).catch((e) => setErr(e.message))
    api('/quotes/stats').then(setStats).catch(() => {})
  }
  useEffect(() => { load() }, [])

  const setStatus = (q, status) =>
    api(`/quotes/${q.id}/status`, { method: 'PUT', body: { status } }).then(load).catch((e) => setErr(e.message))
  const remove = (q) => {
    if (window.confirm(`Delete quote of ${q.candidateName}?`))
      api(`/quotes/${q.id}`, { method: 'DELETE' }).then(load).catch((e) => setErr(e.message))
  }

  if (err && !quotes) return <p className="text-red-400">{err}</p>
  if (!quotes) return <p className="text-mute">Loading…</p>

  return (
    <div className="space-y-5">
      {stats && (
        <div className="grid grid-cols-3 gap-3">
          {[['USERS', stats.users], ['QUOTES', stats.quotes], ['NEW', stats.newQuotes]].map(([l, v]) => (
            <div key={l} className="rounded-2xl border border-white/10 p-4 text-center">
              <p className="text-2xl text-white">{v}</p>
              <p className="text-[10px] tracking-[.25em] text-accent">{l}</p>
            </div>
          ))}
        </div>
      )}
      {err && <p className="text-red-400">{err}</p>}
      {!quotes.length && <p className="text-mute">No quotes yet.</p>}

      {quotes.map((q) => {
        const total = q.totals?.grand ?? q.totals?.total ?? 0
        return (
          <div key={q.id} className="rounded-2xl border border-white/10 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button onClick={() => setOpen(open === q.id ? null : q.id)} className="min-w-0 text-left">
                <p className="truncate text-white">{q.candidateName} <span className="text-[12px] text-mute">· {q.constituency || '—'}</span></p>
                <p className="truncate text-[12px] text-mute">
                  by {q.User?.name || '—'} ({q.User?.email || ''}) · {new Date(q.createdAt).toLocaleString('en-IN')}
                </p>
              </button>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-accent">{money(total)}</span>
                <select value={q.status} onChange={(e) => setStatus(q, e.target.value)}
                  className="rounded-lg border border-white/15 bg-bg px-2 py-1 text-[12px] text-white">
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <button onClick={() => remove(q)} className={btnCls}>DELETE</button>
              </div>
            </div>

            {open === q.id && (
              <div className="mt-4 space-y-3">
                <pre className="max-h-72 overflow-auto rounded-lg bg-white/5 p-3 text-[12px] text-soft">{JSON.stringify(q.lines, null, 2)}</pre>
                <pre className="max-h-40 overflow-auto rounded-lg bg-white/5 p-3 text-[12px] text-soft">{JSON.stringify(q.totals, null, 2)}</pre>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}