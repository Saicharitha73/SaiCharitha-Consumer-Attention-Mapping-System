import React from 'react';
import { BarChart3, TrendingUp, Eye, Clock, ShoppingBag } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import Breadcrumbs from '../../components/layout/Breadcrumbs';

export default function AnalyticsPage() {
  const storeComparison = [
    { store: "Flagship Downtown", footfall: 4250, attention: 84.5, dwell_min: 14.2 },
    { store: "Metro Hypermarket", footfall: 3890, attention: 79.2, dwell_min: 12.8 },
    { store: "Westside Galleria", footfall: 2910, attention: 81.0, dwell_min: 11.5 },
    { store: "Suburban Plaza", footfall: 1850, attention: 72.4, dwell_min: 9.4 },
    { store: "Airport Hub", footfall: 5120, attention: 88.2, dwell_min: 7.2 },
  ];

  return (
    <div>
      <Breadcrumbs title="Consumer Attention Analytics" subtitle="Deep cross-store comparison, gaze fixation metrics, and footfall analysis" />

      {/* Store Comparison Bar Chart */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-100 text-sm">Store Footfall vs Attention Performance Score</h3>
            <p className="text-xs text-slate-400">Aggregated dataset metrics across active retail branches</p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={storeComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="store" stroke="#64748B" fontSize={11} />
              <YAxis stroke="#64748B" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
              <Legend />
              <Bar dataKey="footfall" fill="#3B82F6" name="Total Footfall" radius={[4, 4, 0, 0]} />
              <Bar dataKey="attention" fill="#10B981" name="Attention Score %" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Analytics Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-xs">Eye-Gaze Retention</h4>
              <p className="text-[11px] text-slate-400">Eye-level vs bottom shelf</p>
            </div>
          </div>
          <p className="text-xs text-slate-300">
            Products placed at <strong className="text-blue-400">Eye-Level (A1)</strong> receive <strong>3.8x longer gaze duration</strong> than bottom shelf placements.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-xs">Dwell Time vs Pickup</h4>
              <p className="text-[11px] text-slate-400">Optimal engagement window</p>
            </div>
          </div>
          <p className="text-xs text-slate-300">
            Customers with a dwell time between <strong className="text-emerald-400">45s and 120s</strong> exhibit a <strong>74% pickup conversion rate</strong>.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-100 text-xs">RPC Recognition</h4>
              <p className="text-[11px] text-slate-400">Classification accuracy</p>
            </div>
          </div>
          <p className="text-xs text-slate-300">
            Automated checkout model maintains <strong className="text-amber-400">97.2% recognition confidence</strong> across 1,850 catalog SKUs.
          </p>
        </div>
      </div>
    </div>
  );
}
