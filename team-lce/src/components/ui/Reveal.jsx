import useInView from '../../hooks/useInView'

/** Fade + slide-up when scrolled into view. delay = 0..4 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const [ref, inView] = useInView()
  return (
    <Tag
      ref={ref}
      data-reveal
      style={{ transitionDelay: `${delay * 0.08}s`, ...style }}
      className={`transition-[opacity,transform] duration-[1100ms] ease-expo ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
