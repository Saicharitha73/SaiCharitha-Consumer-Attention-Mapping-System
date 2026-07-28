import React, { useState } from 'react';
import { UserCircle, Key, ShieldCheck, Mail, Lock, Copy, Check } from 'lucide-react';
import Breadcrumbs from '../../components/layout/Breadcrumbs';
import { useAuth } from '../../context/AuthContext';

export default function ProfilePage() {
  const { user, token } = useAuth();
  const [copied, setCopied] = useState(false);

  const copyToken = () => {
    navigator.clipboard.writeText(token || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <Breadcrumbs title="User Profile & API Security Credentials" subtitle="Manage your account profile, JWT access token, and security keys" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-2xl text-white shadow-xl shadow-blue-600/30 mb-4">
            {user?.full_name?.charAt(0) || 'U'}
          </div>
          <h3 className="text-base font-bold text-slate-100">{user?.full_name}</h3>
          <p className="text-xs text-slate-400 mt-0.5">{user?.email}</p>
          <span className="mt-3 text-[10px] font-bold px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
            {user?.role} Access Level
          </span>
        </div>

        {/* JWT Credentials View */}
        <div className="md:col-span-2 glass-panel rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <Key className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-slate-100 text-sm">Active JWT Access Token</h3>
          </div>

          <p className="text-xs text-slate-400 mb-3">
            Use this bearer token to authenticate external API calls to the FastAPI backend service.
          </p>

          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl font-mono text-[11px] text-slate-300 break-all relative">
            {token || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkByZXRhaWxhaS5jb20iLCJyb2xlIjoiQWRtaW4iLCJleHAiOjE3Nzg0NjA4MDB9'}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={copyToken}
              className="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-blue-500 text-blue-400 text-xs font-semibold rounded-xl flex items-center gap-2 transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Bearer Token'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
