# Observability agent (Grafana Alloy)

Runs on this VM as part of the main docker-compose.yml stack. Collects
metrics and traces from auth-service/content-service (via OTLP) and
logs from every container on this VM (via the Docker socket), then ships
all of it to your central/master Grafana stack. This container stores
nothing long-term — it's a forwarder, not a backend.

This replaces the old local-only docker-compose.observability.yml stack
for anything you actually deploy — that file still exists and still
works for pure local dev without a master reachable, but it's a
separate, disconnected setup. The agent here is what talks to your
real master.

## Setup

1. Get these values from whoever manages your master Grafana stack (or
   from Grafana Cloud's dashboard — it has a dedicated "Connections >
   Add new connection > Alloy" page that hands you all of these
   pre-filled):
   - A Tempo (or OTLP-compatible) endpoint + username/password for traces
   - A Prometheus/Mimir remote_write URL + username/password for metrics
   - A Loki push URL + username/password for logs

2. Fill these into the root .env file:
   REMOTE_TEMPO_OTLP_ENDPOINT=...
   REMOTE_TEMPO_USERNAME=...
   REMOTE_TEMPO_PASSWORD=...
   REMOTE_PROMETHEUS_URL=...
   REMOTE_PROMETHEUS_USERNAME=...
   REMOTE_PROMETHEUS_PASSWORD=...
   REMOTE_LOKI_URL=...
   REMOTE_LOKI_USERNAME=...
   REMOTE_LOKI_PASSWORD=...

3. That's it — docker compose up already includes this service. Both
   backend services are already pointed at it.

If you leave the REMOTE_* values blank, the agent starts fine and just
has nowhere to send data — harmless, no crash, no impact on the rest
of the stack. Fill them in whenever your master is ready.

## Verifying it's working

docker compose logs observability-agent

## What gets shipped

- Metrics + traces: from auth-service and content-service only
- Logs: every container on this VM, labeled with `container` name
