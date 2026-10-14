export const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN')

export const fmtShort = (n) =>
  n >= 100000
    ? '₹' + (n / 100000).toFixed(2).replace(/\.?0+$/, '') + 'L'
    : n >= 1000
    ? '₹' + n / 1000 + 'K'
    : '₹' + n

export const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
