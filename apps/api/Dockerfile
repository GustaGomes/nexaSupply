FROM python:3.13-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

COPY apps/api/pyproject.toml ./pyproject.toml
COPY apps/api/src ./src
RUN python -m pip install --upgrade pip && python -m pip install -e .

EXPOSE 8000

CMD ["uvicorn", "nexasupply_api.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

