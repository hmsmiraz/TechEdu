#!/usr/bin/env bash
# Runs every TechEdu LMS service locally with a single command.
# Ctrl+C stops all of them together.
#
# Requires each Python service's venv to already exist (see its README).
# Node apps are started via `npm run dev` and need `npm install` run once
# at the repo root first.

set -uo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

pids=()
used_ports=()

cleanup() {
  echo ""
  echo "Stopping all services..."
  for pid in "${pids[@]:-}"; do
    kill "$pid" 2>/dev/null
  done
  # Belt-and-suspenders: uvicorn --reload spawns a child worker process whose
  # PID isn't always the same one `$!` captures through the subshell/pipe
  # used for log prefixing below. Make sure nothing lingers on our ports.
  for port in "${used_ports[@]:-}"; do
    pkill -f "uvicorn app.main:app --reload --port $port" 2>/dev/null
  done
  wait 2>/dev/null
  echo "All stopped."
}
trap cleanup EXIT INT TERM

run_python_service() {
  local name="$1" dir="$2" port="$3"
  if [ ! -d "$dir/venv" ]; then
    echo "[$name] SKIPPED — no venv found at $dir/venv"
    echo "         Set it up first: cd $dir && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt"
    return
  fi
  if [ ! -f "$dir/.env" ]; then
    echo "[$name] SKIPPED — no .env found at $dir/.env (cp .env.example .env first)"
    return
  fi
  used_ports+=("$port")
  (
    cd "$dir" || exit 1
    # shellcheck disable=SC1091
    source venv/bin/activate
    exec uvicorn app.main:app --reload --port "$port" 2>&1 | sed -u "s/^/[$name] /"
  ) &
  pids+=("$!")
  echo "[$name] starting on http://localhost:$port (pid $!)"
}

run_node_service() {
  local name="$1" dir="$2"
  if [ ! -d "$dir/node_modules" ] && [ ! -d "$ROOT_DIR/node_modules" ]; then
    echo "[$name] SKIPPED — dependencies not installed. Run 'npm install' at the repo root first."
    return
  fi
  (
    cd "$dir" || exit 1
    exec npm run dev 2>&1 | sed -u "s/^/[$name] /"
  ) &
  pids+=("$!")
  echo "[$name] starting (pid $!)"
}

echo "Starting TechEdu LMS — press Ctrl+C to stop everything"
echo ""

run_python_service "auth-service"    "$ROOT_DIR/services/auth-service"    8000
run_python_service "content-service" "$ROOT_DIR/services/content-service" 8001
run_node_service   "landing"         "$ROOT_DIR/apps/landing"
# Uncomment once these apps exist (Steps ahead):
# run_node_service "admin"            "$ROOT_DIR/apps/admin"
# run_node_service "learning-portal"  "$ROOT_DIR/apps/learning-portal"

echo ""
wait