import Reveal from '../ui/Reveal'
import GhostNum from '../ui/GhostNum'
import SectionNum from '../ui/SectionNum'
import useInView from '../../hooks/useInView'

const STEPS = [
  ['Capture', 'Photo, video and live feeds from the field team.'],
  ['Media desk', 'Editors pull photos and 20–60 second clips while the event is still running.'],
  ['Approve', 'Candidate or authorised person approves, rejects or edits in the dashboard.'],
  ['Publish', 'Formatted for each selected channel and published together.'],
  ['Archive', 'Everything filed by date and event in the candidate media library.'],
]
const DAY = [
  ['07:30', 'Programme in', "Day's schedule received and entered in the dashboard."],
  ['08:00', 'Coverage plan', 'Field team and cameras assigned to each event.'],
  ['Live', 'Capture & stream', 'Photos upload in real time; selected events go live.'],
  ['+20 min', 'First clips out', 'Reels, Shorts and photos published after approval.'],
  ['Evening', 'Wrap-up', 'Longer event video and full photo set published.'],
  ['Night', 'Daily report', 'What went out, where, and how it performed.'],
]

export default function Process() {
  const [ref, inView] = useInView()
  return (
    <section id="process" className="relative flex min-h-screen flex-col justify-center border-t border-line pb-[clamp(80px,12vh,130px)] pt-[clamp(120px,16vh,170px)]">
      <GhostNum>03</GhostNum>
      <div className="relative px-gutter">
        <Reveal><SectionNum n="03">HOW A CAMPAIGN DAY RUNS</SectionNum></Reveal>
        <Reveal as="h2" delay={1} className="mt-[26px] text-pgtitle font-extrabold leading-[.9] tracking-[-.05em]">
          One event.<br />
          <em className="font-serif font-normal italic tracking-[-.02em] text-soft">Ten pieces of content.</em>
        </Reveal>

        {/* 5-step flow */}
        <div
          ref={ref}
          className={`relative mt-[clamp(60px,9vh,100px)] grid grid-cols-5 lt860:grid-cols-1 lt860:gap-1.5
            before:absolute before:left-0 before:right-0 before:top-[9px] before:h-px before:bg-line2 before:content-[''] lt860:before:bottom-0 lt860:before:left-[9px] lt860:before:right-auto lt860:before:top-0 lt860:before:h-auto lt860:before:w-px
            after:absolute after:left-0 after:top-[9px] after:h-px after:w-full after:origin-left after:bg-[linear-gradient(90deg,#FD8207,#FFB04D)] after:transition-transform after:duration-[2400ms] after:ease-expo after:content-['']
            lt860:after:bottom-0 lt860:after:left-[9px] lt860:after:right-auto lt860:after:top-0 lt860:after:h-auto lt860:after:w-px lt860:after:origin-top
            ${inView ? 'after:scale-x-100 lt860:after:scale-y-100' : 'after:scale-x-0 lt860:after:scale-x-100 lt860:after:scale-y-0'}`}
        >
          {STEPS.map(([h, p], i) => (
            <div key={h} className="relative pr-6 lt860:grid lt860:grid-cols-[19px_1fr] lt860:gap-x-5 lt860:pb-[22px] lt860:pr-0">
              <div
                className={`relative z-[1] h-[19px] w-[19px] rounded-full border bg-bg transition-all duration-[600ms] ease-expo lt860:row-span-3 ${
                  inView ? 'border-accent shadow-[0_0_0_5px_rgba(253,130,7,.14)]' : 'border-line2'
                }`}
              />
              <i className="mb-2.5 mt-7 block text-[10px] not-italic tracking-[.3em] text-mute lt860:mb-1.5 lt860:mt-0">STEP 0{i + 1}</i>
              <h4 className="text-stephead font-bold tracking-[-.03em]">{h}</h4>
              <p className="mt-2.5 text-[.92rem] text-mute">{p}</p>
            </div>
          ))}
        </div>

        {/* day timeline */}
        <Reveal className="mt-[clamp(50px,8vh,80px)] grid grid-cols-6 border-t border-line lt1100:grid-cols-3 lt860:grid-cols-2">
          {DAY.map(([t, h, p]) => (
            <div
              key={t}
              className="pr-[18px] pt-[22px] [&:not(:first-child)]:border-l [&:not(:first-child)]:border-line [&:not(:first-child)]:pl-[18px] lt1100:[&:nth-child(4)]:border-l-0 lt1100:[&:nth-child(4)]:pl-0 lt860:!border-l-0 lt860:!pl-0"
            >
              <i className="text-[1.5rem] font-extralight not-italic tracking-[-.03em] text-accent2">{t}</i>
              <b className="mt-2.5 block font-semibold">{h}</b>
              <p className="mt-1.5 text-[.86rem] text-mute">{p}</p>
            </div>
          ))}
        </Reveal>

        {/* compliance */}
        <Reveal className="mt-[clamp(50px,8vh,80px)] grid grid-cols-[auto_1fr] items-center gap-[22px] rounded-lg border border-line2 bg-white/[.02] px-7 py-[26px] lt860:grid-cols-1">
          <svg viewBox="0 0 36 36" className="h-9 w-9 fill-none stroke-wa stroke-[1.3]">
            <path d="M18 3l12 5v9c0 8-5.5 13.5-12 16-6.5-2.5-12-8-12-16V8z" />
            <path d="M12 18l4 4 8-9" />
          </svg>
          <p className="max-w-[80ch] text-[.98rem] text-soft">
            <b className="font-semibold text-fg">Compliance is a step in the workflow, not an afterthought.</b> Election advertising goes through MCMC pre-certification before it runs. Paid ads on Google carry the required election-ad verification and "paid for by" disclosure. Official social-media accounts are recorded for the candidate's nomination. Ad spend is kept separate from our service fee so it can be reported in election expenditure.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
