# CaterersNearMe

A full-stack catering search platform built with **Node.js + Express** on the backend and **Next.js 16 (App Router)** on the frontend.

---

## Quick Start

### Prerequisites
- Node.js 20+
- pnpm (`npm install -g pnpm` or via corepack)
- A MongoDB Atlas URI (or local MongoDB instance)

### 1 — Clone and install

```bash
git clone <repo-url>
cd catersnearme-asgnmnt

# Install root dev-deps (concurrently)
pnpm install

# Install server deps
cd server && pnpm install && cd ..

# Install client deps
cd client && pnpm install && cd ..
```

### 2 — Environment variables

**`server/.env`** (already present, update URI if needed):
```env
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
CLIENT_URL=http://localhost:3000   # for CORS
API_KEY=admin-secret-key           # for POST /api/caterers
```

**`client/.env.local`** (already present):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3 — Seed the database

```bash
cd server
pnpm node seed.js
```

This inserts 100 realistic caterers across 10 Indian cities.

### 4 — Run in development

From the **repo root**:

```bash
pnpm dev
```

This starts both servers concurrently:
- Backend → `http://localhost:5000`
- Frontend → `http://localhost:3000`

Or run them individually:

```bash
pnpm dev:server   # Express only
pnpm dev:client   # Next.js only
```

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/caterers` | List all caterers |
| `GET` | `/api/caterers/:id` | Get a single caterer |
| `POST` | `/api/caterers` | Create a caterer |

### Query parameters for `GET /api/caterers`

| Param | Type | Example | Description |
|-------|------|---------|-------------|
| `name` | string | `?name=sharma` | Case-insensitive regex search |
| `maxPrice` | number | `?maxPrice=1000` | Max price per plate (₹) |
| `minPrice` | number | `?minPrice=300` | Min price per plate (₹) |
| `city` | string | `?city=mumbai` | Filter by city |
| `cuisines` | string | `?cuisines=Punjabi,Mughlai` | Comma-separated cuisine match |
| `isVeg` | boolean | `?isVeg=true` | Veg-only caterers |
| `page` | number | `?page=2` | Pagination (default: 1) |
| `limit` | number | `?limit=20` | Page size (max: 100) |

### `POST /api/caterers` — request body

> **Auth required:** This endpoint requires an `X-API-KEY` header. Default for development: `admin-secret-key`.

```bash
curl -X POST http://localhost:5000/api/caterers \
  -H "Content-Type: application/json" \
  -H "X-API-KEY: admin-secret-key" \
  -d '{
    "name": "Sharma Caterers",
    "location": { "city": "Mumbai", "area": "Andheri" },
    "pricePerPlate": 650,
    "cuisines": ["North Indian", "Punjabi"],
    "rating": 4.2,
    "isVeg": false,
    "experience": 8,
    "minGuests": 50,
    "maxGuests": 500,
    "tagline": "Taste that brings people together"
  }'
```

> **Rate limit:** `POST /api/caterers` is limited to **5 requests per IP per 15 minutes** (returns `429` when exceeded).

### Validation errors (Zod)

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "name": ["Name must be at least 2 characters"],
    "pricePerPlate": ["pricePerPlate must be a positive number"]
  }
}
```

---

## Architecture Decisions

### Rendering Strategy

The frontend uses **three different rendering strategies** chosen deliberately for each route — this mirrors how production platforms like Zomato handle their listing pages.

| Route | Strategy | Why |
|-------|----------|-----|
| `/caterers` | **ISR** (`revalidate: 60`) | The caterer list is the same for all users. We pre-render HTML at the edge and silently regenerate it every 60 s — fast page loads without ever going stale. |
| `/caterers/[id]` | **SSG** (`generateStaticParams`) | Individual caterer profiles are stable data. Pre-generating them at build time means zero DB hits at runtime and instant loads from CDN. |
| Search / filter | **Client-side state** | Filtering by name or price is purely local — no round-trip needed. The filtered view appears instantly as the user types. |

### URL-Synced Filters

Filter state lives in the URL (`?name=sharma&maxPrice=1000`) rather than React `useState`. This means:

- **Shareable links** — copy the URL, share it, and the recipient sees the same filtered results.
- **Browser back/forward** works correctly.
- **No hydration mismatch** — server and client read from the same source of truth.

This is implemented with [nuqs](https://nuqs.47ng.com/), which is native to the Next.js App Router.

### Rate Limiting

`POST /api/caterers` is protected by `express-rate-limit` (5 requests / IP / 15 min). This prevents abuse of the creation endpoint without adding database overhead.

### Validation with Zod

All POST body validation uses a Zod schema rather than manual `if` checks. This gives:
- Automatic type coercion (e.g. string `"false"` → boolean `false`)
- Structured, field-level error messages for the frontend to display
- A single schema that doubles as the TypeScript source of truth

---

## Project Structure

```
/
├── backend/                    ← Node.js + Express
│   ├── src/
│   │   ├── config/db.js        ← MongoDB connection
│   │   ├── controllers/        ← getCaterers, getCatererById, createCaterer
│   │   ├── middlewares/        ← Zod validate, express-rate-limit
│   │   ├── models/Caterer.js   ← Mongoose schema
│   │   └── routes/caterers.js  ← Route definitions
│   ├── seed.js                 ← Faker-powered seed script
│   └── index.js                ← Express app entry
│
└── frontend/                   ← Next.js 16 App Router
    ├── app/
    │   ├── caterers/
    │   │   ├── page.tsx         ← ISR list page
    │   │   └── [id]/page.tsx    ← SSG detail page
    │   ├── layout.tsx           ← Root layout + Navbar
    │   └── page.tsx             ← Hero landing page
    ├── components/
    │   ├── CatererCard.tsx
    │   ├── CatererListClient.tsx ← Client-side filtering
    │   ├── EmptyState.tsx
    │   ├── PriceFilter.tsx      ← URL-synced price filter
    │   ├── SearchBar.tsx        ← URL-synced search
    │   └── SkeletonCard.tsx     ← Shimmer skeleton loader
    ├── lib/api.ts               ← Typed fetch helpers
    └── types/caterer.ts         ← Shared TypeScript interfaces
```

---

## Optional Deployment

| Service | Target |
|---------|--------|
| Frontend | [Vercel](https://vercel.com) — set `NEXT_PUBLIC_API_URL` to your backend URL |
| Backend | [Render](https://render.com) or AWS EC2 — set `MONGO_URI` and `CLIENT_URL` env vars |
