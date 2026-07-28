import React, { useState } from 'react';
import { Eye, Lock, Mail, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@retailai.com');
  const [password, setPassword] = useState('admin123');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(email, password);
    if (res.success) {
      navigate('/');
    } else {
      setError(res.message || 'Invalid credentials');
    }
  };

  const handleDemoFill = (demoEmail, demoRole) => {
    setEmail(demoEmail);
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Glow Background Blobs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md glass-panel p-8 rounded-2xl border border-slate-800 shadow-2xl relative z-10">
        {/* Brand Logo Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-600/30 mb-3">
            <Eye className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">RetaiLVision AI</h1>
          <p className="text-xs text-slate-400 mt-1">Consumer Attention Intelligence • Milestone 1</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Work Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@retailai.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-800 bg-slate-900 text-blue-600 focus:ring-0"
              />
              <span>Remember Me</span>
            </label>
            <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Password reset instructions sent to admin."); }} className="text-blue-400 hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick RBAC Role Demo Presets */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Quick Login with Preset Role</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <button
              onClick={() => handleDemoFill('admin@retailai.com', 'Admin')}
              className="px-2.5 py-1.5 bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 rounded-lg text-slate-300 text-left transition"
            >
              👑 <strong className="text-purple-400">Admin</strong>
            </button>
            <button
              onClick={() => handleDemoFill('manager@retailai.com', 'Store Manager')}
              className="px-2.5 py-1.5 bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 rounded-lg text-slate-300 text-left transition"
            >
              🏬 <strong className="text-blue-400">Store Mgr</strong>
            </button>
            <button
              onClick={() => handleDemoFill('analyst@retailai.com', 'Retail Analyst')}
              className="px-2.5 py-1.5 bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 rounded-lg text-slate-300 text-left transition"
            >
              📊 <strong className="text-emerald-400">Analyst</strong>
            </button>
            <button
              onClick={() => handleDemoFill('marketing@retailai.com', 'Marketing Manager')}
              className="px-2.5 py-1.5 bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 rounded-lg text-slate-300 text-left transition"
            >
              📢 <strong className="text-amber-400">Marketing</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
