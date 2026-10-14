# Team LCE — Candidate Digital Command Centre

React (Vite) + Tailwind CSS v3

## Run karne ke liye
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/
```

## Folder structure
```
team-lce/
├── index.html                 # fonts, title, favicon
├── tailwind.config.js         # 🎨 COLORS (saffron), fonts, animations, breakpoints
├── public/logo.png            # favicon
└── src/
    ├── main.jsx               # entry
    ├── App.jsx                # saare sections yahan jude hain (order badalna ho to yahin)
    ├── index.css              # global css (grain, dots mask, range slider)
    ├── assets/logo.png        # navbar logo (src/components/layout/Nav.jsx mein use hua)
    │
    ├── context/AuthContext.jsx # 🔐 login / register / logout (localStorage, demo)
    ├── data/rateCard.js       # 💰 saari prices, packages, WhatsApp packs, add-ons, contact email/phone
    ├── utils/
    │   ├── pricing.js         # total calculate karne ka logic
    │   └── format.js          # ₹ formatting
    ├── hooks/
    │   ├── useQuote.js        # quotation ka poora state + actions
    │   ├── useScrollState.js  # nav / side-rail / panel show-hide
    │   ├── useInView.js       # scroll reveal
    │   └── useAnimatedNumber.js
    │
    └── components/
        ├── auth/              # LoginPage.jsx (pehla page), Field.jsx
        ├── layout/            # Nav, Rail, Panel (right side quote), MobileBar, Footer, Background
        ├── sections/          # Hero, About, Packages, Process, Divider,
        │                      # Channels, Field, WhatsApp, Addons, Quotation, arts.jsx
        └── ui/                # Button, Reveal, Check, Toggle, Stepper, Segmented, Mod, Row, Band ...
```

## Common changes
| Kya badalna hai | Kahan |
|---|---|
| Saffron color | `tailwind.config.js` → `colors.accent` / `accent2` (+ `rgba(253,130,7,…)` wali glow values) |
| Prices / items / text of packages | `src/data/rateCard.js` |
| Email / phone | `src/data/rateCard.js` → `CONTACT` |
| Logo | `src/assets/logo.png` (navbar) and `public/logo.png` (favicon) |
| Hero / About text | `src/components/sections/Hero.jsx`, `About.jsx` |
| Button style | `src/components/ui/Button.jsx` |

Breakpoints (`tailwind.config.js` → `screens`): `lt1180:` = 1180px se chhote, `lt860:` = 860px se chhote, `ge1180:` = 1180px+ ...

## Login
- Site khulte hi pehle `LoginPage` aata hai (`src/App.jsx` mein `user ? <Site/> : <LoginPage/>`).
- Register: Name, Constituency, Email, Password. Sign in: Email + Password.
- Naam + constituency navbar, right-side quotation panel aur Quotation form mein auto-fill hote hain.
- Ye **frontend-only demo** hai: data browser ke localStorage mein rehta hai. Real backend lagana ho to
  `src/context/AuthContext.jsx` ke `register()` / `login()` / `logout()` mein apni API call laga do.
