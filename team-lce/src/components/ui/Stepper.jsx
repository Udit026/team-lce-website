export default function Stepper({ value, unit, onChange, className = '' }) {
  const b = 'h-[38px] w-[38px] text-[18px] text-soft hover:text-fg'
  return (
    <div className={`flex items-center rounded-full border border-line2 ${className}`}>
      <button className={b} onClick={() => onChange(-1)} aria-label="Fewer">−</button>
      <output className="min-w-[34px] text-center font-medium tabular-nums">{value}</output>
      <button className={b} onClick={() => onChange(1)} aria-label="More">+</button>
      {unit && <span className="pr-3 text-[10px] tracking-[.14em] text-mute">{unit}</span>}
    </div>
  )
}
