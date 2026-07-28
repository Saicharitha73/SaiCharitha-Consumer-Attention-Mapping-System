from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth, stores, shelves, cameras, products, customers, analytics, heatmaps, reports, notifications
)

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(stores.router, prefix="/stores", tags=["Stores"])
api_router.include_router(shelves.router, prefix="/shelves", tags=["Shelves"])
api_router.include_router(cameras.router, prefix="/cameras", tags=["Cameras"])
api_router.include_router(products.router, prefix="/products", tags=["Products"])
api_router.include_router(customers.router, prefix="/customers", tags=["Customers"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])
api_router.include_router(heatmaps.router, prefix="/heatmaps", tags=["Heatmaps"])
api_router.include_router(reports.router, prefix="/reports", tags=["Reports"])
api_router.include_router(notifications.router, prefix="/notifications", tags=["Notifications"])
