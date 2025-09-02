#!/bin/bash
set -e

# Replace the last line in pg_hba.conf with trust authentication
sed -i '$d' "$PGDATA/pg_hba.conf"
echo "host all all all trust" >> "$PGDATA/pg_hba.conf"

echo "Authentication configured for trust mode"
