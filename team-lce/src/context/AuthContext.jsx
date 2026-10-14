// import { createContext, useContext, useState, useCallback } from 'react'

// /**
//  * FRONTEND-ONLY auth (demo).
//  * Users + session browser ke localStorage mein save hote hain.
//  * Real project mein register()/login()/logout() ke andar apni API call laga dena —
//  * baaki site ko kuch badalna nahi padega.
//  */
// const USERS_KEY = 'lce_users'
// const SESSION_KEY = 'lce_session'

// const read = (k, fallback) => {
//   try { return JSON.parse(localStorage.getItem(k)) ?? fallback } catch { return fallback }
// }
// const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch { /* ignore */ } }

// async function hash(text) {
//   try {
//     const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
//     return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
//   } catch {
//     return text // crypto.subtle only works on https / localhost
//   }
// }

// const AuthContext = createContext(null)
// export const useAuth = () => useContext(AuthContext)

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     const email = read(SESSION_KEY, null)
//     return email ? read(USERS_KEY, {})[email] ?? null : null
//   })

//   const startSession = (u) => {
//     const { hash: _h, ...safe } = u
//     write(SESSION_KEY, safe.email)
//     setUser(safe)
//   }

//   // returns { ok:true } or { ok:false, error }
//   const register = useCallback(async ({ name, constituency, email, password }) => {
//     const users = read(USERS_KEY, {})
//     const key = email.trim().toLowerCase()
//     if (users[key]) return { ok: false, error: 'This email is already registered. Please sign in.' }
//     const u = { name: name.trim(), constituency: constituency.trim(), email: key, hash: await hash(password) }
//     users[key] = u
//     write(USERS_KEY, users)
//     startSession(u)
//     return { ok: true }
//   }, [])

//   const login = useCallback(async ({ email, password }) => {
//     const users = read(USERS_KEY, {})
//     const u = users[email.trim().toLowerCase()]
//     if (!u) return { ok: false, error: 'No account found with this email. Please register first.' }
//     if (u.hash !== (await hash(password))) return { ok: false, error: 'Incorrect password.' }
//     startSession(u)
//     return { ok: true }
//   }, [])

//   const logout = useCallback(() => {
//     try { localStorage.removeItem(SESSION_KEY) } catch { /* ignore */ }
//     setUser(null)
//     window.scrollTo(0, 0)
//   }, [])

//   return <AuthContext.Provider value={{ user, register, login, logout }}>{children}</AuthContext.Provider>
// }




// 2nd change tha 

// import { createContext, useContext, useState, useCallback } from 'react'

// /**
//  * Simple login: jo bhi details bharega, wahi user ban jaata hai (direct login).
//  * Session browser ke localStorage mein save hota hai (refresh par login bana rehta hai).
//  * Password kahin save NAHI hota.
//  *
//  * Real backend lagana ho to login() ke andar apni API call laga do.
//  */
// const SESSION_KEY = 'lce_session'

// const readSession = () => {
//   try {
//     const u = JSON.parse(localStorage.getItem(SESSION_KEY))
//     return u && typeof u === 'object' && u.name ? u : null // purane format ko ignore karo
//   } catch {
//     return null
//   }
// }

// const AuthContext = createContext(null)
// export const useAuth = () => useContext(AuthContext)

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(readSession)

//   const login = useCallback(async ({ name, constituency, email }) => {
//     const u = { name: name.trim(), constituency: constituency.trim(), email: email.trim().toLowerCase() }
//     try { localStorage.setItem(SESSION_KEY, JSON.stringify(u)) } catch { /* ignore */ }
//     setUser(u)
//     return { ok: true }
//   }, [])

//   const logout = useCallback(() => {
//     try { localStorage.removeItem(SESSION_KEY) } catch { /* ignore */ }
//     setUser(null)
//     window.scrollTo(0, 0)
//   }, [])

//   return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
// }





import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { api, getToken, setToken } from '../api'

/**
 * Login backend se hota hai. Users admin banata hai (register nahi).
 * Token localStorage mein; refresh par /auth/me se user wapas aata hai.
 */
const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [checking, setChecking] = useState(!!getToken()) // refresh par token verify ho raha hai

  useEffect(() => {
    if (!getToken()) return
    api('/auth/me')
      .then((d) => setUser(d.user))
      .catch(() => setToken(null)) // token kharab / expire
      .finally(() => setChecking(false))
  }, [])

  // throws Error(message) agar email/password galat ho
  const login = useCallback(async ({ email, password }) => {
    const d = await api('/auth/login', { method: 'POST', body: { email, password } })
    setToken(d.token)
    setUser(d.user)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
    window.scrollTo(0, 0)
  }, [])

  return <AuthContext.Provider value={{ user, checking, login, logout }}>{children}</AuthContext.Provider>
}