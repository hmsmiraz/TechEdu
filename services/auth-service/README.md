# auth-service (FastAPI)

Owns the `users` table. Signup, login, JWT issuing, admin user management.

## Run locally (no Docker/MySQL needed)

python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

cp .env.example .env
# Edit .env: for quick local testing, set DATABASE_URL=sqlite:///./auth_dev.db
# Generate a real JWT_SECRET: openssl rand -hex 32

export $(cat .env | xargs)
uvicorn app.main:app --reload --port 8000

Visit http://localhost:8000/docs for interactive API docs.

## Endpoints
- POST /auth/signup — create account (status: pending)
- POST /auth/login — returns {status, access_token?, detail?}
- GET /admin/users — list all users (admin only)
- PATCH /admin/users/{id}/approve — approve a pending user (admin only)
- PATCH /admin/users/{id}/reject — reject a user (admin only)
- PUT /admin/users/{id} — update name/email/role (admin only)
- DELETE /admin/users/{id} — delete a user (admin only)

## Testing against the landing app
The landing app expects NEXT_PUBLIC_API_BASE_URL to point at the gateway
(not built yet). Until the gateway exists, override it directly:

NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

(no /api prefix — that's added by the gateway later).