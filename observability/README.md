# Observability (OpenTelemetry + Grafana)

Local tracing + metrics stack: auth-service / content-service → OTel Collector
→ Prometheus (metrics) + Tempo (traces) → Grafana.

Standalone from the main app stack (docker-compose.yml, coming in Step 8) —
run it independently whenever you want observability, on demand.

## Run it

docker compose -f docker-compose.observability.yml up -d

Open http://localhost:3003 — Grafana, no login required (anonymous admin
access is enabled for local dev only — see the security note below).
Prometheus and Tempo are pre-wired as data sources automatically.

## Turn on telemetry in the services

By default, auth-service and content-service send zero telemetry —
completely silent, zero overhead. To enable, add this to each service's .env:

OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318

Restart the service, generate some traffic. Within a few seconds:
- Traces in Grafana → Explore → Tempo (search by service name)
- Metrics in Grafana → Explore → Prometheus

## Security note

GF_AUTH_ANONYMOUS_ENABLED=true is for local dev convenience only. Never
deploy this configuration as-is anywhere reachable outside your own machine.

## Stopping it

docker compose -f docker-compose.observability.yml down