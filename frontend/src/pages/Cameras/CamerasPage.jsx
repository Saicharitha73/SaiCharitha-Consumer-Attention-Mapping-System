import React, { useEffect, useState } from 'react';
import { Camera, Radio, Wifi, ShieldAlert, Plus, RefreshCw } from 'lucide-react';
import Breadcrumbs from '../../components/layout/Breadcrumbs';
import CameraBoundingBoxCanvas from '../../components/canvas/CameraBoundingBoxCanvas';
import { camerasAPI } from '../../services/api';

export default function CamerasPage() {
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);

  useEffect(() => {
    async function loadCameras() {
      try {
        const res = await camerasAPI.getAll();
        setCameras(res.data);
        if (res.data.length > 0) setSelectedCamera(res.data[0]);
      } catch (err) {
        console.warn("API camera fetch fallback", err);
        const fallbackCams = [
          { id: 1, name: "Cam-FLG-01", location: "Aisle 1 - Beverages", status: "Online", ip_address: "192.168.1.101", stream_url: "rtsp://admin:pass@192.168.1.101:554/live", health_status: "Good", active_detections_count: 8 },
          { id: 2, name: "Cam-FLG-02", location: "Aisle 2 - Snacks", status: "Online", ip_address: "192.168.1.102", stream_url: "rtsp://admin:pass@192.168.1.102:554/live", health_status: "Good", active_detections_count: 5 },
          { id: 3, name: "Cam-FLG-03", location: "Promotional Endcap", status: "Online", ip_address: "192.168.1.103", stream_url: "rtsp://admin:pass@192.168.1.103:554/live", health_status: "Good", active_detections_count: 12 },
          { id: 4, name: "Cam-FLG-04", location: "Checkout Area 1", status: "Warning", ip_address: "192.168.1.104", stream_url: "rtsp://admin:pass@192.168.1.104:554/live", health_status: "Degrading", active_detections_count: 3 },
        ];
        setCameras(fallbackCams);
        setSelectedCamera(fallbackCams[0]);
      }
    }
    loadCameras();
  }, []);

  return (
    <div>
      <Breadcrumbs title="Camera Stream & Detection Matrix" subtitle="Real-time RTSP stream feeds with simulated YOLOv8 + DeepSORT bounding box tracking overlays" />

      {/* Main Focus Camera Feed Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <CameraBoundingBoxCanvas
            cameraName={selectedCamera?.name || "Cam-FLG-01"}
            cameraLocation={selectedCamera?.location || "Aisle 1 - Beverages"}
          />
        </div>

        {/* Selected Camera Specs & Telemetry */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div>
                <h3 className="font-bold text-slate-100 text-sm">{selectedCamera?.name}</h3>
                <p className="text-xs text-slate-400">{selectedCamera?.location}</p>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                selectedCamera?.status === 'Online' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              }`}>
                {selectedCamera?.status}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">IP Address:</span>
                <span className="font-mono">{selectedCamera?.ip_address}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">RTSP Stream:</span>
                <span className="font-mono text-[10px] text-blue-400 truncate max-w-[160px]">{selectedCamera?.stream_url}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Health Status:</span>
                <span className="font-semibold text-emerald-400">{selectedCamera?.health_status}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Active Bounding Boxes:</span>
                <span className="font-bold text-blue-400">{selectedCamera?.active_detections_count} Targets</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Model Pipeline:</span>
                <span className="font-semibold text-purple-400">YOLOv8x + MediaPipe</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">1080p @ 30 FPS</span>
            <button className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-blue-400 rounded-lg hover:border-blue-500 transition font-semibold">
              Re-calibrate Bounding Boxes
            </button>
          </div>
        </div>
      </div>

      {/* Camera Grid Thumbnails */}
      <h3 className="font-bold text-slate-100 text-sm mb-3">All Active Camera Streams ({cameras.length})</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {cameras.map((cam) => (
          <div
            key={cam.id}
            onClick={() => setSelectedCamera(cam)}
            className={`glass-panel rounded-xl p-4 border cursor-pointer transition ${
              selectedCamera?.id === cam.id
                ? 'border-blue-500 bg-blue-500/5 shadow-lg shadow-blue-500/10'
                : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-blue-400" />
                <span className="font-bold text-xs text-slate-200">{cam.name}</span>
              </div>
              <span className={`w-2 h-2 rounded-full ${cam.status === 'Online' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">{cam.location}</p>
            <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-800/60 pt-2">
              <span>{cam.active_detections_count} Targets</span>
              <span className="text-emerald-400 font-medium">{cam.health_status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
