import { useEffect, useState } from 'react'
import { api } from '../../api'
// import { inputCls, btnCls } from './AdminPage'
import { inputCls, btnCls } from './adminStyles'
const empty = { name: '', constituency: '', email: '', password: '', role: 'user' }

export default function UsersTab({ me }) {
  const [users, setUsers] = useState([])
  const [form, setForm] = useState(empty)
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)

  const load = () => api('/users').then((d) => setUsers(d.users)).catch((e) => setMsg(e.message))
  useEffect(() => { load() }, [])

  const run = async (fn, ok) => {
    setBusy(true); setMsg('')
    try { await fn(); setMsg(ok); await load() } catch (e) { setMsg(e.message) } finally { setBusy(false) }
  }

  const create = (e) => {
    e.preventDefault()
    run(async () => { await api('/users', { method: 'POST', body: form }); setForm(empty) }, 'User created.')
  }
  const toggle = (u) => run(() => api(`/users/${u.id}`, { method: 'PUT', body: { isActive: !u.isActive } }), 'Updated.')
  const reset = (u) => {
    const password = window.prompt(`New password for ${u.email} (min 6 chars):`)
    if (password) run(() => api(`/users/${u.id}/password`, { method: 'PUT', body: { password } }), 'Password updated.')
  }
  const remove = (u) => {
    if (window.confirm(`Delete ${u.email}?`)) run(() => api(`/users/${u.id}`, { method: 'DELETE' }), 'User deleted.')
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
      <form onSubmit={create} className="space-y-3 rounded-2xl border border-white/10 p-5">
        <h2 className="text-[12px] font-semibold tracking-[.25em] text-accent">NEW USER</h2>
        <input className={inputCls} placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input className={inputCls} placeholder="Constituency" value={form.constituency} onChange={(e) => setForm({ ...form, constituency: e.target.value })} />
        <input className={inputCls} type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input className={inputCls} type="text" placeholder="Password (min 6)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <select className={inputCls} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button disabled={busy} className={btnCls}>CREATE USER</button>
        {msg && <p className="text-[13px] text-mute">{msg}</p>}
      </form>

      <div className="space-y-3">
        {users.map((u) => (
          <div key={u.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 p-4">
            <div className="min-w-0">
              <p className="truncate text-white">{u.name} <span className="ml-2 text-[10px] tracking-[.2em] text-accent">{u.role.toUpperCase()}</span></p>
              <p className="truncate text-[13px] text-mute">{u.email} · {u.constituency || '—'}</p>
              <p className={`text-[11px] ${u.isActive ? 'text-green-400' : 'text-red-400'}`}>{u.isActive ? 'Active' : 'Disabled'}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {u.id !== me.id && <button disabled={busy} onClick={() => toggle(u)} className={btnCls}>{u.isActive ? 'DISABLE' : 'ENABLE'}</button>}
              <button disabled={busy} onClick={() => reset(u)} className={btnCls}>RESET PASSWORD</button>
              {u.id !== me.id && <button disabled={busy} onClick={() => remove(u)} className={btnCls}>DELETE</button>}
            </div>
          </div>
        ))}
        {!users.length && <p className="text-mute">No users yet.</p>}
      </div>
    </div>
  )
}