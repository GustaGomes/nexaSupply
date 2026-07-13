# NexaSupply engineering guide

## Scope

This repository is a modular monorepo. Keep the deployable applications under `apps/` and
cross-cutting decisions under `docs/`. Do not introduce business rules during foundation work.

## Backend

- Use modern, strongly typed Python, FastAPI, Pydantic, SQLAlchemy 2 and explicit errors.
- Preserve the dependency direction: presentation -> application -> domain. Infrastructure
  implements interfaces owned by inner layers; the domain must not import frameworks.
- Validate every external input and never expose secrets in source, logs or error responses.
- Add integration tests for HTTP and persistence boundaries where mocks would hide wiring errors.
- Run Ruff, Pyright and Pytest before handing off changes.

## Frontend

- Use Angular standalone components with strict TypeScript.
- Prefer Signals for local/derived state and RxJS for asynchronous streams.
- Use typed reactive forms, PrimeNG, Tailwind CSS and accessible semantic markup.
- Keep components focused and avoid business logic in presentation code.
- Run ESLint, Prettier, the Angular compiler and tests before handing off changes.

## Delivery

- Document new environment variables in `.env.example`; never commit real credentials.
- Explain any new dependency, its maintenance cost and alternatives considered.
- Keep changes scoped, preserve compatibility and use Conventional Commits.

