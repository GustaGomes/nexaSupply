from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from nexasupply_api.config import Settings, get_settings
from nexasupply_api.presentation.routes.health import router as health_router


def create_app(settings: Settings | None = None) -> FastAPI:
    resolved_settings = settings or get_settings()
    application = FastAPI(title="NexaSupply API", version="0.1.0")
    application.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin).rstrip("/") for origin in resolved_settings.cors_origins],
        allow_credentials=False,
        allow_methods=["GET"],
        allow_headers=["Accept", "Content-Type"],
    )
    application.include_router(health_router)
    return application


app = create_app()
