// import logo from '../../assets/logo.png'
// import Button from '../ui/Button'

// const LINKS = [
//   ['#about', 'ABOUT'],
//   ['#packages', 'PACKAGES'],
//   ['#process', 'HOW IT RUNS'],
//   ['#estimate', 'QUOTATION'],
// ]

// export default function Nav({ scrolled, user, onLogout }) {
//   const initial = user.name.trim().charAt(0).toUpperCase()
//   return (
//     <nav
//       className={`fixed inset-x-0 top-0 z-[60] flex items-center justify-between gap-4 border-b px-[clamp(20px,4vw,56px)] transition-[background,padding,border-color] duration-500 ease-expo ${
//         scrolled
//           ? 'border-line bg-bg/75 pb-3.5 pt-[calc(14px+env(safe-area-inset-top,0px))] backdrop-blur-[18px] backdrop-saturate-[1.4]'
//           : 'border-transparent pb-[22px] pt-[calc(22px+env(safe-area-inset-top,0px))]'
//       }`}
//     >
//       <a href="#top" aria-label="Team LCE — home" className="shrink-0">
//         <img src={logo} alt="Team LCE" className={`w-auto transition-[height] duration-500 ease-expo ${scrolled ? 'h-8' : 'h-10'}`} />
//       </a>

//       <div className="flex gap-[34px] text-[11px] font-medium tracking-[.22em] lt1180:hidden">
//         {LINKS.map(([href, label]) => (
//           <a key={href} href={href} className="text-soft transition-colors duration-300 hover:text-accent">{label}</a>
//         ))}
//       </div>

//       <div className="flex items-center gap-3">
//         {/* logged-in user */}
//         <div className="flex items-center gap-3 rounded-full border border-line2 py-1 pl-1 pr-1.5 lt860:pr-1">
//           <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-[13px] font-bold text-black">{initial}</span>
//           <div className="max-w-[170px] leading-tight lt860:hidden">
//             <b className="block truncate text-[12px] font-semibold tracking-[.02em]">{user.name}</b>
//             <small className="block truncate text-[10px] tracking-[.14em] text-accent2">{user.constituency.toUpperCase()}</small>
//           </div>
//           <button
//             onClick={onLogout} aria-label="Sign out" title="Sign out"
//             className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-mute transition-colors hover:bg-white/10 hover:text-accent"
//           >
//             <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.6]">
//               <path d="M9 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4M16 8l4 4-4 4M20 12H9" />
//             </svg>
//           </button>
//         </div>

//         <Button href="#build" variant="solid" size="sm" className="lt560:hidden">BUILD YOUR QUOTE</Button>
//       </div>
//     </nav>
//   )
// }



// after api

import logo from '../../assets/logo.png'
import Button from '../ui/Button'

const LINKS = [
  ['#about', 'ABOUT'],
  ['#packages', 'PACKAGES'],
  ['#process', 'HOW IT RUNS'],
  ['#estimate', 'QUOTATION'],
]

export default function Nav({ scrolled, user, onLogout }) {
  const initial = user.name.trim().charAt(0).toUpperCase()
  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[60] flex items-center justify-between gap-4 border-b px-[clamp(20px,4vw,56px)] transition-[background,padding,border-color] duration-500 ease-expo ${scrolled
          ? 'border-line bg-bg/75 pb-3.5 pt-[calc(14px+env(safe-area-inset-top,0px))] backdrop-blur-[18px] backdrop-saturate-[1.4]'
          : 'border-transparent pb-[22px] pt-[calc(22px+env(safe-area-inset-top,0px))]'
        }`}
    >
      <a href="#top" aria-label="Team LCE — home" className="shrink-0">
        <img src={logo} alt="Team LCE" className={`w-auto transition-[height] duration-500 ease-expo ${scrolled ? 'h-8' : 'h-10'}`} />
      </a>

      <div className="flex gap-[34px] text-[11px] font-medium tracking-[.22em] lt1180:hidden">
        {LINKS.map(([href, label]) => (
          <a key={href} href={href} className="text-soft transition-colors duration-300 hover:text-accent">{label}</a>
        ))}
      </div>

      <div className="flex items-center gap-3">
        {user.role === 'admin' && (
          <a
            href="#/admin"
            className="rounded-full border border-accent px-4 py-2 text-[11px] font-semibold tracking-[.22em] text-accent transition-colors hover:bg-accent hover:text-black"
          >
            ADMIN
          </a>
        )}
        {/* logged-in user */}
        <div className="flex items-center gap-3 rounded-full border border-line2 py-1 pl-1 pr-1.5 lt860:pr-1">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-[13px] font-bold text-black">{initial}</span>
          <div className="max-w-[170px] leading-tight lt860:hidden">
            <b className="block truncate text-[12px] font-semibold tracking-[.02em]">{user.name}</b>
            <small className="block truncate text-[10px] tracking-[.14em] text-accent2">{user.constituency.toUpperCase()}</small>
          </div>
          <button
            onClick={onLogout} aria-label="Sign out" title="Sign out"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-mute transition-colors hover:bg-white/10 hover:text-accent"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.6]">
              <path d="M9 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4M16 8l4 4-4 4M20 12H9" />
            </svg>
          </button>
        </div>

        <Button href="#build" variant="solid" size="sm" className="lt560:hidden">BUILD YOUR QUOTE</Button>
      </div>
    </nav>
  )
}
