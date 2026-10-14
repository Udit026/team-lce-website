// import Button from '../ui/Button'

// const CAPS = ['SOCIAL MEDIA', 'LIVE PRODUCTION', 'REAL-TIME CONTENT', 'CAMPAIGN DASHBOARD']

// export default function Hero() {
//   return (
//     // <header id="top" className="relative flex h-screen min-h-[640px] items-end overflow-hidden">
//     <header id="top" className=" relative flex min-h-[max(100svh,640px)] items-end overflow-hidden pt-28">
//       <div className="dots absolute inset-0" />

//       {/* pulsing rings */}
//       <div aria-hidden="true" className="pointer-events-none absolute -right-[12vmax] top-1/2 h-[90vmax] w-[90vmax] -translate-y-[55%]">
//         {[0, 1.4, 2.8, 4.2, 5.6].map((d, i) => (
//           <i
//             key={i}
//             style={{ animationDelay: `${d}s` }}
//             className={`absolute inset-0 scale-[.08] animate-ring rounded-full border opacity-0 ${i === 4 ? 'border-wa/35' : 'border-accent/35'}`}
//           />
//         ))}
//         <b className="absolute left-1/2 top-1/2 -m-[7px] h-3.5 w-3.5 rounded-full bg-accent shadow-[0_0_40px_10px_rgba(253,130,7,.35)]" />
//       </div>

//       <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,6,.3)_0%,rgba(5,5,6,0)_40%,rgba(5,5,6,.7)_78%,#050506_100%)]" />

//       <div className="relative w-full px-gutter pb-[clamp(56px,10vh,110px)]">
//         <div className="flex items-center gap-3.5 text-[11px] font-medium tracking-[.3em] text-soft before:h-px before:w-[34px] before:bg-accent before:content-['']">
//           CANDIDATE DIGITAL COMMAND CENTRE
//         </div>

//         <h1 className="my-[26px] mb-[22px] text-hero font-extrabold lt560:text-[length:clamp(2.6rem,15vw,3.6rem)] leading-[.86] tracking-[-.045em]">
//           <span className="block overflow-hidden">
//             <b className="rise-b inline-block translate-y-[105%] animate-rise font-extrabold">ONE SYSTEM.</b>
//           </span>
//           <span className="block overflow-hidden">
//             <b
//               style={{ animationDelay: '.12s' }}
//               className="rise-b inline-block translate-y-[105%] animate-rise font-extrabold text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,.6)]"
//             >
//               YOUR CAMPAIGN.
//             </b>
//           </span>
//         </h1>

//         <div style={{ animationDelay: '.6s' }} className="fade-in animate-fade font-serif text-tag italic opacity-0">
//           Social media, live production, real-time content and media distribution, run from one desk.
//         </div>

//         <div style={{ animationDelay: '.9s' }} className="fade-in mt-11 flex animate-fade flex-wrap items-end justify-between gap-10 opacity-0 lt860:flex-col lt860:items-start">
//           <div className="grid grid-cols-[repeat(2,auto)] gap-x-10 gap-y-2 text-[11px] font-medium tracking-[.24em] text-mute lt560:grid-cols-1">
//             {CAPS.map((c) => (
//               <span key={c} className="before:text-accent before:content-['—_']">{c}</span>
//             ))}
//           </div>
//           <div className="flex flex-wrap gap-3.5 lt860:w-full">
//             <Button href="#about" className="lt860:flex-1 lt860:justify-center lt860:px-4">SEE HOW IT WORKS</Button>
//             <Button href="#build" variant="solid" className="lt860:flex-1 lt860:justify-center lt860:px-4">BUILD YOUR QUOTE</Button>
//           </div>
//         </div>
//       </div>
//     </header>
//   )
// }




import Button from '../ui/Button'

const CAPS = ['SOCIAL MEDIA', 'LIVE PRODUCTION', 'REAL-TIME CONTENT', 'CAMPAIGN DASHBOARD']

export default function Hero() {
  return (
    <header id="top" className="relative flex min-h-[max(100svh,640px)] items-end overflow-hidden pt-28">
      <div className="dots absolute inset-0" />

      {/* pulsing rings */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-[12vmax] top-1/2 h-[90vmax] w-[90vmax] -translate-y-[55%]">
        {[0, 1.4, 2.8, 4.2, 5.6].map((d, i) => (
          <i
            key={i}
            style={{ animationDelay: `${d}s` }}
            className={`absolute inset-0 scale-[.08] animate-ring rounded-full border opacity-0 ${i === 4 ? 'border-wa/35' : 'border-accent/35'}`}
          />
        ))}
        <b className="absolute left-1/2 top-1/2 -m-[7px] h-3.5 w-3.5 rounded-full bg-accent shadow-[0_0_40px_10px_rgba(253,130,7,.35)]" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,6,.3)_0%,rgba(5,5,6,0)_40%,rgba(5,5,6,.7)_78%,#050506_100%)]" />

      <div className="relative w-full px-gutter pb-[clamp(56px,10vh,110px)]">
        <div className="flex items-center gap-3.5 text-[11px] font-medium tracking-[.3em] text-soft before:h-px before:w-[34px] before:bg-accent before:content-['']">
          CANDIDATE DIGITAL COMMAND CENTRE
        </div>

        <h1 className="my-[26px] mb-[22px] text-hero font-extrabold lt560:text-[length:clamp(2.6rem,15vw,3.6rem)] leading-[.86] tracking-[-.045em]">
          <span className="block overflow-hidden">
            <b className="rise-b inline-block translate-y-[105%] animate-rise font-extrabold">ONE SYSTEM.</b>
          </span>
          <span className="block overflow-hidden">
            <b
              style={{ animationDelay: '.12s' }}
              className="rise-b inline-block translate-y-[105%] animate-rise font-extrabold text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,.6)]"
            >
              YOUR CAMPAIGN.
            </b>
          </span>
        </h1>

        <div style={{ animationDelay: '.6s' }} className="fade-in animate-fade font-serif text-tag italic opacity-0">
          Social media, live production, real-time content and media distribution, run from one desk.
        </div>

        <div style={{ animationDelay: '.9s' }} className="fade-in mt-11 flex animate-fade flex-wrap items-end justify-between gap-10 opacity-0 lt860:flex-col lt860:items-start">
          <div className="grid grid-cols-[repeat(2,auto)] gap-x-10 gap-y-2 text-[11px] font-medium tracking-[.24em] text-mute lt560:grid-cols-1">
            {CAPS.map((c) => (
              <span key={c} className="before:text-accent before:content-['—_']">{c}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3.5 lt860:w-full">
            <Button href="#about" className="lt860:min-w-[150px] lt860:flex-1 lt860:px-4">SEE HOW IT WORKS</Button>
            <Button href="#build" variant="solid" className="lt860:min-w-[150px] lt860:flex-1 lt860:px-4">BUILD YOUR QUOTE</Button>
          </div>
        </div>
      </div>
    </header>
  )
}