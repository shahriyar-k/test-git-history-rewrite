# secret-removal-poc

A deliberately-leaky toy repo used to exercise the `SECRETS_REMOVAL_PLAN.md`
playbook. The history contains a mix of:

- Plain code commits (no secrets)
- Commits that introduce a secret value inside a config or source file
- Mixed commits where a real code change lands alongside a secret
- Commits that add whole files which should not exist (`.env`, `*.pem`, `secrets.yml`)
- Multiple variants of the same secret (raw, quoted, base64)
- Single-purpose "secret-only" commits

Do NOT use any of these values anywhere — they are dummies.

## Run locally

```bash
npm install
npm start
```

Endpoints:
- `GET /healthz` — liveness
- `GET /readyz` — DB-backed readiness
- `GET /users/me` — current user (requires `Authorization: Bearer <jwt>`)
