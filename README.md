# Bookstore Frontend (React + TypeScript)

Frontend for the Bookstore app: browse books, filter/search, view details, manage cart/wishlist, and checkout with Stripe (via the backend).

## Live demo

- `https://bookstore-app12.netlify.app/`

## Features

- **Books browsing**: featured, bestsellers, genre browsing
- **Filtering & sorting**: URL-synced filters (shareable links), price + rating sliders, client-side sort for price/rating
- **Search**: debounced search with clear button + results
- **Book details**: polished details page with related books by genre
- **Cart**: improved UX, empty states, sticky order summary
- **Wishlist**: add/remove wishlist items (auth required)
- **Profile**: profile update form + dynamic orders history
- **Payments**: Stripe Checkout redirect + success page that polls order status
- **Responsive UI**: mobile / tablet / desktop layouts across main pages

## Tech stack

- React + TypeScript (Vite)
- Tailwind CSS + shadcn/ui components
- React Router
- Axios
- Sonner (toasts)

## Project structure

- `src/pages/` — route pages (books, details, cart, profile, checkout success, etc.)
- `src/components/` — UI + feature components (book cards, filters, orders, etc.)
- `src/contexts/` — cart state management
- `src/utils/checkout.ts` — Stripe-related API helpers
- `public/_redirects` — Netlify SPA routing (important for deep links)

## Getting started

```bash
cd Bookstore-app
npm install
```

### Environment variables

Create `Bookstore-app/.env`:

```bash
VITE_BACKEND_API=http://localhost:8000
```

## Scripts

```bash
npm run dev
npm run build
npm run preview
```

## Stripe checkout (local)

1) Start the backend and set these backend env vars:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `CLIENT_URL=http://localhost:5173`

2) Run Stripe CLI to forward webhooks:

```bash
stripe listen --forward-to localhost:8000/payment/webhook
```

3) In the frontend:
   - Add a book to cart → proceed to checkout → pay with Stripe test card `4242 4242 4242 4242`.
   - After redirect, `/checkout/success` polls the backend until the order becomes `paid`.

## Deployment notes (Netlify)

- Keep `public/_redirects` in place so routes like `/books/:id` and `/checkout/success` don’t 404.
- Set `VITE_BACKEND_API` in Netlify environment variables to your deployed backend URL.

