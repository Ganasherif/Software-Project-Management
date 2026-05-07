# Gana Travel — جانا للسياحة

A polished, frontend-only **React** prototype for a unified travel and tourism booking platform. Browse flights, hotels, and curated tour packages across two continents — all from a single, modern interface.

> Built as a university Software Project Management deliverable. The entire UI is in English; the brand's Arabic name (جانا للسياحة) is shown only as part of the project identity.

---

## ✨ Tech Stack

| Area | Tool |
| --- | --- |
| Build tool | **Vite 5** |
| Framework | **React 18** (JavaScript) |
| Styling | **Tailwind CSS** with custom palette |
| Routing | **React Router v6** |
| Icons | **lucide-react** |
| Notifications | **react-hot-toast** |
| State | React Context (auth) + `useState` / `useReducer` |
| Persistence | `localStorage` (mock auth, saved bookings, favorites) |

There is **no backend, no API, no database**. All data is mocked from JSON-style modules in `src/data/`.

---

## 🚀 Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Production build
npm run build

# 4. Preview production build
npm run preview
```

Requires Node.js 18 or newer.

---

## 🎨 Brand & palette

| Token | Hex | Usage |
| --- | --- | --- |
| `navy` | `#12212E` | Primary text, headers, footer |
| `teal` | `#307082` | Primary brand, links, secondary buttons |
| `mint` | `#6CA3A2` | Accents and hover states |
| `cream` | `#ECE7DC` | Page background, soft surfaces |
| `orange` | `#EA9940` | CTA buttons, prices, badges |

Typography: **Poppins** (headings) + **Inter** (body), loaded from Google Fonts.

---

## 🗂 Folder structure

```
gana-travel/
├── public/                 # static assets (favicon)
├── src/
│   ├── assets/             # local image assets (Unsplash URLs used in mock data)
│   ├── components/
│   │   ├── auth/           # LoginForm, RegisterForm, AuthShell
│   │   ├── checkout/       # CheckoutSummary, PaymentForm, BookingConfirmation
│   │   ├── dashboard/      # BookingsList, ProfileCard, MembershipBadge
│   │   ├── flights/        # FlightCard, FlightFilters, FlightSearchForm
│   │   ├── home/           # Hero, SearchBar, FeaturedDestinations, Stats, …
│   │   ├── hotels/         # HotelCard, HotelFilters, HotelSearchForm
│   │   ├── layout/         # Navbar, Footer, Layout
│   │   ├── membership/     # PlanCard, PlanComparison
│   │   ├── tours/          # TourCard, TourFilters
│   │   └── ui/             # Button, Card, Input, Modal, Badge, Rating, EmptyState
│   ├── context/
│   │   └── AuthContext.jsx # mock auth provider (localStorage-backed)
│   ├── data/
│   │   ├── destinations.js # 6 featured destinations
│   │   ├── flights.js      # 12 mock flights
│   │   ├── hotels.js       # 10 mock hotels
│   │   ├── plans.js        # 3 membership tiers
│   │   └── tours.js        # 8 tour packages with day-by-day itineraries
│   ├── pages/              # Home, Flights, Hotels, Tours, Login, Register,
│   │                       #   Dashboard, Membership, Checkout, NotFound
│   ├── App.jsx             # routes + Toaster
│   ├── main.jsx            # React entry, providers
│   └── index.css           # Tailwind layers + design tokens
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── index.html
└── package.json
```

---

## 🧭 Pages

| Route | Description |
| --- | --- |
| `/` | Hero, search bar, featured destinations, stats, why-us, membership teaser, testimonials |
| `/flights` | Search form, sidebar filters (price / stops / airlines / time), sortable list |
| `/hotels` | Search form, sidebar filters (price / stars / amenities), member-discount badges |
| `/tours` | Filter chips (duration / region / theme), tour cards, day-by-day modal |
| `/login` & `/register` | Split-screen auth with mock success → redirects to `/dashboard` |
| `/dashboard` | Protected. Tabs: My Bookings, Profile, Membership, Saved |
| `/membership` | 3-tier comparison (Basic / Silver / Gold), "Most Popular" ribbon, comparison table |
| `/checkout` | Two-column layout, sticky order summary, success modal with confirmation # |
| `*` | Friendly 404 |

---

## 📦 Mock Data Notice

This is a **frontend-only prototype**. No real bookings are made and no real payments are processed.

- "Login" and "Register" accept any non-empty credentials. A mock user object is stored in `localStorage` under `gana_auth_user`.
- "Confirm Booking" generates a random 8-character confirmation number, shows a success modal, and persists the booking to `localStorage` under `gana_bookings` so it shows up on the dashboard.
- "Save" hearts on hotels and tours persist to `gana_saved_hotels` / `gana_saved_tours`.
- Choosing a membership plan updates the user's `tier` in context + `localStorage` only — no charge.
- Card inputs use lightweight formatting masks but no validation against real card networks.
- All images are loaded from public Unsplash URLs.

To reset the app to its initial state, clear site data for the dev server origin (or run `localStorage.clear()` in DevTools).

---

## 📜 License

Educational use. © Gana Travel — university project deliverable.
