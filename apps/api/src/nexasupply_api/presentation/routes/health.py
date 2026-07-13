from typing import Literal

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(tags=["health"])


class HealthResponse(BaseModel):
    status: Literal["ok"]


@router.get("/health", response_model=HealthResponse)
async def health() -> HealthResponse:
    """Report API process availability without leaking configuration."""

    return HealthResponse(status="ok")

