/** Big outlined number in the background of a section. */
export default function GhostNum({ children, shifted = false }) {
  return (
    <div
      className={`pointer-events-none absolute top-[clamp(80px,12vh,140px)] text-ghost font-extrabold leading-[.8] tracking-[-.06em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,.12)] ${
        shifted ? 'right-[clamp(10px,4vw,60px)] ge1180:right-[calc(340px+90px)]' : 'right-[clamp(10px,4vw,60px)]'
      }`}
    >
      {children}
    </div>
  )
}
