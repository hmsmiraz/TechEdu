# content-service (FastAPI)

Owns modules and resources (Drive/Doc links). Verifies JWTs issued by
auth-service using the same shared JWT_SECRET — no network calls between
the two services.

## Run locally

python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

cp .env.example .env
# Edit .env: DATABASE_URL=sqlite:///./content_dev.db for local testing.
# JWT_SECRET MUST match auth-service's .env exactly.

uvicorn app.main:app --reload --port 8001

Visit http://localhost:8001/docs for interactive API docs.

## Endpoints
- GET /modules — list all modules with nested resources (any valid JWT)
- GET /modules/{id} — single module detail
- POST /admin/modules — create a module (admin only)
- PUT /admin/modules/{id} — update a module (admin only)
- DELETE /admin/modules/{id} — delete a module + its resources (admin only)
- POST /admin/modules/{id}/resources — add a resource (admin only)
- PUT /admin/resources/{id} — update a resource (admin only)
- DELETE /admin/resources/{id} — delete a resource (admin only)

## Seeding initial content
See seed.sh — logs in as admin via auth-service, then creates modules and
resources here. Run with:

ADMIN_EMAIL=... ADMIN_PASSWORD=... ./seed.sh