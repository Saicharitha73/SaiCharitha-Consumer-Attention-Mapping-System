import React from 'react';
import { Settings, ShieldCheck, Check, X, Server, Lock } from 'lucide-react';
import Breadcrumbs from '../../components/layout/Breadcrumbs';
import { useAuth } from '../../context/AuthContext';

export default function SettingsPage() {
  const { user } = useAuth();

  const rbacMatrix = [
    { module: "Dashboard Overview", admin: true, manager: true, analyst: true, marketing: true },
    { module: "Stores Management", admin: true, manager: true, analyst: "View Only", marketing: "View Only" },
    { module: "Shelves Management", admin: true, manager: true, analyst: "View Only", marketing: "View Only" },
    { module: "Products Catalog", admin: true, manager: true, analyst: true, marketing: "View Only" },
    { module: "Customer Telemetry", admin: true, manager: "View Only", analyst: true, marketing: "View Only" },
    { module: "Attention Analytics", admin: true, manager: true, analyst: true, marketing: true },
    { module: "Reports & PDF Exports", admin: true, manager: true, analyst: true, marketing: true },
    { module: "System Settings", admin: true, manager: "Limited", analyst: "Limited", marketing: "Limited" },
  ];

  return (
    <div>
      <Breadcrumbs title="System Settings & RBAC Permissions" subtitle="Role-based access matrix, FastAPI endpoints & computer vision parameters" />

      {/* RBAC Matrix */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-5 h-5 text-purple-400" />
          <h3 className="font-bold text-slate-100 text-sm">Role-Based Access Control (RBAC) Matrix</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900/60 border-b border-slate-800 text-slate-400 font-semibold">
                <th className="py-3 px-4">System Module</th>
                <th className="py-3 px-4 text-center">Admin</th>
                <th className="py-3 px-4 text-center">Store Manager</th>
                <th className="py-3 px-4 text-center">Retail Analyst</th>
                <th className="py-3 px-4 text-center">Marketing Manager</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {rbacMatrix.map((r, i) => (
                <tr key={i} className="hover:bg-slate-800/30 transition">
                  <td className="py-3 px-4 font-bold text-slate-100">{r.module}</td>
                  <td className="py-3 px-4 text-center font-semibold text-emerald-400">Full Access</td>
                  <td className="py-3 px-4 text-center font-medium">
                    {r.manager === true ? <span className="text-emerald-400 font-semibold">Full Access</span> : r.manager}
                  </td>
                  <td className="py-3 px-4 text-center font-medium">
                    {r.analyst === true ? <span className="text-emerald-400 font-semibold">Full Access</span> : r.analyst}
                  </td>
                  <td className="py-3 px-4 text-center font-medium">
                    {r.marketing === true ? <span className="text-emerald-400 font-semibold">Full Access</span> : r.marketing}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Tech Stack Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <Server className="w-4 h-4 text-blue-400" />
            <h4 className="font-bold text-slate-100 text-xs">FastAPI Backend Status</h4>
          </div>
          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex justify-between"><span>API Host:</span><span className="font-mono text-slate-400">http://localhost:8000/api/v1</span></div>
            <div className="flex justify-between"><span>JWT Auth Algorithm:</span><span className="font-mono text-slate-400">HS256 (HMAC-SHA256)</span></div>
            <div className="flex justify-between"><span>Token Expire:</span><span className="font-mono text-slate-400">24 Hours</span></div>
            <div className="flex justify-between"><span>SQLite Database:</span><span className="font-mono text-emerald-400">Connected & Seeded</span></div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-4 h-4 text-amber-400" />
            <h4 className="font-bold text-slate-100 text-xs">AI & Computer Vision Models</h4>
          </div>
          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex justify-between"><span>Object Detection:</span><span className="font-semibold text-purple-400">YOLOv8x SKU-110K</span></div>
            <div className="flex justify-between"><span>Multi-Object Tracking:</span><span className="font-semibold text-purple-400">DeepSORT</span></div>
            <div className="flex justify-between"><span>Customer Pose & Gaze:</span><span className="font-semibold text-purple-400">MediaPipe Mesh</span></div>
            <div className="flex justify-between"><span>Product Classification:</span><span className="font-semibold text-purple-400">RPC ResNet-50</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
