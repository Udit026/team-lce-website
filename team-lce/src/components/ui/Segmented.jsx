export default function Segmented({ options, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-1 rounded-full border border-line2 p-1">
      {options.map((o, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className={`rounded-full px-3.5 py-2 text-[11px] transition-all duration-[350ms] ease-expo ${
            value === i ? 'bg-accent font-semibold text-black' : 'text-soft'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}
