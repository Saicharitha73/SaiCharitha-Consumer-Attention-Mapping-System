import React, { useEffect, useState } from 'react';
import { Store, Plus, Search, MapPin, Camera, Layers, Users, Trash2, Edit, CheckCircle, AlertTriangle } from 'lucide-react';
import Breadcrumbs from '../../components/layout/Breadcrumbs';
import { storesAPI } from '../../services/api';

export default function StoresPage() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStore, setNewStore] = useState({ name: '', city: '', address: '', number_of_shelves: 4, active_cameras: 3 });

  useEffect(() => {
    loadStores();
  }, []);

  async function loadStores() {
    try {
      const res = await storesAPI.getAll();
      setStores(res.data);
    } catch (err) {
      console.warn("API error loading stores, fallback to static", err);
      setStores([
        { id: 1, name: "Flagship Downtown", city: "New York", address: "742 Broadway Ave", number_of_shelves: 8, active_cameras: 6, visitor_count: 4250, status: "Active" },
        { id: 2, name: "Metro Hypermarket", city: "Chicago", address: "120 Michigan Ave", number_of_shelves: 6, active_cameras: 5, visitor_count: 3890, status: "Active" },
        { id: 3, name: "Westside Galleria", city: "Los Angeles", address: "880 Sunset Blvd", number_of_shelves: 5, active_cameras: 4, visitor_count: 2910, status: "Active" },
        { id: 4, name: "Suburban Plaza", city: "Houston", address: "450 Westheimer Rd", number_of_shelves: 4, active_cameras: 3, visitor_count: 1850, status: "Active" },
        { id: 5, name: "Airport Terminal Hub", city: "Atlanta", address: "Terminal B Concourse", number_of_shelves: 3, active_cameras: 2, visitor_count: 5120, status: "Active" },
        { id: 6, name: "Harbour Walk Store", city: "Seattle", address: "200 Pike St", number_of_shelves: 4, active_cameras: 3, visitor_count: 2240, status: "Maintenance" }
      ]);
    }
  }

  const handleCreateStore = async (e) => {
    e.preventDefault();
    try {
      await storesAPI.create(newStore);
      loadStores();
      setIsModalOpen(false);
      setNewStore({ name: '', city: '', address: '', number_of_shelves: 4, active_cameras: 3 });
    } catch (err) {
      alert("Failed to create store");
    }
  };

  const filteredStores = stores.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.city.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <Breadcrumbs title="Store Management" subtitle="Configure retail outlets, camera allocations, and shelf counts" />

      {/* Control Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search store name or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Offline">Offline</option>
          </select>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Store</span>
        </button>
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStores.map((store) => (
          <div key={store.id} className="glass-panel glass-panel-hover rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-100 text-sm">{store.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <span>{store.city}</span>
                    </div>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                  store.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                }`}>
                  {store.status}
                </span>
              </div>

              <p className="text-xs text-slate-400 mb-4">{store.address}</p>

              <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800/80 text-center">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Shelves</div>
                  <div className="text-sm font-bold text-slate-200 mt-0.5">{store.number_of_shelves}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Cameras</div>
                  <div className="text-sm font-bold text-slate-200 mt-0.5">{store.active_cameras}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Visitors</div>
                  <div className="text-sm font-bold text-slate-200 mt-0.5">{store.visitor_count}</div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-2 flex items-center justify-between text-xs text-slate-400">
              <span>Store ID: #{store.id}</span>
              <div className="flex items-center gap-2">
                <button className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:text-blue-400 transition">
                  <Edit className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Store Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel w-full max-w-md p-6 rounded-2xl border border-slate-800 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-100 mb-4">Add New Store Location</h3>
            <form onSubmit={handleCreateStore} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Store Name</label>
                <input
                  type="text"
                  required
                  value={newStore.name}
                  onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
                  placeholder="e.g. Times Square Outlet"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">City</label>
                <input
                  type="text"
                  required
                  value={newStore.city}
                  onChange={(e) => setNewStore({ ...newStore, city: e.target.value })}
                  placeholder="e.g. New York"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Street Address</label>
                <input
                  type="text"
                  value={newStore.address}
                  onChange={(e) => setNewStore({ ...newStore, address: e.target.value })}
                  placeholder="123 Retail Way"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1">Shelves Count</label>
                  <input
                    type="number"
                    value={newStore.number_of_shelves}
                    onChange={(e) => setNewStore({ ...newStore, number_of_shelves: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Active Cameras</label>
                  <input
                    type="number"
                    value={newStore.active_cameras}
                    onChange={(e) => setNewStore({ ...newStore, active_cameras: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-900 border border-slate-800 text-slate-300 rounded-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold shadow-lg shadow-blue-600/30"
                >
                  Create Store
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
