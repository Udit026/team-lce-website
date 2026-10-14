/* Decorative backgrounds for the section bands */

const post = (a, b, i) => {
  const n = i + 1
  const bg = n % 4 === 0
    ? 'bg-[linear-gradient(135deg,rgba(255,255,255,.14),rgba(253,130,7,.2))]'
    : n % 3 === 0
    ? 'bg-[linear-gradient(135deg,rgba(255,176,77,.35),rgba(20,20,30,.4))]'
    : 'bg-[linear-gradient(135deg,rgba(253,130,7,.45),rgba(70,40,15,.4))]'
  return (
    <div key={i} className="w-[170px] rounded-xl border border-line2 bg-white/[.03] p-3 backdrop-blur-[6px]">
      <div className={`rounded-lg ${bg} ${n % 3 === 0 ? 'h-[170px]' : 'h-[120px]'}`} />
      <div className="mt-2.5 h-1.5 w-[80%] rounded-[3px] bg-white/[.14]" />
      <div className="mt-2.5 h-1.5 w-[50%] rounded-[3px] bg-white/[.14]" />
      <div className="mt-2.5 flex justify-between text-[10px] tracking-[.05em] text-mute">
        <span>♥ <b className="font-medium text-accent2">{a}</b></span>
        <span>↗ {b}</span>
      </div>
    </div>
  )
}

const COLS = [
  [['12.4K', '2.1K'], ['8.9K', '940'], ['31K', '5.6K'], ['4.2K', '610']],
  [['19K', '3.3K'], ['6.7K', '1.2K'], ['44K', '8.1K'], ['9.5K', '1.4K']],
  [['2.8K', '380'], ['15K', '2.7K'], ['7.1K', '990'], ['22K', '4.4K']],
]
const COL_STYLE = [{ animationDuration: '22s' }, { animationDuration: '28s', marginTop: -80 }, { animationDuration: '25s', marginTop: 40 }]

export function FeedArt() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_65%_at_72%_38%,rgba(253,130,7,.25),transparent_65%)]">
      <div aria-hidden="true" className="absolute right-[clamp(20px,10vw,200px)] top-[14%] flex -rotate-[8deg] gap-[18px] lt1100:opacity-50 lt860:-right-10 lt860:opacity-[.35]">
        {COLS.map((col, ci) => (
          <div key={ci} style={COL_STYLE[ci]} className="flex animate-scrollUp flex-col gap-[18px]">
            {col.concat(col).map((x, i) => post(x[0], x[1], i))}
          </div>
        ))}
      </div>
    </div>
  )
}

const BUBBLES = [
  { out: true, text: "Namaste! The new community health centre in your ward opens this Sunday at 10 AM. You're invited. 🙏", meta: 'Delivered ✓✓', delay: 0 },
  { out: false, text: 'Will there be a free check-up camp?', delay: 0.8 },
  { out: true, text: 'Yes — free BP, sugar and eye tests all day. Reply 1 to get directions.', meta: 'Read ✓✓', delay: 1.6 },
  { out: false, text: '1', delay: 2.4 },
]

export function ChatArt() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_65%_at_72%_40%,rgba(37,211,102,.18),transparent_65%)]">
      <div aria-hidden="true" className="absolute right-[clamp(20px,10vw,210px)] top-[12%] flex w-[min(380px,70vw)] flex-col gap-3 lt1100:opacity-[.55] lt860:-right-10 lt860:opacity-[.35]">
        {BUBBLES.map((b, i) => (
          <div
            key={i}
            style={{ animationDelay: `${b.delay}s` }}
            className={`max-w-[82%] animate-bub rounded-[14px] px-4 py-3 text-[.9rem] leading-[1.45] opacity-0 ${
              b.out
                ? 'self-end rounded-tr-[4px] border border-wa/35 bg-wa/[.16]'
                : 'self-start rounded-tl-[4px] border border-line2 bg-white/[.06] text-soft'
            }`}
          >
            {b.text}
            {b.meta && <small className="mt-1.5 block text-right text-[10px] tracking-[.05em] text-wa2">{b.meta}</small>}
          </div>
        ))}
      </div>
    </div>
  )
}

export function FieldArt() {
  return (
    <div className="absolute inset-0 bg-[conic-gradient(from_200deg_at_70%_45%,rgba(253,130,7,.2),rgba(255,176,77,.1),rgba(253,130,7,.05),rgba(253,130,7,.2))]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,transparent_0%,#050506_70%)]" />
    </div>
  )
}

export function ProfileArt() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_75%_40%,rgba(253,130,7,.22),transparent_65%),linear-gradient(180deg,#07080c,#050506)]">
      <div className="dots dots-profile absolute inset-0" />
    </div>
  )
}
