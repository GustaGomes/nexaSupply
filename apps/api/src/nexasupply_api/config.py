from functools import lru_cache
from typing import Literal

from pydantic import AnyHttpUrl, Field, PostgresDsn
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Validated API configuration loaded from environment variables."""

    model_config = SettingsConfigDict(env_prefix="API_", extra="ignore")

    environment: Literal["development", "test", "production"] = "development"
    database_url: PostgresDsn = PostgresDsn(
        "postgresql+psycopg://nexasupply:change-me-for-local-development@localhost:5432/nexasupply"
    )
    cors_origins: list[AnyHttpUrl] = Field(
        default_factory=lambda: [AnyHttpUrl("http://localhost:4200")]
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()
