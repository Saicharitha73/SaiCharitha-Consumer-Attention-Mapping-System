from fastapi import APIRouter, Depends, Query
from typing import Optional
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.behavior_engine import BehaviorEngine
from app.services.heatmap_engine import HeatmapEngine
from app.services.product_scoring import ProductScoringEngine
from app.services.recommendation_engine import RecommendationEngine

router = APIRouter()

@router.get("/{video_id}")
def get_retail_intelligence_summary(
    video_id: int,
    db: Session = Depends(get_db)
):
    """
    Returns consolidated Retail Intelligence summary for Manager Dashboard.
    """
    behavior_engine = BehaviorEngine(db)
    heatmap_engine = HeatmapEngine(db)
    product_engine = ProductScoringEngine(db)
    rec_engine = RecommendationEngine(db)

    behavior_res = behavior_engine.analyze_video_behavior(video_id)
    heatmaps_res = heatmap_engine.generate_heatmaps(video_id)
    product_res = product_engine.compute_product_attractiveness(video_id)
    rec_res = rec_engine.generate_recommendations(video_id)

    total_shoppers = behavior_res["shopper_metrics"]["total_unique_shoppers"]
    avg_dwell = behavior_res["shopper_metrics"]["avg_dwell_time_sec"]
    max_dwell = behavior_res["shopper_metrics"]["max_dwell_time_sec"]
    total_attn = sum(z["attention_events"] for z in behavior_res["zone_analytics"])

    return {
        "video_id": video_id,
        "total_shoppers": total_shoppers,
        "avg_dwell_sec": avg_dwell,
        "max_dwell_sec": max_dwell,
        "total_attention_events": total_attn,
        "top_performing_zone": "Beverage Zone",
        "most_frequent_path": behavior_res["most_frequent_path"],
        "shopper_metrics": behavior_res["shopper_metrics"],
        "customer_journeys": behavior_res["customer_journeys"],
        "zone_analytics": behavior_res["zone_analytics"],
        "behavior_patterns": behavior_res["behavior_patterns"],
        "heatmaps": heatmaps_res,
        "product_rankings": product_res.get("product_rankings", []),
        "recommendations": rec_res
    }

@router.get("/zones/{video_id}/analytics")
def get_zone_analytics(video_id: int, db: Session = Depends(get_db)):
    """
    Returns zone traffic, dwell, and engagement comparisons.
    """
    behavior_engine = BehaviorEngine(db)
    res = behavior_engine.analyze_video_behavior(video_id)
    return res["zone_analytics"]
