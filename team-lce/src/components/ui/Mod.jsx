/** A bordered module card with header (kicker, title, description, right-side subtotal). */
export default function Mod({ kicker, title, desc, sub, children, className = '' }) {
  return (
    <div className={`mb-[18px] rounded-[10px] border border-line bg-[linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,.006))] ${className}`}>
      <div className="flex flex-wrap items-end justify-between gap-[18px] border-b border-line px-7 pb-[18px] pt-6 lt860:px-[18px]">
        <div>
          <i className="text-[10px] font-semibold not-italic tracking-[.28em] text-accent2">{kicker}</i>
          <h3 className="mt-2 text-modh font-semibold tracking-[-.02em]">{title}</h3>
          <p className="mt-1 max-w-[60ch] text-[.9rem] text-mute">{desc}</p>
        </div>
        {sub && (
          <div className="whitespace-nowrap text-[1.2rem] font-light tabular-nums">
            {sub.value ? sub.value : '—'}
            <small className="block text-right text-[9px] tracking-[.24em] text-mute">{sub.label || 'PER MONTH'}</small>
          </div>
        )}
      </div>
      {children}
    </div>
  )
}

export const ModBody = ({ children, className = '' }) => (
  <div className={`px-7 pb-3.5 pt-1.5 lt860:px-[18px] ${className}`}>{children}</div>
)
