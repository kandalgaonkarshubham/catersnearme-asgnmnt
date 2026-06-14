# CatersNearMe

A catering search platform to discover, search, and filter through caterers across Indian cities.

## Live Deployment
| Service | URL |
|---------|-----|
| **Frontend** | https://catersnearme.vercel.app/ |
| **Backend API** | https://catersnearme-backend.vercel.app/ |

## Tech Stack
- **Backend**: Node.js, Express, MongoDB (Mongoose), Zod, express-rate-limit
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Lucide
- **Data**: Faker.js for realistic seeding

## Architecture Decisions
- **Rendering**: The main caterers list uses **ISR (revalidate: 60)** to keep things fast while allowing for periodic data updates. For the individual caterer profiles, I used **SSG** with `generateStaticParams` since profile data is mostly stable and this gives the best performance and SEO.
- **Search & Filters**: These are handled client-side using `nuqs`. This approach gives instant feedback as users type or click, and everything stays synced with the URL (like `?name=` or `?maxPrice=`) so pages are easily shareable.
- **POST Security**: The creation endpoint is protected by an `X-API-KEY` header and rate-limited. I used Zod for schema validation to ensure the data is clean before it hits the database.

## Getting Started

### Backend
1. `cd server` and run `pnpm install`
2. Set up your `.env` (check `.env.example`)
3. Run `pnpm run dev`
4. Seed the database with `node seed.js`

### Frontend
1. `cd client` and run `pnpm install`
2. Set up your `.env.local`
3. Run `pnpm run dev`

## API Endpoints
- `GET /api/caterers`: Fetch all caterers. Supports query filters: `name`, `city`, `maxPrice`, `isVeg`, `cuisines`.
- `GET /api/caterers/:id`: Fetch a specific caterer by ID.
- `POST /api/caterers`: Create a new caterer. Requires `X-API-KEY`.

### POST Body Example:
```json
{
  "name": "Royal Catering",
  "location": { "city": "Mumbai", "area": "Andheri" },
  "pricePerPlate": 800,
  "cuisines": ["North Indian", "Chinese"],
  "isVeg": true
}
```

## Testing
To verify the POST endpoint, run:
```bash
pnpm run test:api
```
This script checks unauthorized access, validation errors (via Zod), and successful creation.
