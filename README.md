# SaiCharitha Consumer Attention Mapping System

This repository contains a FastAPI backend and a Vite React frontend for consumer attention mapping.

## Local setup
Architecture 
                             STORE

               CCTV Cameras (Live Video)
                        │
                        ▼
                 OpenCV Video Capture
                        │
          Extract Frames (30 FPS / Configurable)
                        │
                        ▼
                YOLOv8 Object Detection
        ┌───────────────┼────────────────┐
        │               │                │
        ▼               ▼                ▼
   Detect People   Detect Products   Detect Shelves
        │               │                │
        └───────────────┼────────────────┘
                        ▼
          ByteTrack Multi-Object Tracking
                        │
        Assign Unique IDs to Customers
                        │
                        ▼
          Customer Behaviour Analytics
        ┌───────────┬────────────┬─────────────┐
        │           │            │             │
        ▼           ▼            ▼             ▼
   Dwell Time   Heatmaps   Queue Analysis  Shelf Visits
                        │
                        ▼
             AI Recommendation Engine
                        │
        ┌───────────────┼────────────────┐
        ▼               ▼                ▼
 AI Alert        Store Insight     Task Suggestion
                        │
                        ▼
              Manager Dashboard
                        │
         Reviews AI Recommendation
                        │
         Assigns Task to Worker
                        │
                        ▼
              Worker Dashboard
                        │
      Accept → Start → Complete Task
                        │
                        ▼
         Worker Uploads Completion Image
                        │
                        ▼
          YOLO AI Verification Engine
                        │
       Verify if Task is Actually Done
                        │
                        ▼
          Update Database & Dashboard
                        │
                        ▼
            Analytics & Reports Updated

### Backend
```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```powershell
cd frontend
npm install
npm run dev
```

## GitHub repository
Remote: https://github.com/Saicharitha73/SaiCharitha-Consumer-Attention-Mapping-System


