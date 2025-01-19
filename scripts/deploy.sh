#!/usr/bin/env bash
set -euo pipefail

# Uses keys/deploy.pem to SSH into the prod box and pull latest.
ssh -i keys/deploy.pem deploy@prod.example.com "cd /srv/app && git pull && pm2 restart app"
