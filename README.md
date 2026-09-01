# TechEdu LMS

Monorepo for the TechEdu learning platform. Turborepo + npm workspaces for the
frontends, FastAPI microservices for the backend, MySQL for storage.

## Structure

```
techedu-lms/
├── apps/
│   ├── landing/            ✅ Step 1 done — public site + login/signup pages
│   ├── admin/               ⏳ Step 4 — admin panel (users, content)
│   └── learning-portal/     ⏳ Step 6 — student portal
├── services/
│   ├── auth-service/        ⏳ Step 3 — FastAPI, owns `users` table
│   ├── content-service/     ⏳ Step 3 — FastAPI, owns `content` DB
│   └── gateway/              ⏳ Step 7 — Nginx, single API entrypoint
├── packages/                 shared code (not yet used)
├── package.json
├── turbo.json
└── docker-compose.yml         ⏳ Step 8
```

## Status: Step 1 complete

`apps/landing` is the existing TechEdu marketing site, ported in and cleaned
up, with a **Login** button added next to **Book Free Call**, plus:

- `/login` — logs a user in, redirects to pending-approval, rejected message,
  or (once approved) the learning portal
- `/signup` — creates a pending account
- `/pending-approval` — shown while waiting on admin approval

These pages call `auth-service` through `src/lib/auth.ts`, which isn't built
yet (Step 3) — so login/signup will fail against a real backend until then.
UI and routing are fully wired and ready to connect.

## Running the landing app locally (for now)

```bash
cd apps/landing
cp .env.example .env.local
npm install
npm run dev
```

Visit http://localhost:3000. `/login` and `/signup` render correctly but
requests will fail until auth-service exists.

## Next steps

- Step 2: finish scaffolding `apps/admin`, `apps/learning-portal`
- Step 3: build `auth-service` and `content-service` (FastAPI + MySQL)
- Step 4–6: build out Admin Panel and Learning Portal
- Step 7: wire the gateway + shared JWT auth
- Step 8: `docker-compose.yml` for local dev, later ported to Kubernetes
