// import Check from './Check'

// /**
//  * One configurable line: [tick + label]  [control]  [cost]
//  * `extra` renders a full-width area under the row.
//  */
// export default function Row({ on, off, label, desc, onToggle, control, cost, costOn, extra, extraFlush }) {
//   return (
//     <div
//       className={`grid grid-cols-[1fr_auto_auto] items-center gap-x-[22px] gap-y-2.5 border-b border-line py-4 last:border-0 lt860:grid-cols-[1fr_auto] ${
//         off ? 'opacity-[.38]' : ''
//       }`}
//     >
//       <button onClick={onToggle} role="checkbox" aria-checked={!!on} className="flex cursor-pointer items-start gap-3.5 text-left">
//         <Check on={on} />
//         <span>
//           <b className="block text-[.98rem] font-medium">{label}</b>
//           {desc ? <small className="text-[.8rem] text-mute">{desc}</small> : null}
//         </span>
//       </button>

//       {control ? (
//         <div className={`${off ? 'pointer-events-none' : ''} lt860:col-span-full lt860:ml-[34px] lt860:justify-self-start`}>{control}</div>
//       ) : (
//         <span className="lt860:hidden" />
//       )}

//       <span className={`min-w-24 whitespace-nowrap text-right text-[.95rem] tabular-nums lt860:col-start-2 lt860:row-start-1 ${costOn ? 'text-fg' : 'text-soft'}`}>
//         {cost}
//       </span>

//       {extra && (
//         <div className={`col-span-full flex flex-wrap items-center gap-3.5 ${extraFlush ? '' : 'pl-[34px]'} ${off ? 'pointer-events-none' : ''}`}>
//           {extra}
//         </div>
//       )}
//     </div>
//   )
// }





import Check from './Check'

/**
 * One configurable line: [tick + label]  [control]  [cost]
 * `extra` renders a full-width area under the row.
 */
export default function Row({ on, off, label, desc, onToggle, control, cost, costOn, extra, extraFlush }) {
  return (
    <div
      className={`grid grid-cols-[1fr_auto_auto] items-center gap-x-[22px] gap-y-2.5 border-b border-line py-4 last:border-0 lt860:grid-cols-[1fr_auto] ${
        off ? 'opacity-[.38]' : ''
      }`}
    >
      <button onClick={onToggle} role="checkbox" aria-checked={!!on} className="-my-2 flex min-h-[44px] cursor-pointer items-start gap-3.5 py-2 text-left">
        <Check on={on} />
        <span>
          <b className="block text-[.98rem] font-medium">{label}</b>
          {desc ? <small className="text-[.8rem] text-mute">{desc}</small> : null}
        </span>
      </button>

      {control ? (
        <div className={`${off ? 'pointer-events-none' : ''} lt860:col-span-full lt860:ml-[34px] lt860:justify-self-start`}>{control}</div>
      ) : (
        <span className="lt860:hidden" />
      )}

      <span className={`min-w-24 whitespace-nowrap text-right text-[.95rem] tabular-nums lt860:col-start-2 lt860:row-start-1 ${costOn ? 'text-fg' : 'text-soft'}`}>
        {cost}
      </span>

      {extra && (
        <div className={`col-span-full flex flex-wrap items-center gap-3.5 ${extraFlush ? '' : 'pl-[34px]'} ${off ? 'pointer-events-none' : ''}`}>
          {extra}
        </div>
      )}
    </div>
  )
}