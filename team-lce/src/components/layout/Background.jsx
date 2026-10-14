/** Fixed aurora glow + film grain behind the whole page. */
export default function Background() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <i className="absolute -left-[10vmax] -top-[20vmax] h-[60vmax] w-[60vmax] animate-d1 rounded-full bg-accent opacity-[.13] blur-[120px]" />
        <i className="absolute -bottom-[25vmax] -right-[15vmax] h-[60vmax] w-[60vmax] animate-d2 rounded-full bg-[#b34700] opacity-[.13] blur-[120px]" />
      </div>
      <div className="grain pointer-events-none fixed -inset-1/2 z-[90] h-[200%] w-[200%] animate-grain opacity-[.06]" />
    </>
  )
}
