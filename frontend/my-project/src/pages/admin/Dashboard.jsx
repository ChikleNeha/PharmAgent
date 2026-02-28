// import { useState, useEffect } from "react";

// export default function Dashboard() {
//   const [sales, setSales] = useState(0);

//   useEffect(() => {
//     let counter = 0;
//     const timer = setInterval(() => {
//       counter += 1;
//       setSales(Math.min(counter, 85));
//       if (counter >= 85) {
//         clearInterval(timer);
//       }
//     }, 30);
//     return () => clearInterval(timer);
//   }, []);

//   const chartData = [
//     { label: "Mon", value: 120 },
//     { label: "Tue", value: 190 },
//     { label: "Wed", value: 150 },
//     { label: "Thu", value: 220 },
//     { label: "Fri", value: 180 },
//     { label: "Sat", value: 260 },
//     { label: "Sun", value: 310 }
//   ];

//   return (
//     <div className="p-8 bg-linear-to-br from-gray-50 to-emerald-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold text-gray-800 mb-12">
//           Admin Dashboard
//         </h1>

//         {/* Stat Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//           <div className="bg-linear-to-br from-emerald-400 to-green-500 p-8 rounded-3xl text-white shadow-2xl hover:scale-105 transition-all duration-300">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-emerald-100 text-sm font-medium">Today's Sales</p>
//                 <p className="text-3xl font-bold mt-2">${sales.toFixed(0)}</p>
//                 <p className="text-emerald-100 text-sm mt-1">+55.87% This month</p>
//               </div>
//               <span className="text-4xl">📊</span>
//             </div>
//           </div>

//           <div className="bg-linear-to-br from-orange-400 to-amber-500 p-8 rounded-3xl text-white shadow-2xl hover:scale-105 transition-all duration-300">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-orange-100 text-sm font-medium">Expired Medicines</p>
//                 <p className="text-3xl font-bold mt-2">0%</p>
//                 <p className="text-orange-100 text-sm mt-1">No expired stock</p>
//               </div>
//               <span className="text-4xl">💊</span>
//             </div>
//           </div>

//           <div className="bg-linear-to-br from-blue-400 to-cyan-500 p-8 rounded-3xl text-white shadow-2xl hover:scale-105 transition-all duration-300">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-blue-100 text-sm font-medium">System Users</p>
//                 <p className="text-3xl font-bold mt-2">255k</p>
//                 <p className="text-blue-100 text-sm mt-1">+23.4% This month</p>
//               </div>
//               <span className="text-4xl">👥</span>
//             </div>
//           </div>
//         </div>

//         {/* Charts Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
//           {/* Revenue Chart */}
//           <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
//             <div className="flex justify-between items-center mb-8">
//               <h3 className="text-2xl font-bold text-gray-800">Revenue Trend</h3>
//               <select className="px-4 py-2 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500">
//                 <option>This Week</option>
//                 <option>This Month</option>
//               </select>
//             </div>
//             <div className="grid grid-cols-7 gap-6 h-72 items-end p-4">
//               {chartData.map((point) => (
//                 <div key={point.label} className="flex flex-col items-center group relative">
//                   <div 
//                     className="w-5 bg-linear-to-t from-emerald-500 to-green-600 rounded-lg shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 cursor-pointer hover:scale-110"
//                     style={{ 
//                       height: `${Math.min((point.value / 310) * 160, 140)}px`,
//                       minHeight: '24px'
//                     }}
//                   />
//                   <span className="text-xs font-medium text-gray-700 mt-2">{point.label}</span>
//                   <div className="absolute -top-14 bg-white/90 px-2 py-1 rounded-xl shadow-lg text-xs font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-10 border border-gray-200">
//                     ${point.value}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Blocked Drugs */}
//           <div className="bg-linear-to-r from-emerald-50 to-green-50 p-8 rounded-3xl shadow-xl border border-emerald-100">
//             <h3 className="text-2xl font-bold text-emerald-800 mb-6">Blocked Drugs</h3>
//             <div className="space-y-4">
//               {[
//                 { img: 1, name: "Clara Tinley", drug: "Amoxicillin" },
//                 { img: 2, name: "Robert Tussin", drug: "Rosuvastatin" },
//                 { img: 3, name: "Ami Darone", drug: "Claritin" }
//               ].map((item) => (
//                 <div key={item.name} className="flex items-center gap-3 p-4 bg-white rounded-2xl hover:shadow-md transition-all hover:bg-emerald-50">
//                   <img 
//                     src={`https://i.pravatar.cc/40?img=${item.img}`} 
//                     className="w-10 h-10 rounded-full shadow-md"
//                     alt={item.name}
//                   />
//                   <div className="flex-1">
//                     <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
//                     <p className="text-emerald-700 text-xs font-medium">{item.drug}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Orders Table */}
//         <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
//           <div className="flex justify-between items-center mb-8">
//             <h3 className="text-2xl font-bold text-gray-800">Orders to Approve</h3>
//             <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200">
//               Export CSV
//             </button>
//           </div>
          
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="bg-linear-to-r from-gray-50 to-emerald-50">
//                   {["Medicine", "Dosage", "Quantity", "Date", "Time", "Action"].map((header) => (
//                     <th key={header} className="px-6 py-4 text-left font-semibold text-gray-700 uppercase tracking-wide">
//                       {header}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {[
//                   { medicine: "Claritin", dosage: "Loratadine 10mg", qty: "12", date: "12-Feb-2026", time: "08:00 AM" },
//                   { medicine: "Amoxicillin", dosage: "Amoxicillin 500mg", qty: "20", date: "13-Feb-2026", time: "10:30 AM" },
//                   { medicine: "Paracetamol", dosage: "Paracetamol 650mg", qty: "50", date: "14-Feb-2026", time: "02:15 PM" }
//                 ].map((order, index) => (
//                   <tr key={index} className="hover:bg-emerald-50 hover:shadow-sm transition-all duration-200">
//                     <td className="px-6 py-5 font-semibold text-gray-900">{order.medicine}</td>
//                     <td className="px-6 py-5 text-gray-700">{order.dosage}</td>
//                     <td className="px-6 py-5">
//                       <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold text-sm">
//                         {order.qty}
//                       </span>
//                     </td>
//                     <td className="px-6 py-5 font-medium text-gray-700">{order.date}</td>
//                     <td className="px-6 py-5 text-gray-700">{order.time}</td>
//                     <td className="px-6 py-5">
//                       <div className="flex gap-2">
//                         <button className="w-11 h-11 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center">
//                           ✓
//                         </button>
//                         <button className="w-11 h-11 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center">
//                           ✖
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }







import { useState, useEffect } from "react";

export default function Dashboard() {
  const [sales, setSales] = useState(0);
  const [users, setUsers] = useState(0);
  const [activeFilter, setActiveFilter] = useState("week");

  useEffect(() => {
    // Sales counter
    let salesCounter = 0;
    const salesTimer = setInterval(() => {
      salesCounter += 1;
      setSales(Math.min(salesCounter, 85));
      if (salesCounter >= 85) clearInterval(salesTimer);
    }, 30);

    // Users counter
    let usersCounter = 0;
    const usersTimer = setInterval(() => {
      usersCounter += 50;
      setUsers(Math.min(usersCounter, 255000));
      if (usersCounter >= 255000) clearInterval(usersTimer);
    }, 8);

    return () => {
      clearInterval(salesTimer);
      clearInterval(usersTimer);
    };
  }, []);

  const chartData = {
    week: [
      { label: "Mon", value: 120 },
      { label: "Tue", value: 190 },
      { label: "Wed", value: 150 },
      { label: "Thu", value: 220 },
      { label: "Fri", value: 180 },
      { label: "Sat", value: 260 },
      { label: "Sun", value: 310 }
    ],
    month: [
      { label: "W1", value: 800 },
      { label: "W2", value: 1200 },
      { label: "W3", value: 950 },
      { label: "W4", value: 1600 }
    ]
  };

  return (
    <div className="flex-1 p-8 bg-linear-to-br from-emerald-50 via-white to-green-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-emerald-700 font-semibold mt-1">Welcome back, Admin!</p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2 bg-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
              Quick Actions
            </button>
          </div>
        </div>

        {/* Stats Cards - Perfect SideNavbar match */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-linear-to-br from-emerald-500 to-emerald-600 p-8 rounded-2xl text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-emerald-400/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium uppercase tracking-wide">Today's Sales</p>
                <p className="text-3xl font-bold mt-2">${sales.toLocaleString()}</p>
                <p className="text-emerald-100 text-sm mt-1 font-semibold">+55.87% this month</p>
              </div>
              <span className="text-4xl">📊</span>
            </div>
          </div>

          <div className="bg-linear-to-br from-orange-500 to-orange-600 p-8 rounded-2xl text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-orange-400/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium uppercase tracking-wide">Expired Medicines</p>
                <p className="text-3xl font-bold mt-2">0%</p>
                <p className="text-orange-100 text-sm mt-1 font-semibold">No expired stock</p>
              </div>
              <span className="text-4xl">💊</span>
            </div>
          </div>

          <div className="bg-linear-to-br from-blue-500 to-blue-600 p-8 rounded-2xl text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-blue-400/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium uppercase tracking-wide">System Users</p>
                <p className="text-3xl font-bold mt-2">{(users/1000).toFixed(0)}k</p>
                <p className="text-blue-100 text-sm mt-1 font-semibold">+23.4% this month</p>
              </div>
              <span className="text-4xl">👥</span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-emerald-100">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800">Revenue Trend</h3>
              <div className="flex gap-2 bg-emerald-100 p-2 rounded-xl">
                {['week', 'month'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                      activeFilter === filter
                        ? 'bg-emerald-600 text-white shadow-lg'
                        : 'text-emerald-700 hover:bg-emerald-200'
                    }`}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-7 gap-6 h-72 items-end p-6 bg-linear-to-b from-gray-50 to-emerald-50 rounded-xl">
              {chartData[activeFilter].map((point) => (
                <div key={point.label} className="flex flex-col items-center group relative">
                  <div 
                    className="w-6 bg-linear-to-t from-emerald-500 to-emerald-400 rounded-xl shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 cursor-pointer hover:scale-110 hover:-translate-y-2"
                    style={{ 
                      height: `${Math.min((point.value / Math.max(...chartData[activeFilter].map(d => d.value))) * 160, 140)}px`,
                      minHeight: '24px'
                    }}
                  />
                  <span className="text-xs font-bold text-gray-800 mt-3">{point.label}</span>
                  <div className="absolute -top-16 bg-white/95 px-3 py-2 rounded-2xl shadow-xl text-xs font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-20 border border-emerald-200 backdrop-blur-sm">
                    ${point.value.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Blocked Drugs */}
          <div className="bg-linear-to-br from-emerald-50 to-green-50 p-8 rounded-2xl shadow-xl border border-emerald-200 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center gap-2">
              🚫 Blocked Drugs
              <span className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded-full font-semibold">3 Active</span>
            </h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {[
                { img: 1, name: "Clara Tinley", drug: "Amoxicillin", status: "High Risk" },
                { img: 2, name: "Robert Tussin", drug: "Rosuvastatin", status: "Expired" },
                { img: 3, name: "Ami Darone", drug: "Claritin", status: "Restricted" }
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-4 p-4 bg-white/70 rounded-xl hover:shadow-lg transition-all hover:bg-white hover:-translate-y-1 border border-emerald-100">
                  <img 
                    src={`https://i.pravatar.cc/40?img=${item.img}`} 
                    className="w-12 h-12 rounded-2xl shadow-lg ring-2 ring-red-200"
                    alt={item.name}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm truncate">{item.name}</p>
                    <p className="text-emerald-700 font-semibold text-xs">{item.drug}</p>
                    <span className="inline-block px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full mt-1">
                      {item.status}
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 shadow-lg hover:shadow-xl transition-all whitespace-nowrap">
                    Review
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-emerald-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              📋 Orders to Approve
              <span className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-semibold">5 Pending</span>
            </h3>
            <div className="flex gap-3">
              <button className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
                Export CSV
              </button>
              <button className="px-5 py-2.5 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all">
                Bulk Approve
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-linear-to-r from-emerald-50 to-green-50">
                  {["Medicine", "Dosage", "Quantity", "Date", "Time", "Action"].map((header) => (
                    <th key={header} className="px-6 py-4 text-left font-bold text-gray-700 uppercase tracking-wide border-b border-emerald-200">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-50">
                {[
                  { medicine: "Claritin", dosage: "Loratadine 10mg", qty: "12", date: "12-Feb-2026", time: "08:00 AM", status: "pending" },
                  { medicine: "Amoxicillin", dosage: "Amoxicillin 500mg", qty: "20", date: "13-Feb-2026", time: "10:30 AM", status: "pending" },
                  { medicine: "Paracetamol", dosage: "Paracetamol 650mg", qty: "50", date: "14-Feb-2026", time: "02:15 PM", status: "pending" }
                ].map((order, index) => (
                  <tr key={index} className="hover:bg-emerald-50 hover:shadow-md transition-all duration-200">
                    <td className="px-6 py-5 font-bold text-gray-900">{order.medicine}</td>
                    <td className="px-6 py-5 font-semibold text-gray-700">{order.dosage}</td>
                    <td className="px-6 py-5">
                      <span className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-xl font-bold text-sm shadow-sm">
                        {order.qty}
                      </span>
                    </td>
                    <td className="px-6 py-5 font-medium text-gray-700">{order.date}</td>
                    <td className="px-6 py-5 text-gray-700 font-medium">{order.time}</td>
                    <td className="px-6 py-5">
                      <div className="flex gap-2">
                        <button className="w-12 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-lg">
                          ✓
                        </button>
                        <button className="w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-lg">
                          ✖
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
