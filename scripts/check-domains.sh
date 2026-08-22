#!/usr/bin/env bash
# Triggers the daily domain expiry check. Used by the Coolify scheduled task (see README.md),
# which runs this inside the app container, so localhost is reachable by default.
set -euo pipefail

SITE_URL="${SITE_URL:-http://localhost:3000}"
: "${CRON_SECRET:?Set CRON_SECRET to match the deployed app environment variable}"

response=$(curl --silent --show-error --write-out '\nHTTP_STATUS:%{http_code}' \
  -H "Authorization: Bearer ${CRON_SECRET}" \
  "${SITE_URL%/}/api/cron/check-domains")

status="${response##*HTTP_STATUS:}"
body="${response%$'\n'HTTP_STATUS:*}"

echo "${body}"

if [[ "${status}" -lt 200 || "${status}" -ge 300 ]]; then
  exit 1
fi
