# TechEdu LMS

Monorepo for the TechEdu learning platform. Turborepo + npm workspaces for
the frontends, FastAPI microservices for the backend, MySQL for storage,
Nginx as the API gateway, OpenTelemetry + Grafana for observability.

## Quickest way to run the whole thing: Docker Compose

cp .env.example .env
# edit .env: at minimum set real values for MYSQL_ROOT_PASSWORD,
# MYSQL_PASSWORD, JWT_SECRET (openssl rand -hex 32), and ADMIN_PASSWORD

docker compose up --build

- Landing: http://localhost:3000
- Admin panel: http://localhost:3001
- Learning portal: http://localhost:3002
- API gateway: http://localhost:8080/api

To stop: docker compose down (add -v to also wipe the MySQL volume).

## Running locally without Docker

./scripts/dev.sh

## Observability

docker compose -f docker-compose.observability.yml up -d
