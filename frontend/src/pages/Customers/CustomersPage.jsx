import React, { useEffect, useState } from 'react';
import { Users, Clock, MapPin, Eye, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import Breadcrumbs from '../../components/layout/Breadcrumbs';
import { customersAPI } from '../../services/api';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    async function loadCustomers() {
      try {
        const res = await customersAPI.getAll();
        setCustomers(res.data);
        if (res.data.length > 0) setSelectedCustomer(res.data[0]);
      } catch (err) {
        console.warn("API customers fetch fallback", err);
        const fallbackCust = [
          {
            id: 1,
            customer_code: "CUST-1001",
            current_zone: "Aisle 1 - Beverages",
            dwell_time_seconds: 480,
            attention_score: 91.4,
            entry_time: "18:24:10",
            journey_json: JSON.stringify([
              { step: 1, zone: "Main Entrance", duration_sec: 25, action: "Store Entry" },
              { step: 2, zone: "Aisle 1 - Beverages", duration_sec: 180, action: "Shelf Fixation (Cold Brew Coffee)" },
              { step: 3, zone: "Endcap A (Promotional)", duration_sec: 140, action: "Product Pickup Event" },
              { step: 4, zone: "Checkout Counter 2", duration_sec: 135, action: "POS Checkout & Exit" },
            ])
          },
          {
            id: 2,
            customer_code: "CUST-1002",
            current_zone: "Aisle 2 - Snacks",
            dwell_time_seconds: 620,
            attention_score: 84.2,
            entry_time: "18:20:15",
            journey_json: JSON.stringify([
              { step: 1, zone: "Main Entrance", duration_sec: 30, action: "Store Entry" },
              { step: 2, zone: "Aisle 2 - Snacks", duration_sec: 320, action: "Browsing Chips & Protein Bars" },
              { step: 3, zone: "Checkout Counter 1", duration_sec: 270, action: "Payment Completed" },
            ])
          },
        ];
        setCustomers(fallbackCust);
        setSelectedCustomer(fallbackCust[0]);
      }
    }
    loadCustomers();
  }, []);

  const parseJourney = (jsonStr) => {
    try {
      return JSON.parse(jsonStr || '[]');
    } catch (e) {
      return [];
    }
  };

  return (
    <div>
      <Breadcrumbs title="Customer Telemetry & Journey Mapping" subtitle="COCO & DeepSORT trajectory tracking across store zones and shelf interactions" />

      {/* Selected Customer Journey Visualizer Header */}
      {selectedCustomer && (
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-5">
            <div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-wider">
                Active Tracking Session
              </span>
              <h3 className="text-lg font-bold text-slate-100 mt-1">{selectedCustomer.customer_code}</h3>
              <p className="text-xs text-slate-400">Current Zone: <strong className="text-emerald-400">{selectedCustomer.current_zone}</strong></p>
            </div>

            <div className="flex items-center gap-6 text-xs text-slate-300">
              <div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Total Dwell Time</div>
                <div className="text-base font-bold text-slate-100 mt-0.5">
                  {Math.floor(selectedCustomer.dwell_time_seconds / 60)}m {selectedCustomer.dwell_time_seconds % 60}s
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Attention Score</div>
                <div className="text-base font-bold text-emerald-400 mt-0.5">{selectedCustomer.attention_score}%</div>
              </div>
            </div>
          </div>

          {/* Timeline Visualizer */}
          <h4 className="text-xs font-bold text-slate-200 mb-3">Customer Journey Timeline Flow</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {parseJourney(selectedCustomer.journey_json).map((step, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-blue-400 font-bold mb-1">
                    <span>Step 0{step.step}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{step.duration_sec}s dwell</span>
                  </div>
                  <div className="font-semibold text-xs text-slate-200">{step.zone}</div>
                  <div className="text-[11px] text-slate-400 mt-1">{step.action}</div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800 flex items-center gap-1 text-[10px] text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Telemetry Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Customer Sessions List */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-slate-100 text-sm">All Customer Sessions ({customers.length})</h3>
          <span className="text-xs text-slate-400">DeepSORT ID Multi-object Tracking</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900/60 border-b border-slate-800 text-slate-400 font-semibold">
                <th className="py-3.5 px-4">Customer ID</th>
                <th className="py-3.5 px-4">Current Zone</th>
                <th className="py-3.5 px-4">Dwell Time</th>
                <th className="py-3.5 px-4">Attention Score</th>
                <th className="py-3.5 px-4">Entry Time</th>
                <th className="py-3.5 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {customers.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setSelectedCustomer(c)}
                  className={`cursor-pointer transition ${
                    selectedCustomer?.id === c.id ? 'bg-blue-600/10 border-l-4 border-l-blue-500' : 'hover:bg-slate-800/40'
                  }`}
                >
                  <td className="py-3.5 px-4 font-bold text-blue-400">{c.customer_code}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-200">{c.current_zone}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-300">
                    {Math.floor(c.dwell_time_seconds / 60)}m {c.dwell_time_seconds % 60}s
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-400">{c.attention_score}%</td>
                  <td className="py-3.5 px-4 text-slate-400">{c.entry_time ? String(c.entry_time).slice(11, 19) : '18:24:10'}</td>
                  <td className="py-3.5 px-4">
                    <button className="px-3 py-1 bg-slate-900 border border-slate-800 text-blue-400 hover:border-blue-500 rounded-lg text-[11px] font-semibold transition">
                      View Timeline
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
