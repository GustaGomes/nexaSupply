# Architecture

NexaSupply starts as a modular monorepo with independently runnable web and API applications.
PostgreSQL is the only infrastructure dependency in this foundation stage.

The API follows layered boundaries:

- `domain`: framework-independent entities and rules (currently empty by design);
- `application`: use cases and ports (currently empty by design);
- `infrastructure`: database and external adapters;
- `presentation`: FastAPI HTTP routes and schemas.

The Angular application groups code into `core`, `features` and `shared`. Signals represent local
UI state; RxJS is used for HTTP streams. `worker` and `mcp-server` are reserved directories, not
deployable services in this stage.

