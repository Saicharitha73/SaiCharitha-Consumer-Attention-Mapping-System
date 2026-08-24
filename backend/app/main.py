import sys
import os

# Ensure backend root and project root directory are on sys.path
backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
project_root = os.path.dirname(backend_dir)
ai_engine_dir = os.path.join(project_root, "ai-engine")

for d in [backend_dir, project_root, ai_engine_dir]:
    if d not in sys.path:
        sys.path.insert(0, d)


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.router import api_router
from sqlalchemy import text
from app.db.session import engine, Base

# Create tables
Base.metadata.create_all(bind=engine)

# Ensure columns exist on SQLite users table and seed D-Mart Superstore
with engine.connect() as conn:
    for col_def in [
        "ALTER TABLE users ADD COLUMN phone VARCHAR",
        "ALTER TABLE users ADD COLUMN is_email_verified BOOLEAN DEFAULT 0",
        "ALTER TABLE users ADD COLUMN is_phone_verified BOOLEAN DEFAULT 0"
    ]:
        try:
            conn.execute(text(col_def))
        except Exception:
            pass
    try:
        res = conn.execute(text("SELECT COUNT(*) FROM stores")).scalar()
        if res == 0:
            conn.execute(text("INSERT INTO stores (name, location, city, state, address, cameras_count, is_active) VALUES ('D-Mart Flagship Superstore', 'Powai', 'Mumbai', 'Maharashtra', 'D-Mart Central, Sector 15, Powai, Mumbai 400076', 24, 1)"))
    except Exception:
        pass
    conn.commit()



app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "message": "Welcome to Consumer Attention Mapping System API v2.0",
        "docs": "/docs",
        "health": "OK"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
