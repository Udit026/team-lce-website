// import { useState } from 'react'
// import logo from '../../assets/logo.png'
// import Background from '../layout/Background'
// import Button from '../ui/Button'
// import Field from './Field'
// import { useAuth } from '../../context/AuthContext'

// const POINTS = ['SOCIAL MEDIA', 'LIVE PRODUCTION', 'REAL-TIME CONTENT', 'CAMPAIGN DASHBOARD']
// const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// export default function LoginPage() {
//   const { register, login } = useAuth()
//   const [mode, setMode] = useState('register') // 'register' | 'login'
//   const [f, setF] = useState({ name: '', constituency: '', email: '', password: '' })
//   const [errors, setErrors] = useState({})
//   const [formError, setFormError] = useState('')
//   const [busy, setBusy] = useState(false)

//   const set = (k) => (v) => {
//     setF((s) => ({ ...s, [k]: v }))
//     setErrors((e) => ({ ...e, [k]: undefined }))
//     setFormError('')
//   }

//   const validate = () => {
//     const e = {}
//     if (mode === 'register') {
//       if (f.name.trim().length < 2) e.name = 'Please enter your full name.'
//       if (f.constituency.trim().length < 2) e.constituency = 'Please enter your constituency.'
//     }
//     if (!EMAIL_RE.test(f.email.trim())) e.email = 'Please enter a valid email.'
//     if (f.password.length < 6) e.password = 'Password must be at least 6 characters.'
//     setErrors(e)
//     return !Object.keys(e).length
//   }

//   const submit = async (ev) => {
//     ev.preventDefault()
//     if (!validate()) return
//     setBusy(true)
//     await new Promise((r) => setTimeout(r, 500)) // small delay so the button state is visible
//     const res = mode === 'register' ? await register(f) : await login(f)
//     setBusy(false)
//     if (!res.ok) setFormError(res.error)
//   }

//   const switchMode = (m) => { setMode(m); setErrors({}); setFormError('') }

//   return (
//     <div className="relative min-h-screen overflow-hidden">
//       <Background />

//       <div className="relative z-[2] grid min-h-screen grid-cols-[1.15fr_1fr] lt1100:grid-cols-1">
//         {/* ---------- LEFT: brand ---------- */}
//         <div className="relative flex flex-col justify-between overflow-hidden px-[clamp(24px,5vw,80px)] pb-[clamp(40px,8vh,90px)] pt-10 lt1100:hidden">
//           <div className="dots absolute inset-0" />
//           <div aria-hidden="true" className="pointer-events-none absolute -right-[22vmax] top-1/2 h-[80vmax] w-[80vmax] -translate-y-1/2">
//             {[0, 1.4, 2.8, 4.2].map((d) => (
//               <i key={d} style={{ animationDelay: `${d}s` }} className="absolute inset-0 scale-[.08] animate-ring rounded-full border border-accent/35 opacity-0" />
//             ))}
//             <b className="absolute left-1/2 top-1/2 -m-[7px] h-3.5 w-3.5 rounded-full bg-accent shadow-[0_0_40px_10px_rgba(253,130,7,.35)]" />
//           </div>

//           <img src={logo} alt="Team LCE" className="relative h-12 w-fit" />

//           <div className="relative">
//             <div className="flex items-center gap-3.5 text-[11px] font-medium tracking-[.3em] text-soft before:h-px before:w-[34px] before:bg-accent before:content-['']">
//               CANDIDATE DIGITAL COMMAND CENTRE
//             </div>
//             <h1 className="my-6 text-[clamp(3rem,6.4vw,6.6rem)] font-extrabold leading-[.88] tracking-[-.045em]">
//               ONE SYSTEM.<br /><span className="stroke-text">YOUR CAMPAIGN.</span>
//             </h1>
//             <p className="max-w-[34ch] font-serif text-[clamp(1.3rem,2vw,1.9rem)] italic text-soft">
//               Log in to build your own campaign package. The price changes with every choice.
//             </p>
//             <div className="mt-10 grid grid-cols-[repeat(2,auto)] justify-start gap-x-10 gap-y-2 text-[11px] font-medium tracking-[.24em] text-mute">
//               {POINTS.map((p) => <span key={p} className="before:text-accent before:content-['—_']">{p}</span>)}
//             </div>
//           </div>
//         </div>

//         {/* ---------- RIGHT: form ---------- */}
//         <div className="flex items-center justify-center px-[clamp(20px,4vw,64px)] py-12 lt1100:py-10">
//           <div className="w-full max-w-[460px]">
//             <img src={logo} alt="Team LCE" className="mx-auto mb-8 hidden h-11 lt1100:block" />

//             <div className="rounded-2xl border border-line2 bg-[rgba(12,12,15,.66)] p-[clamp(26px,4vw,44px)] shadow-[0_40px_100px_-40px_#000] backdrop-blur-[24px] backdrop-saturate-150">
//               {/* tabs */}
//               <div className="mb-8 flex rounded-full border border-line2 p-1">
//                 {[['register', 'REGISTER'], ['login', 'SIGN IN']].map(([m, l]) => (
//                   <button
//                     key={m} type="button" onClick={() => switchMode(m)}
//                     className={`flex-1 rounded-full py-2.5 text-[11px] font-semibold tracking-[.22em] transition-all duration-[350ms] ease-expo ${
//                       mode === m ? 'bg-accent text-black' : 'text-soft hover:text-fg'
//                     }`}
//                   >
//                     {l}
//                   </button>
//                 ))}
//               </div>

//               <h2 className="text-[clamp(1.8rem,3vw,2.3rem)] font-extrabold leading-none tracking-[-.04em]">
//                 {mode === 'register' ? 'Welcome.' : 'Welcome back.'}{' '}
//                 <em className="font-serif font-normal italic tracking-[-.02em] text-soft">
//                   {mode === 'register' ? 'Tell us who you are.' : 'Sign in to continue.'}
//                 </em>
//               </h2>

//               <form onSubmit={submit} noValidate className="mt-8 flex flex-col gap-[18px]">
//                 {mode === 'register' && (
//                   <>
//                     <Field label="FULL NAME" icon="user" value={f.name} onChange={set('name')} error={errors.name} placeholder="e.g. Anita Sharma" autoComplete="name" />
//                     <Field label="CONSTITUENCY" icon="pin" value={f.constituency} onChange={set('constituency')} error={errors.constituency} placeholder="e.g. Dehradun Cantt" autoComplete="off" />
//                   </>
//                 )}
//                 <Field label="EMAIL" icon="mail" type="email" value={f.email} onChange={set('email')} error={errors.email} placeholder="you@example.com" autoComplete="email" />
//                 <Field label="PASSWORD" icon="lock" type="password" value={f.password} onChange={set('password')} error={errors.password} placeholder="At least 6 characters" autoComplete={mode === 'register' ? 'new-password' : 'current-password'} />

//                 {formError && (
//                   <div role="alert" className="rounded-lg border border-red-400/40 bg-red-400/10 px-4 py-3 text-[.88rem] text-red-200">{formError}</div>
//                 )}

//                 <Button type="submit" variant="solid" disabled={busy} className="mt-2 w-full justify-center disabled:opacity-70">
//                   {busy ? 'PLEASE WAIT…' : mode === 'register' ? 'CREATE ACCOUNT & ENTER' : 'SIGN IN'}
//                 </Button>
//               </form>

//               <p className="mt-6 text-center text-[.85rem] text-mute">
//                 {mode === 'register' ? 'Already registered?' : 'New here?'}{' '}
//                 <button type="button" onClick={() => switchMode(mode === 'register' ? 'login' : 'register')} className="font-medium text-accent2 underline underline-offset-4 hover:text-accent">
//                   {mode === 'register' ? 'Sign in' : 'Create an account'}
//                 </button>
//               </p>
//             </div>

//             <p className="mt-6 text-center text-[10px] tracking-[.22em] text-dim">© TEAM LCE — CANDIDATE DIGITAL COMMAND CENTRE</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


// 2nd change tha 

// import { useState } from 'react'
// import logo from '../../assets/logo.png'
// import Background from '../layout/Background'
// import Button from '../ui/Button'
// import Field from './Field'
// import { useAuth } from '../../context/AuthContext'

// const POINTS = ['SOCIAL MEDIA', 'LIVE PRODUCTION', 'REAL-TIME CONTENT', 'CAMPAIGN DASHBOARD']
// const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// export default function LoginPage() {
//   const { login } = useAuth()
//   const [f, setF] = useState({ name: '', constituency: '', email: '', password: '' })
//   const [errors, setErrors] = useState({})
//   const [busy, setBusy] = useState(false)

//   const set = (k) => (v) => {
//     setF((s) => ({ ...s, [k]: v }))
//     setErrors((e) => ({ ...e, [k]: undefined }))
//   }

//   const validate = () => {
//     const e = {}
//     if (f.name.trim().length < 2) e.name = 'Please enter your full name.'
//     if (f.constituency.trim().length < 2) e.constituency = 'Please enter your constituency.'
//     if (!EMAIL_RE.test(f.email.trim())) e.email = 'Please enter a valid email.'
//     if (f.password.length < 6) e.password = 'Password must be at least 6 characters.'
//     setErrors(e)
//     return !Object.keys(e).length
//   }

//   const submit = async (ev) => {
//     ev.preventDefault()
//     if (!validate()) return
//     setBusy(true)
//     await new Promise((r) => setTimeout(r, 500)) // small delay so the button state is visible
//     await login(f) // logged in -> App automatically shows the site
//     setBusy(false)
//   }

//   return (
//     <div className="relative min-h-screen overflow-hidden">
//       <Background />

//       <div className="relative z-[2] grid min-h-screen grid-cols-[1.15fr_1fr] lt1100:grid-cols-1">
//         {/* ---------- LEFT: brand ---------- */}
//         <div className="relative flex flex-col justify-between overflow-hidden px-[clamp(24px,5vw,80px)] pb-[clamp(40px,8vh,90px)] pt-10 lt1100:hidden">
//           <div className="dots absolute inset-0" />
//           <div aria-hidden="true" className="pointer-events-none absolute -right-[22vmax] top-1/2 h-[80vmax] w-[80vmax] -translate-y-1/2">
//             {[0, 1.4, 2.8, 4.2].map((d) => (
//               <i key={d} style={{ animationDelay: `${d}s` }} className="absolute inset-0 scale-[.08] animate-ring rounded-full border border-accent/35 opacity-0" />
//             ))}
//             <b className="absolute left-1/2 top-1/2 -m-[7px] h-3.5 w-3.5 rounded-full bg-accent shadow-[0_0_40px_10px_rgba(253,130,7,.35)]" />
//           </div>

//           <img src={logo} alt="Team LCE" className="relative h-12 w-fit" />

//           <div className="relative">
//             <div className="flex items-center gap-3.5 text-[11px] font-medium tracking-[.3em] text-soft before:h-px before:w-[34px] before:bg-accent before:content-['']">
//               CANDIDATE DIGITAL COMMAND CENTRE
//             </div>
//             <h1 className="my-6 text-[clamp(3rem,6.4vw,6.6rem)] font-extrabold leading-[.88] tracking-[-.045em]">
//               ONE SYSTEM.<br /><span className="stroke-text">YOUR CAMPAIGN.</span>
//             </h1>
//             <p className="max-w-[34ch] font-serif text-[clamp(1.3rem,2vw,1.9rem)] italic text-soft">
//               Log in to build your own campaign package. The price changes with every choice.
//             </p>
//             <div className="mt-10 grid grid-cols-[repeat(2,auto)] justify-start gap-x-10 gap-y-2 text-[11px] font-medium tracking-[.24em] text-mute">
//               {POINTS.map((p) => <span key={p} className="before:text-accent before:content-['—_']">{p}</span>)}
//             </div>
//           </div>
//         </div>

//         {/* ---------- RIGHT: form ---------- */}
//         <div className="flex items-center justify-center px-[clamp(20px,4vw,64px)] py-12 lt1100:py-10">
//           <div className="w-full max-w-[460px]">
//             <img src={logo} alt="Team LCE" className="mx-auto mb-8 hidden h-11 lt1100:block" />

//             <div className="rounded-2xl border border-line2 bg-[rgba(12,12,15,.66)] p-[clamp(26px,4vw,44px)] shadow-[0_40px_100px_-40px_#000] backdrop-blur-[24px] backdrop-saturate-150">
//               <h2 className="text-[clamp(1.8rem,3vw,2.3rem)] font-extrabold leading-none tracking-[-.04em]">
//                 Welcome.{' '}
//                 <em className="font-serif font-normal italic tracking-[-.02em] text-soft">Log in to continue.</em>
//               </h2>

//               <form onSubmit={submit} noValidate className="mt-8 flex flex-col gap-[18px]">
//                 <Field label="FULL NAME" icon="user" value={f.name} onChange={set('name')} error={errors.name} placeholder="e.g. Anita Sharma" autoComplete="name" />
//                 <Field label="CONSTITUENCY" icon="pin" value={f.constituency} onChange={set('constituency')} error={errors.constituency} placeholder="e.g. Dehradun Cantt" autoComplete="off" />
//                 <Field label="EMAIL" icon="mail" type="email" value={f.email} onChange={set('email')} error={errors.email} placeholder="you@example.com" autoComplete="email" />
//                 <Field label="PASSWORD" icon="lock" type="password" value={f.password} onChange={set('password')} error={errors.password} placeholder="At least 6 characters" autoComplete="current-password" />

//                 <Button type="submit" variant="solid" disabled={busy} className="mt-2 w-full disabled:opacity-70">
//                   {busy ? 'PLEASE WAIT…' : 'LOGIN'}
//                 </Button>
//               </form>
//             </div>

//             <p className="mt-6 text-center text-[10px] tracking-[.22em] text-dim">© TEAM LCE — CANDIDATE DIGITAL COMMAND CENTRE</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }




import { useState } from 'react'
import logo from '../../assets/logo.png'
import Background from '../layout/Background'
import Button from '../ui/Button'
import Field from './Field'
import { useAuth } from '../../context/AuthContext'

const POINTS = ['SOCIAL MEDIA', 'LIVE PRODUCTION', 'REAL-TIME CONTENT', 'CAMPAIGN DASHBOARD']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function LoginPage() {
  const { login } = useAuth()
  const [f, setF] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [busy, setBusy] = useState(false)

  const set = (k) => (v) => {
    setF((s) => ({ ...s, [k]: v }))
    setErrors((e) => ({ ...e, [k]: undefined }))
    setFormError('')
  }

  const validate = () => {
    const e = {}
    if (!EMAIL_RE.test(f.email.trim())) e.email = 'Please enter a valid email.'
    if (!f.password) e.password = 'Please enter your password.'
    setErrors(e)
    return !Object.keys(e).length
  }

  const submit = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setBusy(true)
    try {
      await login(f) // sahi hua to App khud site dikha dega
    } catch (err) {
      setFormError(err.message)
      setBusy(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Background />

      <div className="relative z-[2] grid min-h-screen grid-cols-[1.15fr_1fr] lt1100:grid-cols-1">
        {/* ---------- LEFT: brand ---------- */}
        <div className="relative flex flex-col justify-between overflow-hidden px-[clamp(24px,5vw,80px)] pb-[clamp(40px,8vh,90px)] pt-10 lt1100:hidden">
          <div className="dots absolute inset-0" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-[22vmax] top-1/2 h-[80vmax] w-[80vmax] -translate-y-1/2">
            {[0, 1.4, 2.8, 4.2].map((d) => (
              <i key={d} style={{ animationDelay: `${d}s` }} className="absolute inset-0 scale-[.08] animate-ring rounded-full border border-accent/35 opacity-0" />
            ))}
            <b className="absolute left-1/2 top-1/2 -m-[7px] h-3.5 w-3.5 rounded-full bg-accent shadow-[0_0_40px_10px_rgba(253,130,7,.35)]" />
          </div>

          <img src={logo} alt="Team LCE" className="relative h-12 w-fit" />

          <div className="relative">
            <div className="flex items-center gap-3.5 text-[11px] font-medium tracking-[.3em] text-soft before:h-px before:w-[34px] before:bg-accent before:content-['']">
              CANDIDATE DIGITAL COMMAND CENTRE
            </div>
            <h1 className="my-6 text-[clamp(3rem,6.4vw,6.6rem)] font-extrabold leading-[.88] tracking-[-.045em]">
              ONE SYSTEM.<br /><span className="stroke-text">YOUR CAMPAIGN.</span>
            </h1>
            <p className="max-w-[34ch] font-serif text-[clamp(1.3rem,2vw,1.9rem)] italic text-soft">
              Log in to build your own campaign package. The price changes with every choice.
            </p>
            <div className="mt-10 grid grid-cols-[repeat(2,auto)] justify-start gap-x-10 gap-y-2 text-[11px] font-medium tracking-[.24em] text-mute">
              {POINTS.map((p) => <span key={p} className="before:text-accent before:content-['—_']">{p}</span>)}
            </div>
          </div>
        </div>

        {/* ---------- RIGHT: form ---------- */}
        <div className="flex items-center justify-center px-[clamp(20px,4vw,64px)] py-12 lt1100:py-10">
          <div className="w-full max-w-[460px]">
            <img src={logo} alt="Team LCE" className="mx-auto mb-8 hidden h-11 lt1100:block" />

            <div className="rounded-2xl border border-line2 bg-[rgba(12,12,15,.66)] p-[clamp(26px,4vw,44px)] shadow-[0_40px_100px_-40px_#000] backdrop-blur-[24px] backdrop-saturate-150">
              <h2 className="text-[clamp(1.8rem,3vw,2.3rem)] font-extrabold leading-none tracking-[-.04em]">
                Welcome.{' '}
                <em className="font-serif font-normal italic tracking-[-.02em] text-soft">Log in to continue.</em>
                <span className="mt-3 block font-sans text-[.85rem] font-normal not-italic tracking-normal text-mute">Your account is created by Team LCE. Use the email and password shared with you.</span>
              </h2>

              <form onSubmit={submit} noValidate className="mt-8 flex flex-col gap-[18px]">
                <Field label="EMAIL" icon="mail" type="email" value={f.email} onChange={set('email')} error={errors.email} placeholder="you@example.com" autoComplete="email" />
                <Field label="PASSWORD" icon="lock" type="password" value={f.password} onChange={set('password')} error={errors.password} placeholder="Your password" autoComplete="current-password" />

                {formError && (
                  <div role="alert" className="rounded-lg border border-red-400/40 bg-red-400/10 px-4 py-3 text-[.88rem] text-red-200">{formError}</div>
                )}

                <Button type="submit" variant="solid" disabled={busy} className="mt-2 w-full disabled:opacity-70">
                  {busy ? 'PLEASE WAIT…' : 'LOGIN'}
                </Button>
              </form>
            </div>

            <p className="mt-6 text-center text-[10px] tracking-[.22em] text-dim">© TEAM LCE — CANDIDATE DIGITAL COMMAND CENTRE</p>
          </div>
        </div>
      </div>
    </div>
  )
}

