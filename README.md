# NexaSupply

Foundation monorepo for the NexaSupply web platform. This stage contains an Angular frontend, a
FastAPI backend and PostgreSQL. The worker and MCP server directories are placeholders only.

## Requirements

The recommended path requires Docker Engine with Docker Compose v2. Local development without
containers additionally requires Python 3.12-3.14, Node.js 22, npm and GNU Make (optional).

## Start with Docker

1. Create the local environment file:

   ```bash
   cp .env.example .env
   ```

2. Change the example PostgreSQL password in `.env`. It is intentionally not a real credential.
3. Build and start the stack:

   ```bash
   docker compose up --build
   ```

4. Open the web app at <http://localhost:4200> and the API documentation at
   <http://localhost:8000/docs>.
5. Verify health:

   ```bash
   curl http://localhost:8000/health
   # {"status":"ok"}
   ```

Stop the stack with `docker compose down`. Add `--volumes` only when you intentionally want to
delete local PostgreSQL data.

## Environment variables

All supported variables are documented in `.env.example`:

- `POSTGRES_*` configures the database container;
- `API_PORT` and `WEB_PORT` configure host ports;
- `API_ENVIRONMENT`, `API_DATABASE_URL` and the JSON list `API_CORS_ORIGINS` are validated by
  Pydantic Settings;
- `WEB_API_URL` is written to a public runtime configuration when the Angular server starts.

Do not put production credentials in `.env.example` or commit a local `.env`.

## Local development

Install dependencies:

```bash
python -m pip install -e "apps/api[dev]"
cd apps/web && npm install
```

Run the API from the repository root:

```bash
uvicorn nexasupply_api.main:app --app-dir apps/api/src --reload
```

Run the web app from `apps/web`:

```bash
npm start
```

## Quality checks

With Make installed, `make check` runs every check. Equivalent commands are:

```bash
python -m ruff check apps/api
python -m pyright apps/api
python -m pytest apps/api
cd apps/web && npm run lint
cd apps/web && npm run format:check
cd apps/web && npm run typecheck
cd apps/web && npm test -- --watch=false
```

The health test uses the real FastAPI ASGI application over HTTP transport. Database connectivity
is not part of process liveness and will be covered by persistence integration tests when the first
database-backed use case is introduced.

## Dependency rationale

- `pydantic-settings` validates environment configuration; plain `os.environ` lacks typed parsing.
- `psycopg` is SQLAlchemy's PostgreSQL driver; the standard library has no PostgreSQL driver.
- `httpx` drives integration requests directly through ASGI; FastAPI's testing support relies on it.
- PrimeNG and Tailwind are mandated UI foundations; Angular alone does not provide their component
  suite or utility styling. PrimeIcons supports accessible visual cues in PrimeNG components.
- ESLint, Prettier, Ruff, Pyright, Pytest and Vitest are development-only quality tools. They add
  update overhead but provide automated consistency and regression detection. Framework-native
  defaults and manual review were considered but do not satisfy the required checks.

Versions are constrained to compatible major releases so routine patches can be consumed without
silently crossing framework migration boundaries.
