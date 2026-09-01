#!/usr/bin/env bash
set -euo pipefail

# Where the services are running (override with env vars if different)
AUTH_URL="${AUTH_URL:-http://localhost:8000}"
CONTENT_URL="${CONTENT_URL:-http://localhost:8001}"

# Your admin credentials (must match what's in auth-service's .env)
ADMIN_EMAIL="${ADMIN_EMAIL:?Set ADMIN_EMAIL env var first}"
ADMIN_PASSWORD="${ADMIN_PASSWORD:?Set ADMIN_PASSWORD env var first}"

echo "Logging in as $ADMIN_EMAIL at $AUTH_URL ..."
LOGIN_RESPONSE=$(curl -s -X POST "$AUTH_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$ADMIN_EMAIL\", \"password\": \"$ADMIN_PASSWORD\"}")

TOKEN=$(python3 -c "import sys, json; print(json.loads(sys.argv[1]).get('access_token') or '')" "$LOGIN_RESPONSE")

if [ -z "$TOKEN" ]; then
  echo "Login failed. Response was:"
  echo "$LOGIN_RESPONSE"
  exit 1
fi
echo "Got admin token."

create_module() {
  local title="$1" description="$2" order="$3"
  curl -s -X POST "$CONTENT_URL/admin/modules" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"title\": \"$title\", \"description\": \"$description\", \"order\": $order}"
}

create_resource() {
  local module_id="$1" type="$2" title="$3" url="$4" order="$5"
  curl -s -X POST "$CONTENT_URL/admin/modules/$module_id/resources" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"type\": \"$type\", \"title\": \"$title\", \"url\": \"$url\", \"order\": $order}"
}

extract_id() {
  python3 -c "import sys, json; print(json.loads(sys.argv[1])['id'])" "$1"
}

echo "Creating Module 1: Linux Basic ..."
M1=$(create_module "Linux Basic" "Introduction to Linux fundamentals" 1)
M1_ID=$(extract_id "$M1")
echo "  -> module id $M1_ID"
create_resource "$M1_ID" "video" "Linux Basic - Video" \
  "https://player.vimeo.com/video/845782524?h=116b23a01c" 1 > /dev/null
create_resource "$M1_ID" "doc" "Linux Basic - Notes" \
  "https://docs.google.com/document/d/1AmcJbBJS2MBcqvDN81hvu-KKfFY3p86XskX3t70OvIY/edit?usp=sharing" 2 > /dev/null
echo "  -> added video + doc resources"

echo "Creating Module 2: Linux Advanced ..."
M2=$(create_module "Linux Advanced" "Advanced Linux administration" 2)
M2_ID=$(extract_id "$M2")
echo "  -> module id $M2_ID"
create_resource "$M2_ID" "video" "Linux Advanced - Video" \
  "https://player.vimeo.com/video/847844671?h=d8261adc2a" 1 > /dev/null
create_resource "$M2_ID" "doc" "Linux Advanced - Notes" \
  "https://docs.google.com/document/d/1a3QLUld-lUt1mQ2Dys7qia4lwsgxIz_eqyTZOEjw8us/edit?usp=sharing" 2 > /dev/null
echo "  -> added video + doc resources"

echo ""
echo "Done. Verifying via GET $CONTENT_URL/modules ..."
curl -s "$CONTENT_URL/modules" -H "Authorization: Bearer $TOKEN" | python3 -m json.tool