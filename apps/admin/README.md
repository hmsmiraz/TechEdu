# admin (Next.js)

Admin panel: approve/reject signups, manage users and roles, manage
modules and their video/doc resources.

## Auth

Reuses auth-service's existing /auth/login. On successful login, the
JWT's role claim is checked client-side (UI gating only) — every API
call is independently re-checked server-side via each service's own
require_admin dependency, so a non-admin token gains nothing even if
someone tampered with the client check.

## Run locally

npm install
cp .env.example .env.local
npm run dev

Runs on http://localhost:3001. Requires auth-service (:8000) and
content-service (:8001) running.

## Pages

- /login — admin sign-in
- /users — list, approve, reject, change role, delete
- /content — create/delete modules, add/delete resources per module
