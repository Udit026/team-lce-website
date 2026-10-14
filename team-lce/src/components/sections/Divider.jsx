import Reveal from '../ui/Reveal'
import Button from '../ui/Button'

const STEPS = [
  ['01', 'CHANNELS & CONTENT'],
  ['02', 'FIELD & LIVE'],
  ['03', 'WHATSAPP'],
  ['04', 'ADD-ONS'],
  ['05', 'QUOTATION'],
]

export default function Divider() {
  return (
    <section id="build" className="relative flex min-h-screen items-center overflow-hidden border-t border-line">
      <div className="dots dots-center absolute inset-0" />
      <div className="relative w-full px-gutter text-center">
        <Reveal className="flex items-center justify-center gap-3.5 text-[11px] font-medium tracking-[.3em] text-soft before:h-px before:w-[34px] before:bg-accent before:content-['']">
          PART TWO
        </Reveal>
        <Reveal as="h2" delay={1} className="my-[30px] text-divh font-extrabold leading-[.86] tracking-[-.055em]">
          BUILD YOUR<br /><span className="stroke-text">COMMAND CENTRE.</span>
        </Reveal>
        <Reveal as="p" delay={2} className="font-serif text-divp italic text-soft">
          Build your own campaign. The price changes with every choice.
        </Reveal>
        <Reveal delay={3} className="mt-[50px] flex flex-wrap justify-center gap-[clamp(14px,3vw,40px)] text-[10px] font-medium tracking-[.26em] text-mute">
          {STEPS.map(([n, l]) => (
            <span key={n}><b className="mr-2 text-accent">{n}</b>{l}</span>
          ))}
        </Reveal>
        <Reveal delay={4}>
          <Button href="#digital" variant="solid" className="mt-[50px]">START BUILDING</Button>
        </Reveal>
      </div>
    </section>
  )
}
