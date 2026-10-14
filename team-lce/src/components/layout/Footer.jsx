import { CONTACT } from '../../data/rateCard'

export default function Footer() {
  return (
    <footer className="relative z-[2] flex flex-wrap justify-between gap-4 border-t border-line px-gutter py-10 text-[10px] tracking-[.22em] text-dim">
      <span>© TEAM LCE — CANDIDATE DIGITAL COMMAND CENTRE</span>
      <span>{CONTACT.email.toUpperCase()} • {CONTACT.phone}</span>
    </footer>
  )
}
