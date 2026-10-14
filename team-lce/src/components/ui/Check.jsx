/** Saffron tick-box (visual only — put it inside a clickable element). */
export default function Check({ on, className = '' }) {
  return (
    <span
      className={`relative mt-0.5 h-5 w-5 shrink-0 rounded-[5px] border transition-all duration-300 ease-expo ${
        on ? 'border-accent bg-accent' : 'border-line2'
      } ${className}`}
    >
      <span
        className={`absolute left-[6px] top-[2px] h-[11px] w-[6px] rotate-45 border-b-2 border-r-2 border-black transition-transform duration-300 ease-expo ${
          on ? 'scale-100' : 'scale-0'
        }`}
      />
    </span>
  )
}
