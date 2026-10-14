import { useId } from 'react'

const ICONS = {
  mail: 'M4 6h16v12H4zM4 7l8 6 8-6',
  lock: 'M6 11h12v9H6zM8 11V8a4 4 0 0 1 8 0v3',
}

export default function Field({ label, icon, type = 'text', value, onChange, error, placeholder, autoComplete }) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[10px] font-medium tracking-[.28em] text-mute">{label}</label>
      <div
        className={`flex items-center gap-3 rounded-xl border bg-white/[.03] px-4 transition-colors focus-within:border-accent ${
          error ? 'border-red-400/60' : 'border-line2'
        }`}
      >
        {icon && (
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0 fill-none stroke-mute stroke-[1.6]" aria-hidden="true">
            <path d={ICONS[icon]} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          className="w-full bg-transparent py-3.5 text-[.95rem] text-white outline-none placeholder:text-dim"
        />
      </div>
      {error && <p role="alert" className="mt-2 text-[.8rem] text-red-300">{error}</p>}
    </div>
  )
}