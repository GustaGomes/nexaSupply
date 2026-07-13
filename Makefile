.PHONY: up down logs install lint typecheck test check

up:
	docker compose up --build

down:
	docker compose down

logs:
	docker compose logs -f

install:
	python -m pip install -e "apps/api[dev]"
	cd apps/web && npm install

lint:
	python -m ruff check apps/api
	cd apps/web && npm run lint
	cd apps/web && npm run format:check

typecheck:
	python -m pyright apps/api
	cd apps/web && npm run typecheck

test:
	python -m pytest apps/api
	cd apps/web && npm test -- --watch=false

check: lint typecheck test

