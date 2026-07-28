import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Store,
  Layers,
  Camera,
  Package,
  Users,
  BarChart3,
  Flame,
  FileText,
  Bell,
  Settings,
  UserCircle,
  Eye,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navigationItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Stores', path: '/stores', icon: Store },
  { name: 'Shelves', path: '/shelves', icon: Layers },
  { name: 'Cameras', path: '/cameras', icon: Camera },
  { name: 'Products', path: '/products', icon: Package },
  { name: 'Customers', path: '/customers', icon: Users },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Heatmaps', path: '/heatmaps', icon: Flame },
  { name: 'Reports', path: '/reports', icon: FileText },
  { name: 'Notifications', path: '/notifications', icon: Bell },
  { name: 'Settings', path: '/settings', icon: Settings },
  { name: 'Profile', path: '/profile', icon: UserCircle },
];

export default function Sidebar() {
  const { user } = useAuth();

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'Admin': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Store Manager': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Retail Analyst': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Marketing Manager': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <aside className="w-64 bg-[#0F172A]/90 border-r border-slate-800 flex flex-col h-screen sticky top-0 backdrop-blur-xl z-30">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
          <Eye className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-slate-100 tracking-wide text-base leading-tight">RetaiLVision AI</h1>
          <p className="text-[11px] text-blue-400 font-medium">Attention Intelligence v2.0</p>
        </div>
      </div>

      {/* Role Indicator Banner */}
      <div className="mx-4 mt-4 p-2.5 rounded-lg border bg-slate-900/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-semibold text-slate-300">Active Role</span>
        </div>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getRoleBadgeColor(user?.role)}`}>
          {user?.role || 'Guest'}
        </span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 custom-scrollbar">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer info */}
      <div className="p-4 border-t border-slate-800 text-[11px] text-slate-500 text-center">
        Milestone 1 • YOLOv8 + DeepSORT
      </div>
    </aside>
  );
}
