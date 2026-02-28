import React, { useState, useEffect } from "react";

export default function Inventory() {
  const [filter, setFilter] = useState("all");
  const [aiText, setAiText] = useState("");
  const [showAI, setShowAI] = useState(false);
  const [search, setSearch] = useState("");

  const [medicinesData] = useState([
    { id: 1, name: "Claritin (Loratadine)", qty: "10 mg (12 tabs)", status: "critical", expiry: "2026-04-15" },
    { id: 2, name: "Paracetamol 500mg (Tab)", qty: "1500 tabs", status: "instock", expiry: "2027-02-28" },
    { id: 3, name: "Cetirizine 10mg (Tab)", qty: "0 tabs", status: "outstock", expiry: "2026-08-20" },
    { id: 4, name: "Amoxicillin 500mg", qty: "245 tabs", status: "critical", expiry: "2026-03-10" },
    { id: 5, name: "Amlodipine 5mg", qty: "890 tabs", status: "instock", expiry: "2026-12-01" },
    { id: 6, name: "Vitamin D3 1000IU", qty: "0 tabs", status: "outstock", expiry: "2026-05-30" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Live stock simulation
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredMedicines = medicinesData.filter((medicine) => {
    const matchesFilter = filter === "all" || medicine.status === filter;
    const matchesSearch = medicine.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    const colors = {
      critical: "bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-lg font-bold text-xs shadow-lg",
      instock: "bg-gradient-to-r from-emerald-400 to-green-500 text-white px-3 py-1.5 rounded-lg font-bold text-xs shadow-lg",
      outstock: "bg-gradient-to-r from-red-400 to-red-500 text-white px-3 py-1.5 rounded-lg font-bold text-xs shadow-lg",
      expired: "bg-gradient-to-r from-gray-400 to-gray-500 text-white px-3 py-1.5 rounded-lg font-bold text-xs shadow-lg"
    };
    return colors[status] || "bg-gray-400 text-white px-3 py-1.5 rounded-lg font-bold text-xs";
  };

  const getQuantityColor = (status) => {
    if (status === 'critical' || status === 'outstock') {
      return 'bg-gradient-to-r from-red-400 to-red-500 text-white shadow-lg px-4 py-2 rounded-xl font-bold text-xs min-w-[90px] flex items-center justify-center';
    }
    return 'bg-gradient-to-r from-emerald-400 to-emerald-500 text-white shadow-lg px-4 py-2 rounded-xl font-bold text-xs min-w-[90px] flex items-center justify-center';
  };

  const aiPredict = (medicine) => {
    setShowAI(true);
    setAiText(
      medicine.status === "critical"
        ? `${medicine.name} ⚠️ CRITICAL: ${medicine.qty}`
        : medicine.status === "outstock"
        ? `${medicine.name} ❌ OUT OF STOCK`
        : medicine.status === "instock"
        ? `${medicine.name} ✅ STOCK OK: ${medicine.qty}`
        : `${medicine.name} 🛑 EXPIRED`
    );
  };

  const stats = [
    { icon: "💰", label: "Total Value", value: "₹10.3L", bg: "from-emerald-500 to-emerald-600" },
    { icon: "📦", label: "Total Items", value: medicinesData.length.toString(), bg: "from-blue-500 to-blue-600" },
    { icon: "🚨", label: "Critical", value: medicinesData.filter(m => m.status === "critical").length.toString(), bg: "from-orange-500 to-orange-600" },
    { icon: "❌", label: "Out of Stock", value: medicinesData.filter(m => m.status === "outstock").length.toString(), bg: "from-red-500 to-red-600" }
  ];

  return (
    <div className="flex-1 p-4 lg:p-6 bg-linear-to-br from-emerald-50 via-white to-green-50 min-h-screen ml-0 lg:ml-4">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 mb-6 lg:mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1">Inventory</h1>
            <p className="text-emerald-700 font-semibold text-sm">Real-time stock management</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all">
              + Add Medicine
            </button>
            <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all">
              Bulk Import
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6 lg:mb-8">
          {stats.map((stat, index) => (
            <div key={index} className={`bg-linear-to-br ${stat.bg} p-4 lg:p-6 rounded-xl lg:rounded-2xl text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all border border-white/30`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-xs lg:text-sm font-medium uppercase tracking-wide">{stat.label}</p>
                  <p className="text-xl lg:text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <span className="text-2xl lg:text-3xl opacity-90">{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Filters & Search */}
        <div className="bg-white/70 backdrop-blur-xl p-3 lg:p-6 rounded-xl lg:rounded-2xl shadow-lg border border-emerald-100 mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 items-center justify-between">
            <div className="flex-1 max-w-xs lg:max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search medicines..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 lg:pl-12 pr-3 lg:pr-4 py-2 lg:py-3 text-sm border border-emerald-200 rounded-lg lg:rounded-xl focus:ring-1 lg:focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm"
                />
                <span className="absolute left-2.5 lg:left-4 top-2.5 lg:top-3.5 text-gray-400 text-sm">🔍</span>
              </div>
            </div>
            <div className="flex gap-1 lg:gap-3 flex-wrap">
              {['all', 'critical', 'instock', 'outstock'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-3 lg:px-6 py-1.5 lg:py-2.5 text-xs lg:text-sm font-semibold rounded-lg lg:rounded-xl shadow-md transition-all flex items-center gap-1 ${
                    filter === status
                      ? 'bg-emerald-600 text-white shadow-lg hover:shadow-xl'
                      : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                  }`}
                >
                  {status === 'all' ? 'All' : status.slice(0,4)}
                  {status !== 'all' && (
                    <span className="text-xs bg-white/50 px-1.5 lg:px-2 py-0.5 rounded-full min-w-5 text-center">
                      {medicinesData.filter(m => m.status === status).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Medicines Table */}
        <div className="bg-white/70 backdrop-blur-xl rounded-xl lg:rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden mb-6 lg:mb-8">
          <div className="overflow-x-auto">
            <table className="w-full min-w-175 text-sm">
              <thead className="bg-linear-to-r from-emerald-50 to-green-50">
                <tr>
                  {["#", "Medicine", "Qty", "Status", "Expiry", ""].map((header) => (
                    <th key={header} className="px-3 lg:px-6 py-3 text-left font-bold text-gray-700 uppercase tracking-wide text-xs">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-50">
                {filteredMedicines.map((medicine) => (
                  <tr 
                    key={medicine.id}
                    onClick={() => aiPredict(medicine)}
                    className="cursor-pointer hover:bg-emerald-50 hover:shadow-md transition-all duration-200 group"
                  >
                    <td className="px-3 lg:px-6 py-3 lg:py-4 w-12 text-center">
                      <span className="font-bold text-gray-900 text-xs">#{medicine.id}</span>
                    </td>
                    <td className="px-3 lg:px-6 py-3 lg:py-4 w-44 lg:w-auto max-w-40">
                      <div className="font-bold text-gray-900 text-sm group-hover:text-emerald-700 truncate">
                        {medicine.name}
                      </div>
                    </td>
                    <td className="px-3 lg:px-6 py-3 lg:py-4 w-28">
                      <span className={getQuantityColor(medicine.status)}>
                        {medicine.qty}
                      </span>
                    </td>
                    <td className="px-3 lg:px-6 py-3 lg:py-4 w-24">
                      <span className={getStatusColor(medicine.status)}>
                        {medicine.status.slice(0,4)}
                      </span>
                    </td>
                    <td className="px-3 lg:px-6 py-3 lg:py-4 w-28 text-center">
                      <span className="text-gray-600 text-xs font-medium">{medicine.expiry}</span>
                    </td>
                    <td className="px-3 lg:px-6 py-3 lg:py-4 w-20">
                      <div className="flex gap-1 lg:gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 justify-center">
                        <button 
                          className="w-8 h-8 lg:w-9 lg:h-9 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-lg hover:shadow-xl flex items-center justify-center transition-all text-sm" 
                          title="Restock"
                        >
                          ➕
                        </button>
                        <button 
                          className="w-8 h-8 lg:w-9 lg:h-9 bg-orange-600 hover:bg-orange-700 text-white rounded-lg shadow-lg hover:shadow-xl flex items-center justify-center transition-all text-sm" 
                          title="Order Details"
                        >
                          📋
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Prediction Panel */}
        {showAI && (
          <div className="mt-6 lg:mt-12 bg-linear-to-r from-emerald-500 to-green-600 text-white p-4 lg:p-8 rounded-xl lg:rounded-2xl shadow-2xl border border-emerald-400 max-w-full">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 mb-4 lg:mb-6">
              <h3 className="text-lg lg:text-2xl font-bold flex-1">🤖 AI Stock Prediction</h3>
              <button 
                onClick={() => setShowAI(false)}
                className="px-3 lg:px-4 py-1.5 lg:py-2 bg-white/20 hover:bg-white/30 rounded-lg lg:rounded-xl backdrop-blur-sm transition-all font-semibold text-sm flex items-center gap-1"
              >
                ✕ Close
              </button>
            </div>
            <div className="text-sm lg:text-lg leading-relaxed bg-white/10 p-3 lg:p-6 rounded-lg lg:rounded-xl backdrop-blur-sm">
              {aiText}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredMedicines.length === 0 && (
          <div className="text-center py-12 lg:py-24 bg-white/60 backdrop-blur-xl rounded-xl lg:rounded-2xl shadow-xl border border-emerald-100">
            <div className="text-4xl lg:text-6xl mb-4 lg:mb-6">📦</div>
            <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">No medicines found</h3>
            <p className="text-gray-600 mb-6 text-sm">Try adjusting your search or filter settings</p>
            <button className="px-6 lg:px-8 py-2.5 lg:py-3 bg-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
              + Add Medicine
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
