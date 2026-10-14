/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // Breakpoints (same as the original design). `lt` = "less than".
    screens: {
      lt1400: { max: '1400px' },
      lt1180: { max: '1179px' },
      lt1100: { max: '1100px' },
      lt860: { max: '860px' },
      lt560: { max: '560px' },
      ge1101: '1101px',
      ge1180: '1180px',
    },
    extend: {
      colors: {
        // ===== BRAND COLOURS — change saffron here and the whole site updates =====
        accent: '#FD8207',   // saffron (taken from the Team LCE logo)
        accent2: '#FFB04D',  // light saffron
        // ==========================================================================
        bg: '#050506',
        bg2: '#0a0a0c',
        fg: '#f5f5f7',
        soft: '#b9b9c0',
        mute: '#80808a',
        dim: '#4a4a52',
        line: 'rgba(255,255,255,.09)',
        line2: 'rgba(255,255,255,.18)',
        wa: '#25d366',
        wa2: '#8ef0b4',
      },
      fontFamily: {
        sans: ["'Inter'", '-apple-system', 'BlinkMacSystemFont', "'Helvetica Neue'", 'Arial', 'sans-serif'],
        serif: ["'Instrument Serif'", 'Georgia', "'Times New Roman'", 'serif'],
      },
      spacing: {
        gutter: 'clamp(20px,6vw,96px)',
        panel: '340px',
      },
      fontSize: {
        hero: 'clamp(3.6rem,12vw,12.5rem)',
        tag: 'clamp(1.5rem,3.2vw,2.8rem)',
        ghost: 'clamp(8rem,22vw,22rem)',
        pgtitle: 'clamp(2.6rem,7.5vw,7.4rem)',
        pglead: 'clamp(1.05rem,1.5vw,1.3rem)',
        stat: 'clamp(2.6rem,5.8vw,5.6rem)',
        divh: 'clamp(3.2rem,11vw,11rem)',
        divp: 'clamp(1.3rem,2.4vw,2.2rem)',
        // bandh: 'clamp(3rem,9.5vw,9.5rem)',
         bandh: 'clamp(2.6rem,9.5vw,9.5rem)',
        bandsub: 'clamp(1.4rem,2.6vw,2.4rem)',
        finalh: 'clamp(2.4rem,6.6vw,6.6rem)',
        big: 'clamp(3rem,6vw,6rem)',
        stephead: 'clamp(1.4rem,2.2vw,2rem)',
        modh: 'clamp(1.3rem,2vw,1.7rem)',
        cardh: 'clamp(1.35rem,1.8vw,1.7rem)',
        price: 'clamp(2rem,2.8vw,2.6rem)',
      },
      transitionTimingFunction: { expo: 'cubic-bezier(.22,1,.36,1)' },
      boxShadow: {
        glow: '0 30px 80px -30px rgba(253,130,7,.35)',
        waglow: '0 30px 80px -30px rgba(37,211,102,.3)',
      },
      keyframes: {
        rec: { '50%': { opacity: '.25' } },
        grain: {
          '0%': { transform: 'translate(0,0)' },
          '25%': { transform: 'translate(-3%,2%)' },
          '50%': { transform: 'translate(2%,-3%)' },
          '75%': { transform: 'translate(3%,3%)' },
          '100%': { transform: 'translate(0,0)' },
        },
        d1: { to: { transform: 'translate(25vw,20vh) scale(1.2)' } },
        d2: { to: { transform: 'translate(-20vw,-25vh) scale(.9)' } },
        ring: {
          '0%': { transform: 'scale(.06)', opacity: '0' },
          '10%': { opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '0' },
        },
        rise: { to: { transform: 'none' } },
        fade: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'none' },
        },
        scrollUp: { to: { transform: 'translateY(-40%)' } },
        bub: {
          '0%,4%': { opacity: '0', transform: 'translateY(14px) scale(.98)' },
          '10%,88%': { opacity: '1', transform: 'none' },
          '96%,100%': { opacity: '0' },
        },
        spin: { to: { transform: 'rotate(360deg)' } },
        liIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'none' },
        },
        pulse2: { '40%': { transform: 'scale(.975)' } },
      },
      animation: {
        rec: 'rec 1.6s ease-in-out infinite',
        grain: 'grain 1.2s steps(6) infinite',
        d1: 'd1 28s ease-in-out infinite alternate',
        d2: 'd2 34s ease-in-out infinite alternate',
        ring: 'ring 7s cubic-bezier(.22,1,.36,1) infinite',
        rise: 'rise 1.4s cubic-bezier(.22,1,.36,1) forwards',
        fade: 'fade 1.2s cubic-bezier(.22,1,.36,1) forwards',
        scrollUp: 'scrollUp 22s linear infinite',
        bub: 'bub 9s cubic-bezier(.22,1,.36,1) infinite',
        spinSlow: 'spin 14s linear infinite',
        liIn: 'liIn .6s cubic-bezier(.22,1,.36,1)',
        liInSlow: 'liIn .7s cubic-bezier(.22,1,.36,1) both',
      },
    },
  },
  plugins: [],
}
