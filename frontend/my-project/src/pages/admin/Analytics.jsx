import { useState, useEffect } from "react";

export default function Analytics() {
  const [sales, setSales] = useState(0);
  const [users, setUsers] = useState(0);
  const [activeTab, setActiveTab] = useState("daily");
  const [riskLevel, setRiskLevel] = useState(78);

  // Fixed animateValue function
  const animateValue = (setter, end, duration) => {
    let start = 0;
    const range = end - start;
    const stepTime = Math.abs(Math.floor(duration / range)) || 16;
    let current = start;
    
    const timer = setInterval(() => {
      current += range / (duration / stepTime);
      setter(Math.floor(current));
      if (current >= end) {
        setter(end);
        clearInterval(timer);
      }
    }, stepTime);
    
    return timer;
  };

  useEffect(() => {
    const salesTimer = animateValue(setSales, 85000, 2000);
    const usersTimer = animateValue(setUsers, 255000, 2000);
    const riskTimer = setInterval(() => {
      setRiskLevel(prev => {
        const change = (Math.random() - 0.5) * 4;
        return Math.max(60, Math.min(95, Math.round(prev + change)));
      });
    }, 3000);

    return () => {
      clearInterval(salesTimer);
      clearInterval(usersTimer);
      clearInterval(riskTimer);
    };
  }, []);

  const chartData = {
    daily: { labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], data: [20, 40, 30, 55, 42, 60, 75] },
    weekly: { labels: ["W1", "W2", "W3", "W4"], data: [120, 190, 300, 500] },
    monthly: { labels: ["Jan", "Feb", "Mar", "Apr"], data: [2000, 3000, 4500, 6000] }
  };

  return (
    <div className="flex-1 p-8 bg-linear-to-br from-emerald-50 via-white to-green-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Analytics</h1>
            <p className="text-emerald-700 font-semibold">Real-time pharmacy insights</p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
              Export Report
            </button>
            <button className="px-6 py-2.5 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
              Share
            </button>
          </div>
        </div>

        {/* Stats Grid - SideNavbar Match */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-linear-to-br from-emerald-500 to-emerald-600 p-8 rounded-2xl text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-emerald-400/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium uppercase tracking-wide">Total Sales</p>
                <p className="text-3xl font-bold mt-2">{sales.toLocaleString()}</p>
                <p className="text-emerald-100 text-sm mt-1 font-semibold">+55.87% this month</p>
              </div>
              <span className="text-3xl">📊</span>
            </div>
          </div>

          <div className="bg-linear-to-br from-blue-500 to-blue-600 p-8 rounded-2xl text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-blue-400/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium uppercase tracking-wide">Active Users</p>
                <p className="text-3xl font-bold mt-2">{(users/1000).toFixed(0)}k</p>
                <p className="text-blue-100 text-sm mt-1 font-semibold">+23.4% this month</p>
              </div>
              <span className="text-3xl">👥</span>
            </div>
          </div>

          <div className="bg-linear-to-br from-purple-500 to-purple-600 p-8 rounded-2xl text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-purple-400/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium uppercase tracking-wide">Revenue</p>
                <p className="text-3xl font-bold mt-2">₹{(sales * 0.85).toLocaleString()}</p>
                <p className="text-purple-100 text-sm mt-1 font-semibold">+42.3% vs last month</p>
              </div>
              <span className="text-3xl">💰</span>
            </div>
          </div>

          <div className="bg-linear-to-br from-orange-500 to-orange-600 p-8 rounded-2xl text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-orange-400/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium uppercase tracking-wide">Orders</p>
                <p className="text-3xl font-bold mt-2">1,247</p>
                <p className="text-orange-100 text-sm mt-1 font-semibold">+18.2% this week</p>
              </div>
              <span className="text-3xl">📋</span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Revenue Trends */}
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-emerald-100">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800">Revenue Trends</h3>
              <div className="flex gap-2 bg-emerald-100 p-2 rounded-xl">
                {['daily', 'weekly', 'monthly'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                      activeTab === tab
                        ? 'bg-emerald-600 text-white shadow-lg'
                        : 'text-emerald-700 hover:bg-emerald-200 hover:shadow-md'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-[repeat(var(--cols),minmax(0,1fr))] gap-6 h-80 items-end p-6 bg-linear-to-b from-emerald-50 to-green-50 rounded-xl" 
                 style={{ '--cols': chartData[activeTab].labels.length }}>
              {chartData[activeTab].labels.map((label, i) => (
                <div key={label} className="flex flex-col items-center group relative">
                  <div 
                    className="w-6 bg-linear-to-t from-emerald-500 to-emerald-400 rounded-xl shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 cursor-pointer hover:scale-110 hover:-translate-y-2"
                    style={{ 
                      height: `${Math.min(chartData[activeTab].data[i] * 3.5, 120)}px`,
                      minHeight: '28px'
                    }}
                  />
                  <span className="text-xs font-bold text-gray-800 mt-3 px-1">{label}</span>
                  <div className="absolute -top-20 bg-white/95 px-3 py-2 rounded-2xl shadow-xl text-xs font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-20 border border-emerald-200 backdrop-blur-sm">
                    ₹{chartData[activeTab].data[i].toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Gauge - Live Updating */}
          <div className="bg-linear-to-br from-emerald-50 to-green-50 p-8 rounded-2xl shadow-xl border border-emerald-200 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-emerald-800 mb-6">Risk Distribution</h3>
            <div className="flex items-center justify-center h-72 relative">
              <div className="relative w-52 h-52">
                <div className="absolute inset-0 w-52 h-52 bg-linear-to-r from-emerald-400 via-blue-400 to-purple-400 rounded-full blur-xl opacity-60 animate-pulse"></div>
                <div className="absolute inset-4 bg-white/90 backdrop-blur-xl rounded-full shadow-2xl border-4 border-white"></div>
                <div className={`absolute inset-12 text-white font-bold text-2xl rounded-full shadow-xl flex items-center justify-center w-20 h-20 mx-auto transition-all duration-1000 ${riskLevel > 80 ? 'bg-emerald-500' : riskLevel > 65 ? 'bg-blue-500' : 'bg-orange-500'}`}>
                  {riskLevel}%
                </div>
              </div>
            </div>
            <div className="text-center mt-8 grid grid-cols-3 gap-4">
              <div className="bg-emerald-100/80 p-4 rounded-xl hover:shadow-md transition-all">
                <div className="font-bold text-xl text-emerald-800">70%</div>
                <div className="text-sm text-emerald-700 font-medium">Low Risk</div>
              </div>
              <div className="bg-orange-100/80 p-4 rounded-xl hover:shadow-md transition-all">
                <div className="font-bold text-xl text-orange-800">20%</div>
                <div className="text-sm text-orange-700 font-medium">Medium</div>
              </div>
              <div className="bg-purple-100/80 p-4 rounded-xl hover:shadow-md transition-all">
                <div className="font-bold text-xl text-purple-800">10%</div>
                <div className="text-sm text-purple-700 font-medium">High</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Medicine Categories */}
          <div className="bg-linear-to-br from-emerald-50 to-green-50 p-8 rounded-2xl shadow-xl border border-emerald-200 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-emerald-800 mb-8 flex items-center gap-3">
              💊 Medicine Categories
              <span className="text-sm bg-emerald-200 text-emerald-800 px-3 py-1 rounded-full font-semibold">Live Data</span>
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {[
                { color: "emerald", name: "Antibiotics", percent: "45%", icon: "💉" },
                { color: "blue", name: "Pain Relief", percent: "30%", icon: "💊" },
                { color: "orange", name: "Vitamins", percent: "15%", icon: "💊" },
                { color: "purple", name: "Others", percent: "10%", icon: "🩹" }
              ].map((cat, i) => (
                <div key={i} className="group flex items-center gap-4 p-6 bg-white/70 rounded-xl hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-emerald-100 hover:border-emerald-300">
                  <div className={`w-16 h-16 bg-linear-to-r from-${cat.color}-500 to-${cat.color}-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all`}>
                    <span className="text-2xl">{cat.icon}</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{cat.name}</div>
                    <div className="text-3xl font-bold text-emerald-700">{cat.percent}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-emerald-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-8">🏆 Top Selling Medicines</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {[
                { name: "Amoxicillin 500mg", price: "₹120", sales: "1,247", rank: 1 },
                { name: "Paracetamol 650mg", price: "₹45", sales: "987", rank: 2 },
                { name: "Vitamin D3", price: "₹299", sales: "756", rank: 3 },
                { name: "Amlodipine 5mg", price: "₹89", sales: "623", rank: 4 }
              ].map((product, i) => (
                <div key={i} className="group flex items-center gap-4 p-6 bg-linear-to-r from-emerald-50 to-green-50 rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-emerald-200 hover:border-emerald-400 hover:bg-emerald-100">
                  <div className="w-12 h-12 bg-linear-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shrink-0 group-hover:scale-110">
                    <span className="text-white font-bold text-sm">#{product.rank}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-900 text-lg truncate">{product.name}</div>
                    <div className="text-sm text-emerald-700 font-semibold">Orders: {product.sales}</div>
                  </div>
                  <div className="text-right font-bold text-emerald-600 text-2xl">{product.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
