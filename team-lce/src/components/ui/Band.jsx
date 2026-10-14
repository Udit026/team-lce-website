// import Reveal from './Reveal'
// import GhostNum from './GhostNum'
// import SectionNum from './SectionNum'

// /**
//  * Big hero band at the top of each "step" section.
//  * `art` = background decoration, `lines` = title lines.
//  */
// export default function Band({ art, ghost, n, label, labelColor, lines, sub, subColor, short = false }) {
//   return (
//     <div
//       className={`relative flex items-end overflow-hidden ${
//         short ? 'h-[clamp(340px,54vh,560px)]' : 'h-[clamp(440px,74vh,780px)]'
//       }`}
//     >
//       {art}
//       <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,6,.2),rgba(5,5,6,.05)_40%,rgba(5,5,6,.85)_82%,#050506)]" />
//       <GhostNum shifted>{ghost}</GhostNum>
//       <div className="relative w-full px-gutter pb-[clamp(40px,7vh,80px)] ge1180:pr-[calc(340px+90px)]">
//         <Reveal><SectionNum n={n} color={labelColor}>{label}</SectionNum></Reveal>
//         <Reveal as="h2" delay={1} className="text-bandh font-extrabold leading-[.88] tracking-[-.05em]">
//           {lines.map((l, i) => (
//             <span key={i}>{l}{i < lines.length - 1 && <br />}</span>
//           ))}
//         </Reveal>
//         {sub && (
//           <Reveal delay={2} className="mt-[18px] font-serif text-bandsub italic text-soft" style={subColor ? { color: subColor } : undefined}>
//             {sub}
//           </Reveal>
//         )}
//       </div>
//     </div>
//   )
// }



import Reveal from './Reveal'
import GhostNum from './GhostNum'
import SectionNum from './SectionNum'

/**
 * Big hero band at the top of each "step" section.
 * `art` = background decoration, `lines` = title lines.
 */
export default function Band({ art, ghost, n, label, labelColor, lines, sub, subColor, short = false }) {
  return (
    <div
      className={`relative flex items-end overflow-hidden ${
        short ? 'min-h-[clamp(340px,54vh,560px)]' : 'min-h-[clamp(440px,74vh,780px)]'
      }`}
    >
      {art}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,6,.2),rgba(5,5,6,.05)_40%,rgba(5,5,6,.85)_82%,#050506)]" />
      <GhostNum shifted>{ghost}</GhostNum>
      <div className="relative w-full px-gutter pb-[clamp(40px,7vh,80px)] pt-28 ge1180:pr-[calc(340px+90px)]">
        <Reveal><SectionNum n={n} color={labelColor}>{label}</SectionNum></Reveal>
        <Reveal as="h2" delay={1} className="text-bandh font-extrabold leading-[.88] tracking-[-.05em]">
          {lines.map((l, i) => (
            <span key={i}>{l}{i < lines.length - 1 && <br />}</span>
          ))}
        </Reveal>
        {sub && (
          <Reveal delay={2} className="mt-[18px] font-serif text-bandsub italic text-soft" style={subColor ? { color: subColor } : undefined}>
            {sub}
          </Reveal>
        )}
      </div>
    </div>
  )
}