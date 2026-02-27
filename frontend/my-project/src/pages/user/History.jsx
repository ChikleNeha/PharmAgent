import { useState } from "react";

export default function History() {
  const historyOrders = [
    { id: "PA-301", name: "Amit Kulkarni", med: "Paracetamol, Zinc", qty: 2, date: "20 Feb 2026", time: "09:10 AM", status: "autonomous", note: "Safe dosage confirmed" },
    { id: "PA-302", name: "Sneha Joshi", med: "Insulin", qty: 1, date: "20 Feb 2026", time: "09:40 AM", status: "pending", note: "Doctor approval required" },
    { id: "PA-303", name: "Rahul Patil", med: "Omega-3, Calcium", qty: 3, date: "19 Feb 2026", time: "06:20 PM", status: "approved", note: "Approved by pharmacist" },
    { id: "PA-304", name: "Neha Sharma", med: "Cough Syrup", qty: 1, date: "19 Feb 2026", time: "04:15 PM", status: "autonomous", note: "Low risk" },
  ];

  const [activeFilter, setActiveFilter] = useState("all");

  // Filtered orders calculated on the fly to avoid useEffect + setState
  const filteredOrders = activeFilter === "all"
    ? historyOrders
    : historyOrders.filter(order => order.date === activeFilter);

  const statusStyles = {
    autonomous: "bg-blue-100 text-blue-800",
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      {/* <nav className="bg-white px-10 py-4 flex justify-between items-center shadow-md">
        <h2 className="text-green-600 text-2xl font-bold">PharmAgent</h2>
        <div className="flex items-center gap-7">
          <ul className="flex gap-7 list-none">
            {["Home", "Orders", "History", "About"].map((item) => (
              <li key={item}>
                <a href="#"
                  className={`${item === "History" ? "text-green-600 font-bold" : "text-gray-700"}`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <div className="text-2xl ml-5 cursor-pointer">👤</div>
        </div>
      </nav> */}

      {/* FILTER BUTTONS */}
      <div className="flex gap-3 justify-center my-8 flex-wrap">
        {["all", "20 Feb 2026", "19 Feb 2026"].map((date) => (
          <button
            key={date}
            onClick={() => setActiveFilter(date)}
            className={`px-4 py-2 rounded-full border text-sm cursor-pointer ${
              activeFilter === date ? "bg-green-600 text-white" : "bg-white border-gray-200"
            }`}
          >
            {date === "all" ? "All" : date}
          </button>
        ))}
      </div>

      {/* TIMELINE */}
      <div className="w-11/12 mx-auto relative">
        <div className="absolute left-5 top-0 bottom-0 w-1 bg-green-200 rounded" />
        {filteredOrders.map((o) => (
          <div
            key={o.id}
            className="bg-white rounded-2xl px-5 py-4 mb-6 relative shadow hover:-translate-y-1 transition"
          >
            <div className="absolute left-5 top-5 w-3 h-3 bg-green-600 rounded-full" />
            <h4 className="text-green-600 font-semibold mb-1">Order: {o.id}</h4>
            <p className="text-gray-700 mb-1"><b>Customer:</b> {o.name}</p>
            <p className="text-gray-700 mb-1"><b>Medicines:</b> {o.med} ({o.qty})</p>
            <p className="text-gray-700 mb-1"><b>Date/Time:</b> {o.date} {o.time}</p>
            <p className="text-gray-700 mb-1">
              <b>Status:</b>{" "}
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusStyles[o.status]}`}>
                {o.status}
              </span>
            </p>
            <p className="text-gray-700"><b>AI Notes:</b> {o.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}