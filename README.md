# SaiCharitha Consumer Attention Mapping System

This repository contains a FastAPI backend and a Vite React frontend for consumer attention mapping.

# 🏗️ System Architecture

```text
                                      AI-Powered Smart Retail Operations Platform

┌──────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                        DATA SOURCES                                                  │
├──────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                      │
│  📹 CCTV Cameras        📦 SKU-110K        🛒 RPC Dataset        👥 COCO Dataset        📊 Traffic Dataset │
│      │                     │                  │                     │                     │           │
└──────┼─────────────────────┴──────────────────┴─────────────────────┴─────────────────────┴───────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                DATA PREPROCESSING LAYER                                              │
├──────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                      │
│  OpenCV Video Processing                                                                             │
│  Image Preprocessing                                                                                 │
│  Annotation Parsing                                                                                  │
│  Dataset Cleaning                                                                                    │
│                                                                                                      │
└──────────────────────────────────────────────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                      AI ENGINE                                                       │
├──────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                      │
│  YOLOv8 Object Detection                                                                             │
│      ├── Person Detection                                                                            │
│      ├── Product Detection                                                                           │
│      ├── Shelf Detection                                                                             │
│      └── Shopping Cart Detection                                                                     │
│                                                                                                      │
│  ByteTrack / DeepSORT                                                                                │
│      ├── Multi-Object Tracking                                                                       │
│      ├── Customer ID Assignment                                                                      │
│      └── Movement Tracking                                                                           │
│                                                                                                      │
│  Behavior Analytics                                                                                  │
│      ├── Dwell Time                                                                                  │
│      ├── Queue Detection                                                                             │
│      ├── Heatmap Generation                                                                          │
│      ├── Shelf Attention Analysis                                                                    │
│      ├── Customer Journey Analysis                                                                   │
│      └── Footfall Analytics                                                                          │
│                                                                                                      │
└──────────────────────────────────────────────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                              AI RECOMMENDATION ENGINE                                                │
├──────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                      │
│  Rule-Based Intelligence                                                                             │
│                                                                                                      │
│  Example Recommendations                                                                             │
│  • Restock Empty Shelf                                                                               │
│  • Open New Checkout Counter                                                                         │
│  • Rearrange Products                                                                                │
│  • Fix Camera                                                                                        │
│  • Clean Display Area                                                                                │
│  • Refill Promotional Shelf                                                                          │
│                                                                                                      │
└──────────────────────────────────────────────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 FASTAPI BACKEND                                                      │
├──────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                      │
│  Authentication                                                                                      │
│  User Management                                                                                     │
│  Recommendation APIs                                                                                 │
│  Task APIs                                                                                           │
│  Analytics APIs                                                                                      │
│  Notification APIs                                                                                   │
│                                                                                                      │
└──────────────────────────────────────────────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                     DATABASE                                                         │
├──────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                      │
│ PostgreSQL                                                                                           │
│                                                                                                      │
│ • Users                                                                                              │
│ • Stores                                                                                             │
│ • Shelves                                                                                            │
│ • Products                                                                                           │
│ • Cameras                                                                                            │
│ • AI Recommendations                                                                                 │
│ • Tasks                                                                                              │
│ • Notifications                                                                                      │
│ • Analytics                                                                                          │
│                                                                                                      │
└──────────────────────────────────────────────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                  REACT FRONTEND                                                      │
├──────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                      │
│ Authentication                                                                                        │
│ • Google OAuth                                                                                       │
│ • GitHub OAuth                                                                                       │
│ • Microsoft OAuth                                                                                    │
│ • Email & Password                                                                                   │
│                                                                                                      │
│ Role-Based Dashboard                                                                                 │
│ • Administrator                                                                                      │
│ • Store Manager                                                                                      │
│ • Store Worker                                                                                       │
│ • Retail Analyst                                                                                     │
│                                                                                                      │
└──────────────────────────────────────────────────────────────────────────────────────────────────────┘
       │
       ├──────────────────────────────┬───────────────────────────────┐
       │                              │                               │
       ▼                              ▼                               ▼

┌──────────────────────┐     ┌──────────────────────┐     ┌──────────────────────┐
│   MANAGER DASHBOARD  │     │   WORKER DASHBOARD   │     │  ADMIN DASHBOARD     │
├──────────────────────┤     ├──────────────────────┤     ├──────────────────────┤
│                      │     │                      │     │                      │
│ AI Recommendations   │     │ Assigned Tasks       │     │ User Management      │
│ Store Analytics      │     │ Notifications        │     │ Store Management     │
│ Queue Monitoring     │     │ Task Progress        │     │ Camera Management    │
│ Assign Tasks         │     │ Upload Evidence      │     │ System Settings      │
│ Worker Performance   │     │ Complete Tasks       │     │ Analytics            │
│ Reports              │     │                      │     │                      │
│ Notifications        │     │                      │     │                      │
└──────────┬───────────┘     └──────────┬───────────┘     └──────────────────────┘
           │                            │
           ▼                            │
      Assign Task                       │
           │                            │
           └──────────────┬─────────────┘
                          ▼
                Task Execution
                          │
                          ▼
               Upload Completion
                          │
                          ▼
               YOLO AI Verification
                          │
                          ▼
            Recommendation Status Updated
                          │
                          ▼
          Dashboard & Analytics Refreshed
```

---

# 🔄 Complete Workflow

```text
CCTV Camera
      │
      ▼
OpenCV Video Processing
      │
      ▼
YOLOv8 Detection
      │
      ▼
ByteTrack Tracking
      │
      ▼
Behavior Analytics
      │
      ▼
AI Recommendation Engine
      │
      ▼
Manager Dashboard
      │
Assign Task
      │
Worker Dashboard
      │
Complete Task
      │
Upload Evidence
      │
YOLO Verification
      │
Database Updated
      │
Dashboard Updated
```

---

# 🛠 Technology Stack

| Layer | Technologies |
|--------|--------------|
| **Frontend** | React, Vite, Tailwind CSS, shadcn/ui, Framer Motion, Apache ECharts |
| **Backend** | FastAPI, SQLAlchemy, JWT Authentication |
| **Database** | PostgreSQL |
| **Computer Vision** | YOLOv8, OpenCV |
| **Object Tracking** | ByteTrack / DeepSORT |
| **AI Analytics** | Pandas, NumPy |
| **Authentication** | Google OAuth, GitHub OAuth, Microsoft OAuth, JWT |
| **Deployment** | Docker, GitHub Actions, AWS / Azure |


