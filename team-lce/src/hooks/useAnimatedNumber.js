import { useEffect, useRef, useState } from 'react'

/** Smoothly animates a number towards `target` (used for the ₹ totals). */
export default function useAnimatedNumber(target, duration = 800) {
  const [val, setVal] = useState(0)
  const from = useRef(0)
  useEffect(() => {
    const start = from.current
    const t0 = performance.now()
    let raf
    const step = (now) => {
      const p = Math.min((now - t0) / duration, 1)
      const v = start + (target - start) * (1 - Math.pow(1 - p, 4))
      from.current = v
      setVal(v)
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return val
}
