// import Background from './components/layout/Background'
// import Nav from './components/layout/Nav'
// import Rail from './components/layout/Rail'
// import Panel from './components/layout/Panel'
// import MobileBar from './components/layout/MobileBar'
// import Footer from './components/layout/Footer'
// import LoginPage from './components/auth/LoginPage'

// import Hero from './components/sections/Hero'
// import About from './components/sections/About'
// import Packages from './components/sections/Packages'
// import Process from './components/sections/Process'
// import Divider from './components/sections/Divider'
// import Channels from './components/sections/Channels'
// import Field from './components/sections/Field'
// import WhatsApp from './components/sections/WhatsApp'
// import Addons from './components/sections/Addons'
// import Quotation from './components/sections/Quotation'

// import useQuote from './hooks/useQuote'
// import useScrollState from './hooks/useScrollState'
// import useAnimatedNumber from './hooks/useAnimatedNumber'
// import { useAuth } from './context/AuthContext'

// /** The main site — only rendered after login. */
// function Site({ user, onLogout }) {
//   const q = useQuote()
//   const scroll = useScrollState()
//   const grand = useAnimatedNumber(q.totals.grand)

//   return (
//     <div className="pb-0 lt1180:pb-[110px]">
//       <Background />
//       <Nav scrolled={scroll.scrolled} user={user} onLogout={onLogout} />
//       <Rail show={scroll.railShow} active={scroll.active} />

//       <main className="relative z-[2]">
//         <Hero />
//         <About />
//         <Packages />
//         <Process />
//         <Divider />
//         <Channels q={q} />
//         <Field q={q} />
//         <WhatsApp q={q} />
//         <Addons q={q} />
//         <Quotation q={q} grand={grand} user={user} />
//       </main>

//       <Footer />
//       <Panel show={scroll.panelShow} lines={q.lines} grand={grand} user={user} />
//       <MobileBar show={scroll.panelShow} lines={q.lines} grand={grand} />
//     </div>
//   )
// }

// export default function App() {
//   const { user, logout } = useAuth()
//   // No user -> login page first. After login -> the site.
//   return user ? <Site key={user.email} user={user} onLogout={logout} /> : <LoginPage />
// }



// after api 

import { useEffect, useState } from 'react'
import Background from './components/layout/Background'
import Nav from './components/layout/Nav'
import Rail from './components/layout/Rail'
import Panel from './components/layout/Panel'
import MobileBar from './components/layout/MobileBar'
import Footer from './components/layout/Footer'
import LoginPage from './components/auth/LoginPage'
import AdminPage from './components/admin/AdminPage'

import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Packages from './components/sections/Packages'
import Process from './components/sections/Process'
import Divider from './components/sections/Divider'
import Channels from './components/sections/Channels'
import Field from './components/sections/Field'
import WhatsApp from './components/sections/WhatsApp'
import Addons from './components/sections/Addons'
import Quotation from './components/sections/Quotation'

import useQuote from './hooks/useQuote'
import useScrollState from './hooks/useScrollState'
import useAnimatedNumber from './hooks/useAnimatedNumber'
import { useAuth } from './context/AuthContext'
import { api } from './api'
import { applyRateCard } from './data/rateCard'

/** The main site — only rendered after login + prices loaded. */
function Site({ user, onLogout }) {
  const q = useQuote()
  const scroll = useScrollState()
  const grand = useAnimatedNumber(q.totals.grand)

  return (
    <div className="pb-0 lt1180:pb-[110px]">
      <Background />
      <Nav scrolled={scroll.scrolled} user={user} onLogout={onLogout} />
      <Rail show={scroll.railShow} active={scroll.active} />

      <main className="relative z-[2]">
        <Hero />
        <About />
        <Packages />
        <Process />
        <Divider />
        <Channels q={q} />
        <Field q={q} />
        <WhatsApp q={q} />
        <Addons q={q} />
        <Quotation q={q} grand={grand} user={user} />
      </main>

      <Footer />
      <Panel show={scroll.panelShow} lines={q.lines} grand={grand} user={user} />
      <MobileBar show={scroll.panelShow} lines={q.lines} grand={grand} />
    </div>
  )
}

function Loading({ text }) {
  return (
    <div className="grid min-h-screen place-items-center bg-bg">
      <div className="flex flex-col items-center gap-5">
        <div className="h-10 w-10 animate-spinSlow rounded-full border-2 border-dashed border-accent" />
        <p className="text-[11px] font-medium tracking-[.3em] text-mute">{text}</p>
      </div>
    </div>
  )
}

/** Login ke baad: pehle prices backend se laao, phir site dikhao. */
function Gate({ user, onLogout }) {
  const [state, setState] = useState('loading') // loading | ready | error
  const [error, setError] = useState('')

  useEffect(() => {
    let live = true
    api('/ratecard')
      .then((d) => { applyRateCard(d.rateCard); if (live) setState('ready') })
      .catch((e) => {
        if (e.status === 401) return onLogout() // session expire
        if (live) { setError(e.message); setState('error') }
      })
    return () => { live = false }
  }, [onLogout])

  if (state === 'loading') return <Loading text="LOADING YOUR COMMAND CENTRE" />
  if (state === 'error')
    return (
      <div className="grid min-h-screen place-items-center px-6 text-center">
        <div>
          <p className="mb-5 text-soft">{error}</p>
          <button onClick={() => window.location.reload()} className="rounded-full border border-accent px-6 py-3 text-[11px] font-semibold tracking-[.2em] text-accent">TRY AGAIN</button>
        </div>
      </div>
    )
  return <Site user={user} onLogout={onLogout} />
}

export default function App() {
  const { user, checking, logout } = useAuth()
  const [hash, setHash] = useState(window.location.hash)

  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (checking) return <Loading text="PLEASE WAIT" />
  if (!user) return <LoginPage />
  if (user.role === 'admin' && hash === '#/admin') return <AdminPage user={user} onLogout={logout} />
  return <Gate key={user.id} user={user} onLogout={logout} />
}