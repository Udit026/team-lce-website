// /**
//  * Pill button with hover "fill" animation.
//  *  variant="outline" -> saffron fill on hover
//  *  variant="solid"   -> saffron button, white fill on hover
//  */
// const base =
//   'relative isolate inline-flex items-center gap-3 overflow-hidden whitespace-nowrap rounded-full border font-semibold tracking-[.2em] ' +
//   'transition-[border-color,color] duration-[400ms] ' +
//   "before:absolute before:inset-0 before:-z-10 before:translate-y-[101%] before:transition-transform before:duration-[550ms] before:ease-expo before:content-[''] " +
//   'hover:before:translate-y-0'

// const variants = {
//   outline: 'border-line2 before:bg-accent hover:border-accent hover:text-black',
//   solid: 'border-accent bg-accent text-black before:bg-fg hover:border-fg',
// }
// const sizes = {
//   md: 'px-[26px] py-[15px] text-[11px]',
//   sm: 'px-5 py-[11px] text-[10px]',
// }

// export default function Button({ as, variant = 'outline', size = 'md', className = '', children, ...rest }) {
//   const Tag = as || (rest.href ? 'a' : 'button')
//   return (
//     <Tag className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
//       {children}
//     </Tag>
//   )
// }


/**
 * Pill button with hover "fill" animation.
 *  variant="outline" -> saffron fill on hover
 *  variant="solid"   -> saffron button, white fill on hover
 */
const base =
  'relative isolate inline-flex max-w-full items-center justify-center gap-3 overflow-hidden rounded-full border text-center font-semibold tracking-[.2em] leading-snug ' +
  'transition-[border-color,color] duration-[400ms] ' +
  "before:absolute before:inset-0 before:-z-10 before:translate-y-[101%] before:transition-transform before:duration-[550ms] before:ease-expo before:content-[''] " +
  'hover:before:translate-y-0'

const variants = {
  outline: 'border-line2 before:bg-accent hover:border-accent hover:text-black',
  solid: 'border-accent bg-accent text-black before:bg-fg hover:border-fg',
}
const sizes = {
  md: 'px-[26px] py-[15px] text-[11px] lt560:px-5 lt560:py-3.5 lt560:tracking-[.14em]',
  sm: 'px-5 py-[11px] text-[10px] lt560:px-4 lt560:tracking-[.14em]',
}

export default function Button({ as, variant = 'outline', size = 'md', className = '', children, ...rest }) {
  const Tag = as || (rest.href ? 'a' : 'button')
  return (
    <Tag className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}