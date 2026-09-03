# gateway (Nginx)

Single entrypoint for both backend services. Frontends call one origin
(this gateway) instead of hardcoding each service's port directly.

## Routing scheme

| Gateway path                               | Routes to                           |
|---------------------------------------------|--------------------------------------|
| POST /api/auth/*                             | auth-service /auth/*                |
| GET/PATCH/PUT/DELETE /api/admin/users/*        | auth-service /admin/users/*         |
| GET /api/modules*                             | content-service /modules*           |
| POST/PUT/DELETE /api/admin/modules/*           | content-service /admin/modules/*    |
| POST/PUT/DELETE /api/admin/resources/*         | content-service /admin/resources/*  |
| GET /health                                   | gateway's own health check          |
| GET /health/auth                              | auth-service /health passthrough    |
| GET /health/content                           | content-service /health passthrough |

Note both auth-service and content-service expose routes under
`/admin/...`, but they never collide here since the next path segment
(`users` vs `modules`/`resources`) always disambiguates which service
a request is for.

## Dynamic config

nginx.conf.template uses ${AUTH_SERVICE_HOST}, ${AUTH_SERVICE_PORT},
${CONTENT_SERVICE_HOST}, ${CONTENT_SERVICE_PORT} — substituted at
container startup via nginx's built-in template mechanism. Set these
env vars in docker-compose to point wherever the two services live.

## Run locally without Docker

Requires nginx and envsubst (from gettext-base) installed locally.

export AUTH_SERVICE_HOST=localhost
export AUTH_SERVICE_PORT=8000
export CONTENT_SERVICE_HOST=localhost
export CONTENT_SERVICE_PORT=8001

envsubst '${AUTH_SERVICE_HOST} ${AUTH_SERVICE_PORT} ${CONTENT_SERVICE_HOST} ${CONTENT_SERVICE_PORT}' \
  < nginx.conf.template > /tmp/gateway.conf

sudo nginx -c /tmp/gateway.conf -g "daemon off;"
