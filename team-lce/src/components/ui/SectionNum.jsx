/** "01 ——— WHAT WE BUILD" label */
export default function SectionNum({ n, children, color }) {
  return (
    <div className="mb-[18px] flex items-baseline gap-[18px]">
      <b className="text-[1.1rem] font-medium tracking-[.1em] text-accent">{n}</b>
      <i className="h-px w-[60px] flex-none bg-line2" />
      <span className="text-[11px] font-medium tracking-[.3em] text-soft" style={color ? { color } : undefined}>
        {children}
      </span>
    </div>
  )
}
