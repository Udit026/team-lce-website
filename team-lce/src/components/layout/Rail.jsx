// const ITEMS = [
//   ['about', '01', 'ABOUT'],
//   ['packages', '02', 'PACKAGES'],
//   ['process', '03', 'HOW IT RUNS'],
//   ['digital', '04', 'CHANNELS'],
//   ['field', '05', 'FIELD & LIVE'],
//   ['whatsapp', '06', 'WHATSAPP'],
//   ['addons', '07', 'ADD-ONS'],
//   ['estimate', '08', 'QUOTATION'],
// ]

// /** Small section dots on the left edge (desktop only). */
// export default function Rail({ show, active }) {
//   return (
//     <div
//       className={`fixed left-[clamp(14px,2vw,32px)] top-1/2 z-50 flex -translate-y-1/2 flex-col gap-[18px] transition-opacity duration-[600ms] lt1100:hidden ${
//         show ? 'opacity-100' : 'pointer-events-none opacity-0'
//       }`}
//     >
//       {ITEMS.map(([id, num, label]) => {
//         const on = active === id
//         return (
//           <a key={id} href={`#${id}`} className={`group flex items-center gap-3 text-[11px] font-medium tracking-[.12em] transition-colors duration-[400ms] ${on ? 'text-fg' : 'text-dim'}`}>
//             <i
//               className={`block h-px bg-current transition-[width,background] duration-[600ms] ease-expo ${on ? 'w-[34px] !bg-accent' : 'w-[10px]'}`}
//             />
//             {num}
//             <span className="-translate-x-1.5 text-[10px] tracking-[.2em] text-mute opacity-0 transition-all duration-500 ease-expo group-hover:translate-x-0 group-hover:opacity-100">
//               {label}
//             </span>
//           </a>
//         )
//       })}
//     </div>
//   )
// }







const ITEMS = [
  ['about', '01', 'ABOUT'],
  ['packages', '02', 'PACKAGES'],
  ['process', '03', 'HOW IT RUNS'],
  ['digital', '04', 'CHANNELS'],
  ['field', '05', 'FIELD & LIVE'],
  ['whatsapp', '06', 'WHATSAPP'],
  ['addons', '07', 'ADD-ONS'],
  ['estimate', '08', 'QUOTATION'],
]

/** Small section dots on the left edge (desktop only). */
export default function Rail({ show, active }) {
  return (
    <div
      className={`fixed left-[clamp(14px,2vw,32px)] top-1/2 z-50 flex -translate-y-1/2 flex-col gap-[18px] transition-opacity duration-[600ms] lt1100:hidden ${
        show ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      {ITEMS.map(([id, num, label]) => {
        const on = active === id
        return (
          <a key={id} href={`#${id}`} className={`group flex items-center gap-3 py-1 text-[11px] font-medium tracking-[.12em] transition-colors duration-[400ms] ${on ? 'text-fg' : 'text-dim'}`}>
            <i
              className={`block h-px bg-current transition-[width,background] duration-[600ms] ease-expo ${on ? 'w-[34px] !bg-accent' : 'w-[10px]'}`}
            />
            {num}
            <span className="-translate-x-1.5 text-[10px] tracking-[.2em] text-mute opacity-0 transition-all duration-500 ease-expo group-hover:translate-x-0 group-hover:opacity-100">
              {label}
            </span>
          </a>
        )
      })}
    </div>
  )
}
