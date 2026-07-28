import React, { useEffect, useState } from 'react';
import { Bell, Check, AlertTriangle, Info, CheckCircle2, ShieldAlert } from 'lucide-react';
import Breadcrumbs from '../../components/layout/Breadcrumbs';
import { notificationsAPI } from '../../services/api';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifs();
  }, []);

  async function loadNotifs() {
    try {
      const res = await notificationsAPI.getAll();
      setNotifications(res.data);
    } catch (err) {
      console.warn("API notifications fallback", err);
      setNotifications([
        { id: 1, title: "High Attention Alert on Endcap A", message: "Eye-gaze attention score exceeded 92% threshold on Organic Cold Brew Coffee.", type: "success", severity: "low", is_read: false },
        { id: 2, title: "Low Stock Warning on Shelf B2", message: "Hydrating Shampoo stock dropped below 5 units. Reorder recommended.", type: "warning", severity: "medium", is_read: false },
        { id: 3, title: "Camera Cam-MET-03 Signal Degradation", message: "Frame rate dropped to 12 FPS. Frame analysis latency elevated.", type: "danger", severity: "high", is_read: false },
        { id: 4, title: "Abnormal Dwell Time Spike", message: "Customer dwell time in Aisle 2 exceeded 14 minutes. Check for aisle obstruction.", type: "info", severity: "medium", is_read: true },
        { id: 5, title: "System Health Normal", message: "YOLOv8 & DeepSORT tracking backend active with 98.4% uptime.", type: "info", severity: "low", is_read: true }
      ]);
    }
  }

  const markAsRead = async (id) => {
    try {
      await notificationsAPI.markRead(id);
      loadNotifs();
    } catch (err) {
      setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: true } : n));
    }
  };

  return (
    <div>
      <Breadcrumbs title="System Notifications & Alerts" subtitle="Threshold breach warnings, camera telemetry, and store operational alerts" />

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`glass-panel p-4 rounded-xl border flex items-start justify-between gap-4 transition ${
              n.is_read ? 'border-slate-800/60 opacity-75' : 'border-blue-500/30 bg-blue-500/5'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2.5 rounded-xl shrink-0 ${
                n.type === 'danger' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                n.type === 'warning' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                n.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                'bg-blue-500/10 text-blue-400 border border-blue-500/20'
              }`}>
                {n.type === 'danger' ? <ShieldAlert className="w-5 h-5" /> :
                 n.type === 'warning' ? <AlertTriangle className="w-5 h-5" /> :
                 n.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> :
                 <Info className="w-5 h-5" />}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-xs text-slate-100">{n.title}</h4>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase border ${
                    n.severity === 'high' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {n.severity}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1">{n.message}</p>
              </div>
            </div>

            {!n.is_read && (
              <button
                onClick={() => markAsRead(n.id)}
                className="px-3 py-1 bg-slate-900 border border-slate-800 text-blue-400 hover:border-blue-500 text-[11px] font-semibold rounded-lg shrink-0 transition"
              >
                Mark as Read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
