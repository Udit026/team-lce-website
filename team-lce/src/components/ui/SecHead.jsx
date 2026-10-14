import Reveal from './Reveal'

export default function SecHead({ children, rule }) {
  return (
    <Reveal className="mb-[34px] mt-[clamp(40px,7vh,80px)] flex flex-wrap items-end justify-between gap-[30px]">
      <p className="max-w-[52ch] text-[1.02rem] text-soft">{children}</p>
      <span className="rounded-full border border-line px-4 py-[9px] text-[10px] font-medium tracking-[.26em] text-mute">{rule}</span>
    </Reveal>
  )
}
