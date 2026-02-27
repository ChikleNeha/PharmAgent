import { useState } from "react";

export default function Customers() {
  const [customers, setCustomers] = useState([
    { id: 1, name: "Clara Tinley", age: 34, email: "clara.tinley@email.com", orders: 24, spend: 1240, status: "risk", img: "https://i.pravatar.cc/40?img=1", lastOrder: "2026-02-25" },
    { id: 2, name: "Robert Tussin", age: 41, email: "robert.tussin@email.com", orders: 12, spend: 540, status: "active", img: "https://i.pravatar.cc/40?img=2", lastOrder: "2026-02-27" },
    { id: 3, name: "Ami Darone", age: 29, email: "ami.darone@email.com", orders: 6, spend: 210, status: "blocked", img: "https://i.pravatar.cc/40?img=3", lastOrder: "2026-01-15" },
    { id: 4, name: "Neha Sharma", age: 27, email: "neha.sharma@email.com", orders: 18, spend: 760, status: "active", img: "https://i.pravatar.cc/40?img=4", lastOrder: "2026-02-28" },
    { id: 5, name: "Rahul Patil", age: 39, email: "rahul.patil@email.com", orders: 32, spend: 1860, status: "risk", img: "https://i.pravatar.cc/40?img=5", lastOrder: "2026-02-26" },
    { id: 6, name: "Sneha Joshi", age: 31, email: "sneha.joshi@email.com", orders: 14, spend: 620, status: "active", img: "https://i.pravatar.cc/40?img=6", lastOrder: "2026-02-24" },
    { id: 7, name: "Amit Kulkarni", age: 45, email: "amit.kulkarni@email.com", orders: 40, spend: 2400, status: "active", img: "https://i.pravatar.cc/40?img=7", lastOrder: "2026-02-28" },
    { id: 8, name: "Kiran Mehta", age: 36, email: "kiran.mehta@email.com", orders: 9, spend: 380, status: "blocked", img: "https://i.pravatar.cc/40?img=8", lastOrder: "2026-01-20" },
    { id: 9, name: "Priya Deshmukh", age: 28, email: "priya.deshmukh@email.com", orders: 22, spend: 980, status: "risk", img: "https://i.pravatar.cc/40?img=9", lastOrder: "2026-02-27" },
    { id: 10, name: "Vikram Singh", age: 42, email: "vikram.singh@email.com", orders: 15, spend: 720, status: "active", img: "https://i.pravatar.cc/40?img=10", lastOrder: "2026-02-26" },
    { id: 11, name: "Anjali Rao", age: 33, email: "anjali.rao@email.com", orders: 28, spend: 1520, status: "active", img: "https://i.pravatar.cc/40?img=11", lastOrder: "2026-02-28" }
  ]);
  
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [aiText, setAiText] = useState("");
  const [showAI, setShowAI] = useState(false);

  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === "active").length,
    risk: customers.filter(c => c.status === "risk").length,
    blocked: customers.filter(c => c.status === "blocked").length
  };

  const filteredCustomers = customers.filter(
    (c) => (filter === "all" || c.status === filter) && c.name.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusStyle = (status) => {
    const styles = {
      active: "bg-gradient-to-r from-emerald-400 to-green-500 text-white",
      risk: "bg-gradient-to-r from-orange-400 to-yellow-500 text-white",
      blocked: "bg-gradient-to-r from-red-400 to-red-500 text-white"
    };
    return styles[status] || "bg-gray-400";
  };

  const toggleStatus = (e, customerId) => {
    e.stopPropagation();
    setCustomers(prevCustomers =>
      prevCustomers.map(customer =>
        customer.id === customerId
          ? { ...customer, status: customer.status === "blocked" ? "active" : customer.status === "active" ? "blocked" : "risk" }
          : customer
      )
    );
  };

  const aiExplain = (customer) => {
    setShowAI(true);
    setAiText(
      customer.status === "risk"
        ? `${customer.name} ⚠️ HIGH RISK: ${customer.orders} orders`
        : customer.status === "blocked"
        ? `${customer.name} 🚫 BLOCKED`
        : `${customer.name} ✅ ACTIVE`
    );
  };

  return (
    <div className="flex-1 p-4 bg-linear-to-br from-emerald-50 to-green-50 min-h-screen">
      <div className="max-w-full mx-2">
        {/* Header - Compact */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
            <p className="text-emerald-700 text-xs">{stats.total} total • {stats.active} active</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg shadow hover:shadow-lg transition-all">
              + Invite
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white text-xs font-semibold rounded-lg shadow hover:shadow-lg transition-all">
              Export
            </button>
          </div>
        </div>

        {/* Stats - Compact */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-linear-to-br from-emerald-500 to-emerald-600 p-4 rounded-xl text-white shadow-lg">
            <p className="text-xs uppercase tracking-wide opacity-90">Total</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-linear-to-br from-blue-500 to-blue-600 p-4 rounded-xl text-white shadow-lg">
            <p className="text-xs uppercase tracking-wide opacity-90">Active</p>
            <p className="text-2xl font-bold">{stats.active}</p>
          </div>
          <div className="bg-linear-to-br from-orange-500 to-orange-600 p-4 rounded-xl text-white shadow-lg">
            <p className="text-xs uppercase tracking-wide opacity-90">Risk</p>
            <p className="text-2xl font-bold">{stats.risk}</p>
          </div>
          <div className="bg-linear-to-br from-red-500 to-red-600 p-4 rounded-xl text-white shadow-lg">
            <p className="text-xs uppercase tracking-wide opacity-90">Blocked</p>
            <p className="text-2xl font-bold">{stats.blocked}</p>
          </div>
        </div>

        {/* Filters - Compact */}
        <div className="bg-white/70 p-4 rounded-xl shadow-lg mb-6 backdrop-blur-sm border border-emerald-100">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-emerald-200 rounded-lg focus:ring-1 focus:ring-emerald-500 focus:border-transparent"
              />
              <span className="absolute left-2.5 top-2.5 text-gray-400 text-sm">🔍</span>
            </div>
            <div className="flex gap-1 flex-wrap">
              {['all', 'active', 'risk', 'blocked'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg shadow transition-all flex items-center gap-1 ${
                    filter === status
                      ? 'bg-emerald-600 text-white shadow-lg'
                      : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                  }`}
                >
                  {status === 'all' ? 'All' : status.slice(0,3)}
                  <span className="text-xs bg-white/60 px-1.5 py-0.5 rounded min-w-4.5 text-center">
                    {customers.filter(c => c.status === status).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table - ULTRA COMPACT */}
        <div className="bg-white/70 rounded-xl shadow-2xl border border-emerald-100 overflow-hidden mb-6 backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-162.5 text-xs">
              <thead className="bg-linear-to-r from-emerald-50 to-green-50">
                <tr>
                  {["Name", "Email", "Age", "Orders", "₹", "Date", "Status", ""].map((header) => (
                    <th key={header} className="px-2 py-2.5 text-left font-bold text-gray-700 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-50">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} onClick={() => aiExplain(customer)} className="cursor-pointer hover:bg-emerald-50 transition-colors group">
                    <td className="px-2 py-2.5 w-32">
                      <div className="flex items-center gap-2">
                        <img src={customer.img} alt={customer.name} className="w-8 h-8 rounded-full shrink-0" />
                        <div className="truncate">
                          <div className="font-bold text-gray-900 truncate max-w-25">{customer.name}</div>
                          <div className="text-gray-500">{customer.age}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-2.5 w-28">
                      <div className="truncate max-w-27.5 text-gray-700 font-medium">{customer.email}</div>
                    </td>
                    <td className="px-2 py-2.5 w-12 text-center font-bold text-gray-900">{customer.age}</td>
                    <td className="px-2 py-2.5 w-14 text-center">
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-xs font-bold">
                        {customer.orders}
                      </span>
                    </td>
                    <td className="px-2 py-2.5 w-16 text-center font-bold text-emerald-700">
                      ₹{customer.spend.toLocaleString()}
                    </td>
                    <td className="px-2 py-2.5 w-20 text-center">
                      <span className="text-gray-600 text-xs">{customer.lastOrder}</span>
                    </td>
                    <td className="px-2 py-2.5 w-20">
                      <span className={`px-2 py-1 rounded-lg font-bold text-xs shadow block w-full text-center ${getStatusStyle(customer.status)}`}>
                        {customer.status.slice(0,4)}
                      </span>
                    </td>
                    <td className="px-2 py-2.5 w-14 text-center">
                      <button
                        onClick={(e) => toggleStatus(e, customer.id)}
                        className={`w-8 h-8 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center mx-auto text-sm ${
                          customer.status === "blocked" ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-orange-600 text-white hover:bg-orange-700"
                        }`}
                      >
                        {customer.status === "blocked" ? "🔓" : "🔒"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State - Compact */}
        {filteredCustomers.length === 0 && (
          <div className="text-center py-12 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-100">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No customers</h3>
            <p className="text-gray-600 mb-6 text-sm">Try different search or filter</p>
            <button className="px-6 py-2 bg-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all">
              + Invite
            </button>
          </div>
        )}

        {/* AI Panel - Compact */}
        {showAI && (
          <div className="mt-6 bg-linear-to-r from-emerald-500 to-green-600 text-white p-5 rounded-xl shadow-2xl border border-emerald-400 max-w-full">
            <div className="flex items-center justify-between mb-4 gap-3">
              <h3 className="text-lg font-bold flex-1">🤖 AI Insight</h3>
              <button 
                onClick={() => setShowAI(false)}
                className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-all font-semibold text-sm flex items-center gap-1"
              >
                ✕ Close
              </button>
            </div>
            <div className="text-sm leading-relaxed bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              {aiText}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
