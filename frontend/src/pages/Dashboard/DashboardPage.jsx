import React from 'react';
import { Eye, Users, TrendingUp, Sparkles, Camera, ArrowUpRight, BarChart3 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import AttentionHeatmapChart from '../../components/charts/AttentionHeatmapChart';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 font-sans">
      {/* Top Welcome Banner - Black Obsidian Theme */}
      <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-r from-zinc-900 via-black to-zinc-950 border border-zinc-800 shadow-2xl backdrop-blur-xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-zinc-700/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-zinc-800 text-zinc-300 border border-zinc-700 text-xs font-semibold rounded-full">
                Role: {user?.role || 'Admin'}
              </span>
              <span className="text-xs text-zinc-400 font-mono">Live Spatial Model v2.4</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
              Welcome back, {user?.full_name || 'Eleanor Vance'} 👋
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl">
              Consumer attention fixation across Store #101 (Flagship) is operating at <strong className="text-emerald-400">89.4 / 100 Gaze Index</strong> today.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/recommendations"
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs rounded-xl border border-zinc-700 shadow-lg transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>View AI Recommendations</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Top Overview KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Today's Visitors */}
        <div className="p-5 bg-zinc-950 border border-zinc-800/80 rounded-2xl space-y-3 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400 uppercase font-mono">Today's Visitors</span>
            <div className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-xl">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white">4,892</span>
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +14.2%
            </span>
          </div>
          <p className="text-[11px] text-zinc-500">Peak hour 1:00 PM (142 visits/10 min)</p>
        </div>

        {/* Card 2: Eye Fixation Rate */}
        <div className="p-5 bg-zinc-950 border border-zinc-800/80 rounded-2xl space-y-3 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400 uppercase font-mono">Eye Fixation Rate</span>
            <div className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-xl">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-zinc-200">84.2%</span>
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +6.8%
            </span>
          </div>
          <p className="text-[11px] text-zinc-500">Avg gaze duration: 3.4 seconds</p>
        </div>

        {/* Card 3: Active Cameras */}
        <div className="p-5 bg-zinc-950 border border-zinc-800/80 rounded-2xl space-y-3 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400 uppercase font-mono">Active Cameras</span>
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
              <Camera className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-emerald-400">12 / 12</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded">
              60 FPS
            </span>
          </div>
          <p className="text-[11px] text-zinc-500">0 latency drops across 4 aisles</p>
        </div>

        {/* Card 4: Sales Conversion */}
        <div className="p-5 bg-zinc-950 border border-zinc-800/80 rounded-2xl space-y-3 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-400 uppercase font-mono">Cart Touch Conversion</span>
            <div className="p-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-amber-400">41.4%</span>
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +3.2%
            </span>
          </div>
          <p className="text-[11px] text-zinc-500">2,025 product touches today</p>
        </div>
      </div>

      {/* SINGLE VISUALIZATION: Hourly Shelf Position Gaze Intensity Bar Graph (Full Width) */}
      <div className="w-full p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-4 backdrop-blur-xl shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-400" />
              Hourly Shelf Position Gaze Intensity Bar Graph
            </h2>
            <p className="text-xs text-zinc-400">Eye fixation score distribution per shelf position across operating hours</p>
          </div>
          <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-[10px] rounded-lg">
            ECharts Bar Graph
          </span>
        </div>
        <AttentionHeatmapChart height="400px" />
      </div>

      {/* AI RECOMMENDATIONS SECTION */}
      <div className="w-full p-6 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-4 backdrop-blur-xl shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            Top AI Placement Recommendations
          </h2>
          <Link to="/recommendations" className="text-xs text-zinc-300 hover:underline font-semibold">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-black border border-purple-500/30 rounded-xl space-y-1.5">
            <div className="flex items-center justify-between text-purple-300 font-bold">
              <span>1. Promote "Sparkling Lemonade 6-Pack" to Eye-Level</span>
              <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded text-[10px]">+28.4% Lift</span>
            </div>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              Currently placed on bottom shelf (Shelf 1). Gaze score is 14.6%, but has a 78% purchase intent once touched.
            </p>
          </div>

          <div className="p-4 bg-black border border-emerald-500/30 rounded-xl space-y-1.5">
            <div className="flex items-center justify-between text-emerald-300 font-bold">
              <span>2. Expand Endcap Promo A Display Width</span>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-[10px]">High Impact</span>
            </div>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              Endcap Promo A receives 3.2x higher gaze concentration during 5:00 PM - 7:00 PM peak hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
