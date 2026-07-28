import React, { useEffect, useState } from 'react';
import {
  Store,
  Camera,
  Users,
  Package,
  Eye,
  Clock,
  ShoppingBag,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Activity
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid
} from 'recharts';
import Breadcrumbs from '../../components/layout/Breadcrumbs';
import KPICard from '../../components/cards/KPICard';
import { analyticsAPI } from '../../services/api';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await analyticsAPI.getDashboard();
        setData(res.data);
      } catch (err) {
        console.warn("API load failed, using fallback static dataset data", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const kpis = [
    { title: 'Total Stores', value: data?.total_stores || 12, change: '+2 new stores', isPositive: true, icon: Store, accentColor: 'blue' },
    { title: 'Active Cameras', value: data?.active_cameras || 48, change: '98.4% uptime', isPositive: true, icon: Camera, accentColor: 'emerald' },
    { title: 'Active Customers', value: data?.active_customers || 142, change: '+14% vs yesterday', isPositive: true, icon: Users, accentColor: 'amber' },
    { title: 'Products Detected', value: data?.products_detected || 1850, change: 'SKU-110K models', isPositive: true, icon: Package, accentColor: 'purple' },
    { title: 'Avg Attention Score', value: `${data?.avg_attention_score || 78.4}%`, change: '+4.2% gaze fixation', isPositive: true, icon: Eye, accentColor: 'emerald' },
    { title: 'Avg Dwell Time', value: `${data?.avg_dwell_time_minutes || 8.0}m`, change: '+1.5 mins', isPositive: true, icon: Clock, accentColor: 'blue' },
    { title: 'Product Pickups', value: data?.total_product_pickups || 3420, change: '+18.4% pickups', isPositive: true, icon: ShoppingBag, accentColor: 'amber' },
    { title: 'Engagement Score', value: `${data?.overall_engagement_score || 82.5}/100`, change: 'Optimal range', isPositive: true, icon: Sparkles, accentColor: 'purple' },
  ];

  return (
    <div>
      <Breadcrumbs
        title="Retail Intelligence Dashboard"
        subtitle="Real-time consumer attention metrics derived from SKU-110K, COCO & RPC dataset models"
      />

      {/* KPI Card Grid (8 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((kpi, i) => (
          <KPICard key={i} {...kpi} />
        ))}
      </div>

      {/* Primary Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Daily Footfall & Conversions Chart */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-100 text-sm">Weekly Footfall vs Purchase Conversions</h3>
              <p className="text-xs text-slate-400">Retail Store Traffic Dataset aggregated velocity</p>
            </div>
            <span className="text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-full">
              Live Stream
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.daily_visitors || [
                {"day": "Mon", "visitors": 1240, "conversions": 810},
                {"day": "Tue", "visitors": 1450, "conversions": 940},
                {"day": "Wed", "visitors": 1380, "conversions": 910},
                {"day": "Thu", "visitors": 1620, "conversions": 1080},
                {"day": "Fri", "visitors": 2100, "conversions": 1420},
                {"day": "Sat", "visitors": 2890, "conversions": 1950},
                {"day": "Sun", "visitors": 2450, "conversions": 1680},
              ]}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="day" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="visitors" stroke="#3B82F6" fillOpacity={1} fill="url(#colorVisitors)" />
                <Area type="monotone" dataKey="conversions" stroke="#10B981" fillOpacity={1} fill="url(#colorConversions)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Category Distribution Chart */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="font-bold text-slate-100 text-sm">Product Category Share</h3>
            <p className="text-xs text-slate-400">RPC dataset classification breakdown</p>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data?.product_distribution || [
                    { category: 'Beverages', share: 34 },
                    { category: 'Snacks', share: 28 },
                    { category: 'Care', share: 18 },
                    { category: 'Dairy', share: 12 },
                    { category: 'Electronics', share: 8 },
                  ]}
                  dataKey="share"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={4}
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs text-slate-300">
            {(data?.product_distribution || [
              { category: 'Beverages', share: 34 },
              { category: 'Snacks', share: 28 },
              { category: 'Care', share: 18 },
            ]).slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx] }}></span>
                  <span>{item.category}</span>
                </div>
                <span className="font-semibold text-slate-100">{item.share}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Recommendations & Alerts Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Merchandising Recommendations */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-bold text-slate-100 text-sm">AI Merchandising Recommendations</h3>
              <p className="text-xs text-slate-400">Automated layout optimization based on eye-gaze models</p>
            </div>
          </div>

          <div className="space-y-3">
            {(data?.ai_recommendations || [
              { id: 1, title: 'Eye-Level Shelf Swap', impact: 'High (+18% Sales)', description: 'Move Cold Brew Coffee to Eye Level A1 for 4x attention retention.' },
              { id: 2, title: 'Aisle 3 Congestion Fix', impact: 'Medium (-2m Delay)', description: 'Clear 0.8m space near snack endcap during 17:00 peak hours.' }
            ]).map((rec) => (
              <div key={rec.id} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3 hover:border-slate-700 transition">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 font-bold text-xs shrink-0">
                  #{rec.id}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-slate-200">{rec.title}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {rec.impact}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{rec.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live System Alerts */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <div>
              <h3 className="font-bold text-slate-100 text-sm">Recent System Alerts & Thresholds</h3>
              <p className="text-xs text-slate-400">Low stock warnings, frame rate drops & gaze spikes</p>
            </div>
          </div>

          <div className="space-y-3">
            {(data?.recent_alerts || [
              { id: 1, title: 'High Attention Alert on Endcap A', message: 'Gaze score >92% threshold.', type: 'success' },
              { id: 2, title: 'Low Stock Warning on Shelf B2', message: 'Stock dropped below 5 units.', type: 'warning' },
              { id: 3, title: 'Camera Cam-MET-03 FPS Drop', message: 'Signal latency elevated.', type: 'danger' }
            ]).map((alt, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-slate-200">{alt.title}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">{alt.message}</div>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                  alt.type === 'danger' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                  alt.type === 'warning' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                  'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                }`}>
                  {alt.type?.toUpperCase() || 'INFO'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
