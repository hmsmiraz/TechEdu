# learning-portal (Next.js)

Protected student portal. Shows modules and their video/doc resources,
each opening in a new tab.

## Flow

1. Landing app's /login redirects here to /auth/callback?token=...
   after a successful (approved) login.
2. /auth/callback stores the token (localStorage) and redirects to /.
3. / reads the token, fetches GET /modules from content-service, and
   renders each module with its resources.
4. If no token exists, or content-service returns 401 (expired/invalid
   token), the user is bounced back to the landing app's /login.

## Run locally

npm install
cp .env.example .env.local
npm run dev

Runs on http://localhost:3002. Requires content-service running on
:8001 (or whatever NEXT_PUBLIC_CONTENT_API_URL points to).

## Note on token storage

Currently uses localStorage for simplicity. This is vulnerable to XSS
token theft in a way an httpOnly cookie isn't — worth hardening later
via a backend-for-frontend pattern once the gateway exists.
