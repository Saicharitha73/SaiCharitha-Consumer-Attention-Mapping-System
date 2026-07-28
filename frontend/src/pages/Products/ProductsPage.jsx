import React, { useEffect, useState } from 'react';
import { Package, Eye, ShoppingBag, CheckCircle, Search, Filter } from 'lucide-react';
import Breadcrumbs from '../../components/layout/Breadcrumbs';
import { productsAPI } from '../../services/api';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await productsAPI.getAll();
        setProducts(res.data);
      } catch (err) {
        console.warn("API products error fallback", err);
        setProducts([
          { id: 1, name: "Organic Cold Brew Coffee 350ml", brand: "Roast & Co", category: "Beverages", price: 4.99, stock_status: "In Stock", recognition_confidence: 98.4, views_count: 1420, pickups_count: 680, purchases_count: 510, attention_score: 94.2 },
          { id: 2, name: "Sparkling Citrus Water 500ml", brand: "PureHydrate", category: "Beverages", price: 2.49, stock_status: "In Stock", recognition_confidence: 96.8, views_count: 1100, pickups_count: 420, purchases_count: 380, attention_score: 82.5 },
          { id: 3, name: "Artisanal Dark Chocolate 85%", brand: "CacaoLux", category: "Bakery & Confectionery", price: 5.99, stock_status: "In Stock", recognition_confidence: 99.1, views_count: 890, pickups_count: 410, purchases_count: 360, attention_score: 88.0 },
          { id: 4, name: "Quinoa & Sea Salt Chips 150g", brand: "HealthyCrunch", category: "Packaged Snacks", price: 3.79, stock_status: "Low Stock", recognition_confidence: 95.2, views_count: 1250, pickups_count: 590, purchases_count: 480, attention_score: 91.0 },
          { id: 5, name: "Hydrating Botanical Shampoo 400ml", brand: "VelvetGlow", category: "Personal Care", price: 11.49, stock_status: "In Stock", recognition_confidence: 94.5, views_count: 640, pickups_count: 210, purchases_count: 180, attention_score: 71.4 },
        ]);
      }
    }
    loadProducts();
  }, []);

  const categories = ['All', 'Beverages', 'Packaged Snacks', 'Personal Care', 'Bakery & Confectionery', 'Dairy & Frozen'];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <Breadcrumbs title="Product Catalog & Recognition Intelligence" subtitle="RPC (Retail Product Checkout) recognition accuracy, pickup events, and eye gaze score" />

      {/* Control Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search product SKU or brand..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-blue-500"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 font-medium">
          RPC Recognition Model Accuracy: <strong className="text-emerald-400">97.2%</strong>
        </span>
      </div>

      {/* Products Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900/60 border-b border-slate-800 text-slate-400 font-semibold">
                <th className="py-3.5 px-4">Product Name</th>
                <th className="py-3.5 px-4">Brand</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">RPC Confidence</th>
                <th className="py-3.5 px-4">Views</th>
                <th className="py-3.5 px-4">Pickups</th>
                <th className="py-3.5 px-4">Purchases</th>
                <th className="py-3.5 px-4">Attention Score</th>
                <th className="py-3.5 px-4">Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-100">{p.name}</td>
                  <td className="py-3.5 px-4 text-slate-400">{p.brand}</td>
                  <td className="py-3.5 px-4 font-medium">{p.category}</td>
                  <td className="py-3.5 px-4 font-bold text-blue-400">${p.price?.toFixed(2)}</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-400">{p.recognition_confidence}%</td>
                  <td className="py-3.5 px-4 text-slate-300">{p.views_count}</td>
                  <td className="py-3.5 px-4 font-semibold text-amber-400">{p.pickups_count}</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-400">{p.purchases_count}</td>
                  <td className="py-3.5 px-4 font-bold text-purple-400">{p.attention_score}%</td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      p.stock_status === 'In Stock' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {p.stock_status}
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
