# Valuevillemall

Vite + React storefront. Runs standalone (no Base44 needed).

    npm install
    npm run dev      # local
    npm run build    # outputs dist/

Deploy on Vercel: import the repo; `vercel.json` already sets the Vite build and the SPA rewrite.

Data (accounts, orders) is stored in each visitor's browser via `src/api/base44Client.js`.
The first account registered becomes admin (access `/operations`). Email verification accepts any code.
Replace that file with a real backend before taking real orders or payments.
