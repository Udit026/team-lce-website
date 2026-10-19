// /**
//  * Backend se baat karne ka ek hi helper.
//  * Token localStorage mein rehta hai aur har request ke saath jaata hai.
//  */
// export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
// const TOKEN_KEY = 'lce_token'

// export const getToken = () => { try { return localStorage.getItem(TOKEN_KEY) } catch { return null } }
// export const setToken = (t) => { try { t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY) } catch { /* ignore */ } }

// export async function api(path, { method = 'GET', body } = {}) {
//   const token = getToken()
//   let res
//   try {
//     res = await fetch(API_URL + path, {
//       method,
//       headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
//       body: body ? JSON.stringify(body) : undefined,
//     })
//   } catch {
//     throw new Error('Cannot reach the server. Please check your connection.')
//   }
//   const data = await res.json().catch(() => ({}))
//   if (!res.ok) {
//     const err = new Error(data.message || 'Something went wrong.')
//     err.status = res.status
//     throw err
//   }
//   return data
// }




/**
 * Backend API helper
 * Vercel frontend se Render backend ko connect karta hai.
 * Token localStorage mein store hota hai.
 */

// Vercel Environment Variable:
// VITE_API_URL=https://team-lce-website.onrender.com
export const API_URL =
  import.meta.env.VITE_API_URL ||
  'http://localhost:5000'

const TOKEN_KEY = 'lce_token'

// Token read karna
export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

// Token save ya remove karna
export const setToken = (token) => {
  try {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token)
    } else {
      localStorage.removeItem(TOKEN_KEY)
    }
  } catch {
    // localStorage unavailable hone par ignore
  }
}

// Common API request function
export async function api(
  path,
  { method = 'GET', body } = {}
) {
  const token = getToken()

  // URL ke end ke extra slashes remove karke /api add karo

  // ye git hub mai uploade hua hhai 
  const baseURL = API_URL.replace(/\/+$/, '')
  const endpoint = `${baseURL}/api${path.startsWith('/') ? path : `/${path}`}`
  

  let response

  try {
    response = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token
          ? { Authorization: `Bearer ${token}` }
          : {}),
      },
      ...(body !== undefined
        ? { body: JSON.stringify(body) }
        : {}),
    })
  } catch (error) {
    throw new Error(
      'Server se connection nahi ho pa raha. Internet ya backend server check karo.'
    )
  }

  // JSON response read karo
  const data = await response.json().catch(() => ({}))

  // API error handle karo
  if (!response.ok) {
    const error = new Error(
      data.message || `Request failed (${response.status})`
    )

    error.status = response.status
    throw error
  }

  return data
}
