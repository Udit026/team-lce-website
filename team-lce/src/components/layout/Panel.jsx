import Button from '../ui/Button'
import Summary from './Summary'
import { inr } from '../../utils/format'

/** Floating live-quotation panel (desktop ≥1180px). */
export default function Panel({ show, lines, grand, user }) {
  return (
    <aside
      className={`fixed bottom-7 right-7 top-24 z-40 flex w-panel flex-col rounded-[10px] border border-line bg-[rgba(12,12,15,.66)] shadow-[0_40px_100px_-40px_#000] backdrop-blur-[24px] backdrop-saturate-150 transition-[opacity,transform] duration-700 ease-expo lt1180:hidden ${
        show ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-[30px] opacity-0'
      }`}
    >
      <div className="border-b border-line px-[26px] pb-4 pt-[22px]">
        <div className="flex items-center justify-between">
          <h4 className="text-[11px] font-semibold tracking-[.3em]">YOUR QUOTATION</h4>
          <span className="text-[10px] tracking-[.2em] text-mute">{lines.length} {lines.length === 1 ? 'LINE' : 'LINES'}</span>
        </div>
        <div className="mt-2.5 text-[.85rem] text-accent2">{user.name} · {user.constituency}</div>
      </div>
      <div className="thin-scroll flex-1 overflow-y-auto px-[26px] py-2">
        <Summary lines={lines} />
      </div>
      <div className="border-t border-line px-[26px] pb-[22px] pt-5">
        <small className="block text-[10px] font-medium tracking-[.3em] text-mute">FIRST MONTH INVOICE</small>
        <div className="my-2 mb-4 text-[2.5rem] font-extralight leading-[1.1] tracking-[-.045em] tabular-nums">{inr(grand)}</div>
        <Button href="#estimate" variant="solid" className="w-full justify-center">VIEW QUOTATION</Button>
      </div>
    </aside>
  )
}
