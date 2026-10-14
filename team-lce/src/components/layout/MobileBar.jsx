import { useEffect, useState } from 'react'
import Button from '../ui/Button'
import Summary from './Summary'
import { inr } from '../../utils/format'

/** Bottom sticky quotation bar (screens < 1180px). */
export default function MobileBar({ show, lines, grand }) {
  const [open, setOpen] = useState(false)
  useEffect(() => { if (!show) setOpen(false) }, [show])

  return (
    <div
      className={`fixed inset-x-2.5 bottom-0 z-[55] mb-[calc(10px+env(safe-area-inset-bottom,0px))] hidden rounded-2xl border border-line2 bg-[rgba(14,14,18,.86)] backdrop-blur-[22px] backdrop-saturate-150 transition-transform duration-700 ease-expo lt1180:block ${
        show ? 'translate-y-0' : 'translate-y-[140%]'
      }`}
    >
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex w-full items-center justify-between gap-3 px-[18px] py-3.5 text-left">
        <div>
          <small className="block text-[9px] font-medium tracking-[.26em] text-mute">FIRST MONTH INVOICE</small>
          <div className="text-[1.6rem] font-light leading-[1.15] tracking-[-.03em] tabular-nums">{inr(grand)}</div>
        </div>
        <div className="flex items-center gap-2.5 text-[10px] tracking-[.2em] text-soft">
          <span>{lines.length} {lines.length === 1 ? 'LINE' : 'LINES'}</span>
          <span className={`grid h-[30px] w-[30px] place-items-center rounded-full border border-line2 transition-transform duration-500 ease-expo ${open ? 'rotate-180' : ''}`}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 8l4-4 4 4" stroke="currentColor" strokeWidth="1.2" /></svg>
          </span>
        </div>
      </button>
      <div className={`overflow-hidden transition-[max-height] duration-[600ms] ease-expo ${open ? 'max-h-[55vh] overflow-y-auto' : 'max-h-0'}`}>
        <div className="border-t border-line px-[18px] pb-4">
          <Summary lines={lines} />
          <Button href="#estimate" variant="solid" className="mt-3.5 w-full justify-center" onClick={() => setOpen(false)}>
            VIEW QUOTATION
          </Button>
        </div>
      </div>
    </div>
  )
}
