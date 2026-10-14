import { useEffect, useState } from 'react'
import { api } from '../../api'
import UsersTab from './UsersTab'
import PricingTab from './PricingTab'
import QuotesTab from './QuotesTab'

const TABS = [['users', 'USERS'], ['pricing', 'PRICING'], ['quotes', 'QUOTES']]

export default function AdminPage({ user, onLogout }) {
  const [tab, setTab] = useState('users')
  return (
    <div className="min-h-screen bg-bg text-soft">
      <header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-bg/90 px-4 py-3 backdrop-blur md:px-8">
        <h1 className="text-[12px] font-semibold tracking-[.3em] text-accent">ADMIN PANEL</h1>
        <div className="flex items-center gap-3 text-[12px]">
          <span className="hidden text-mute sm:inline">{user.name}</span>
          <a href="#/" className="rounded-full border border-white/20 px-4 py-2 hover:border-accent">SITE</a>
          <button onClick={onLogout} className="rounded-full border border-white/20 px-4 py-2 hover:border-accent">LOGOUT</button>
        </div>
      </header>

      <nav className="flex gap-2 overflow-x-auto px-4 pt-4 md:px-8">
        {TABS.map(([k, label]) => (
          <button key={k} onClick={() => setTab(k)}
            className={`whitespace-nowrap rounded-full border px-5 py-2 text-[11px] font-semibold tracking-[.2em] ${tab === k ? 'border-accent bg-accent/10 text-accent' : 'border-white/15 text-mute'}`}>
            {label}
          </button>
        ))}
      </nav>

      <main className="p-4 md:p-8">
        {tab === 'users' && <UsersTab me={user} />}
        {tab === 'pricing' && <PricingTab />}
        {tab === 'quotes' && <QuotesTab />}
      </main>
    </div>
  )
}
