#!/usr/bin/env bash
# Triggers the daily domain expiry check. Used by the Coolify scheduled task (see README.md),
# which runs this inside the app container, so localhost is reachable by default.
set -euo pipefail

SITE_URL="${SITE_URL:-http://localhost:3000}"
: "${CRON_SECRET:?Set CRON_SECRET to match the app's environment variable}"

curl --fail --silent --show-error \
  -H "Authorization: Bearer ${CRON_SECRET}" \
  "${SITE_URL%/}/api/cron/check-domains"
