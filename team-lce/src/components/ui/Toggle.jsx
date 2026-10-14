/** Round switch (visual only). */
export default function Toggle({ on }) {
  return (
    <span
      className={`relative h-[26px] w-[46px] shrink-0 rounded-full border transition-all duration-500 ease-expo ${
        on ? 'border-accent bg-accent shadow-[0_0_22px_rgba(253,130,7,.35)]' : 'border-line2'
      }`}
    >
      <span
        className={`absolute top-[3px] h-[18px] w-[18px] rounded-full transition-all duration-500 ease-expo ${
          on ? 'left-[23px] bg-black' : 'left-[3px] bg-mute'
        }`}
      />
    </span>
  )
}
