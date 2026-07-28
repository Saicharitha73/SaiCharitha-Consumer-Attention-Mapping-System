import React, { useState } from 'react';
import { Search, Bell, User, RefreshCw, ChevronDown, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user, switchRole, logout } = useAuth();
  const navigate = useNavigate();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const roles = ['Admin', 'Store Manager', 'Retail Analyst', 'Marketing Manager'];

  return (
    <header className="h-16 bg-[#0F172A]/80 backdrop-blur-md border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Global Search Bar */}
      <div className="flex items-center gap-3 w-96">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search stores, shelves, SKU products, customer IDs..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center gap-4">
        {/* Live Dataset Telemetry Sync Indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>FastAPI Telemetry Online</span>
        </div>

        {/* Quick Role Switcher */}
        <div className="relative">
          <button
            onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-medium text-slate-300 transition-all"
          >
            <span>Role: <strong className="text-blue-400">{user?.role}</strong></span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {roleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-1.5 z-50">
              <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Switch Viewing Role (RBAC)
              </div>
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    switchRole(r);
                    setRoleDropdownOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs text-slate-300 hover:bg-slate-800/80 text-left transition"
                >
                  <span>{r}</span>
                  {user?.role === r && <Check className="w-3.5 h-3.5 text-blue-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Icon */}
        <button
          onClick={() => navigate('/notifications')}
          className="relative p-2 text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 rounded-xl transition"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center border-2 border-[#0F172A]">
            3
          </span>
        </button>

        {/* User Profile Avatar */}
        <div className="relative">
          <button
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-xl hover:bg-slate-800/50 transition"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-xs text-white shadow-md">
              {user?.full_name?.charAt(0) || 'U'}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-semibold text-slate-200 leading-tight">{user?.full_name}</div>
              <div className="text-[10px] text-slate-400">{user?.email}</div>
            </div>
          </button>

          {userDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-1.5 z-50">
              <button
                onClick={() => { navigate('/profile'); setUserDropdownOpen(false); }}
                className="w-full px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 text-left transition"
              >
                Profile & API Keys
              </button>
              <button
                onClick={() => { navigate('/settings'); setUserDropdownOpen(false); }}
                className="w-full px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 text-left transition"
              >
                Settings & Permissions
              </button>
              <div className="border-t border-slate-800 my-1"></div>
              <button
                onClick={() => { logout(); navigate('/login'); }}
                className="w-full px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 text-left transition"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
