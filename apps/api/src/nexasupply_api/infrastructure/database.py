from sqlalchemy import Engine, create_engine

from nexasupply_api.config import Settings


def create_database_engine(settings: Settings) -> Engine:
    """Create the SQLAlchemy engine without opening a connection eagerly."""

    return create_engine(str(settings.database_url), pool_pre_ping=True)

