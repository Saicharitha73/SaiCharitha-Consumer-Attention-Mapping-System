from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# Auth schemas
class UserLogin(BaseModel):
    email: str
    password: str

class UserRegister(BaseModel):
    email: str
    password: str
    full_name: str
    role: Optional[str] = "Store Manager"

class UserOut(BaseModel):
    id: int
    email: str
    full_name: str
    role: str
    is_active: bool
    created_at: datetime
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserOut

# Store schemas
class StoreBase(BaseModel):
    name: str
    city: str
    address: Optional[str] = None
    number_of_shelves: Optional[int] = 0
    active_cameras: Optional[int] = 0
    visitor_count: Optional[int] = 0
    status: Optional[str] = "Active"

class StoreCreate(StoreBase):
    pass

class StoreOut(StoreBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

# Shelf schemas
class ShelfBase(BaseModel):
    store_id: int
    shelf_code: str
    category: str
    product_count: Optional[int] = 0
    attention_score: Optional[float] = 0.0
    occupancy_percentage: Optional[float] = 0.0
    camera_id: Optional[int] = None
    visibility_score: Optional[float] = 85.0
    shelf_ranking: Optional[int] = 1

class ShelfCreate(ShelfBase):
    pass

class ShelfOut(ShelfBase):
    id: int
    class Config:
        from_attributes = True

# Camera schemas
class CameraBase(BaseModel):
    store_id: int
    name: str
    location: str
    status: Optional[str] = "Online"
    ip_address: Optional[str] = None
    stream_url: Optional[str] = None
    health_status: Optional[str] = "Good"
    active_detections_count: Optional[int] = 0

class CameraCreate(CameraBase):
    pass

class CameraOut(CameraBase):
    id: int
    class Config:
        from_attributes = True

# Product schemas
class ProductBase(BaseModel):
    shelf_id: int
    name: str
    brand: str
    category: str
    price: Optional[float] = 0.0
    stock_status: Optional[str] = "In Stock"
    recognition_confidence: Optional[float] = 95.0
    views_count: Optional[int] = 0
    pickups_count: Optional[int] = 0
    purchases_count: Optional[int] = 0
    attention_score: Optional[float] = 0.0

class ProductCreate(ProductBase):
    pass

class ProductOut(ProductBase):
    id: int
    class Config:
        from_attributes = True

# Customer schemas
class CustomerOut(BaseModel):
    id: int
    store_id: int
    customer_code: str
    entry_time: datetime
    exit_time: Optional[datetime] = None
    current_zone: str
    dwell_time_seconds: int
    attention_score: float
    journey_json: Optional[str] = None
    class Config:
        from_attributes = True

# Heatmap schema
class HeatmapPointOut(BaseModel):
    id: int
    store_id: int
    zone_name: str
    x_coord: float
    y_coord: float
    intensity: float
    class Config:
        from_attributes = True

# Notification schema
class NotificationOut(BaseModel):
    id: int
    store_id: Optional[int] = None
    title: str
    message: str
    type: str
    severity: str
    is_read: bool
    created_at: datetime
    class Config:
        from_attributes = True

# Report schema
class ReportOut(BaseModel):
    id: int
    title: str
    report_type: str
    date_range: str
    generated_by: str
    file_url: Optional[str] = None
    created_at: datetime
    class Config:
        from_attributes = True

# Analytics Summary schema
class DashboardAnalyticsOut(BaseModel):
    total_stores: int
    active_cameras: int
    active_customers: int
    products_detected: int
    avg_attention_score: float
    avg_dwell_time_minutes: float
    total_product_pickups: int
    overall_engagement_score: float
    daily_visitors: List[dict]
    hourly_traffic: List[dict]
    product_distribution: List[dict]
    store_comparison: List[dict]
    shelf_engagement: List[dict]
    camera_health_summary: List[dict]
    recent_alerts: List[NotificationOut]
    ai_recommendations: List[dict]
