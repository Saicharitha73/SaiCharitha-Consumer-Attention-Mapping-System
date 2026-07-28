import React, { useEffect, useState } from 'react';
import { Layers, Eye, Percent, Trophy, Filter, ArrowUpRight } from 'lucide-react';
import Breadcrumbs from '../../components/layout/Breadcrumbs';
import { shelvesAPI } from '../../services/api';

export default function ShelvesPage() {
  const [shelves, setShelves] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    async function loadShelves() {
      try {
        const res = await shelvesAPI.getAll();
        setShelves(res.data);
      } catch (err) {
        console.warn("API load failed, fallback", err);
        setShelves([
          { id: 1, shelf_code: "SHF-101", category: "Beverages", product_count: 36, attention_score: 92.4, occupancy_percentage: 95.0, visibility_score: 98.0, shelf_ranking: 1 },
          { id: 2, shelf_code: "SHF-102", category: "Packaged Snacks", product_count: 42, attention_score: 88.9, occupancy_percentage: 92.0, visibility_score: 94.0, shelf_ranking: 2 },
          { id: 3, shelf_code: "SHF-103", category: "Personal Care", product_count: 28, attention_score: 74.1, occupancy_percentage: 82.0, visibility_score: 85.0, shelf_ranking: 3 },
          { id: 4, shelf_code: "SHF-104", category: "Dairy & Frozen", product_count: 31, attention_score: 68.5, occupancy_percentage: 78.0, visibility_score: 80.0, shelf_ranking: 4 },
          { id: 5, shelf_code: "SHF-105", category: "Bakery & Confectionery", product_count: 24, attention_score: 52.3, occupancy_percentage: 65.0, visibility_score: 72.0, shelf_ranking: 5 }
        ]);
      }
    }
    loadShelves();
  }, []);

  const categories = ['All', 'Beverages', 'Packaged Snacks', 'Personal Care', 'Dairy & Frozen', 'Bakery & Confectionery'];

  const filteredShelves = shelves.filter(s => categoryFilter === 'All' || s.category === categoryFilter);

  return (
    <div>
      <Breadcrumbs title="Shelf Analytics & Management" subtitle="SKU-110K shelf detection metrics, gaze attention scores, occupancy & ranking" />

      {/* Category Filters */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 custom-scrollbar">
        <Filter className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition ${
              categoryFilter === cat
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-semibold'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Shelves Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-slate-100 text-sm">Shelf Telemetry Matrix</h3>
          <span className="text-xs text-slate-400">Showing {filteredShelves.length} shelves</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900/60 border-b border-slate-800 text-slate-400 font-semibold">
                <th className="py-3.5 px-4">Shelf Code</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">SKU Product Density</th>
                <th className="py-3.5 px-4">Attention Score</th>
                <th className="py-3.5 px-4">Occupancy %</th>
                <th className="py-3.5 px-4">Visibility Score</th>
                <th className="py-3.5 px-4">Shelf Ranking</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {filteredShelves.map((shelf) => (
                <tr key={shelf.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5 px-4 font-bold text-blue-400">{shelf.shelf_code}</td>
                  <td className="py-3.5 px-4 font-medium">{shelf.category}</td>
                  <td className="py-3.5 px-4 font-semibold">{shelf.product_count} SKUs</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${shelf.attention_score}%` }}></div>
                      </div>
                      <span className="font-bold text-emerald-400">{shelf.attention_score}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-300">{shelf.occupancy_percentage}%</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-300">{shelf.visibility_score}%</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                      <Trophy className="w-3 h-3" />
                      #{shelf.shelf_ranking}
                    </span>
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
