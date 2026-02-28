import { useState } from "react";

const ordersData = [
  { id: "PA-301", name: "Amit Kulkarni", med: "Paracetamol, Zinc", qty: 2, risk: "low", date: "20 Feb 2026", time: "09:10 AM", status: "autonomous", note: "Safe dosage confirmed" },
  { id: "PA-302", name: "Sneha Joshi", med: "Insulin", qty: 1, risk: "high", date: "20 Feb 2026", time: "09:40 AM", status: "pending", note: "Doctor approval required" },
  { id: "PA-303", name: "Rahul Patil", med: "Omega-3, Calcium", qty: 3, risk: "medium", date: "19 Feb 2026", time: "06:20 PM", status: "approved", note: "Approved by pharmacist" },
  { id: "PA-304", name: "Neha Sharma", med: "Cough Syrup", qty: 1, risk: "low", date: "19 Feb 2026", time: "04:15 PM", status: "autonomous", note: "Low risk" },
  { id: "PA-305", name: "Vikram Desai", med: "BP Tablets", qty: 2, risk: "high", date: "18 Feb 2026", time: "02:30 PM", status: "pending", note: "Monitoring required" },
  { id: "PA-306", name: "Pooja Mehta", med: "Vitamin D3", qty: 1, risk: "low", date: "18 Feb 2026", time: "11:10 AM", status: "approved", note: "Routine supplement" },
  { id: "PA-307", name: "Karan Shah", med: "Anti-Allergy Tabs", qty: 1, risk: "medium", date: "17 Feb 2026", time: "05:55 PM", status: "autonomous", note: "Mild interaction flagged" },
  { id: "PA-308", name: "Riya Nair", med: "Iron Syrup", qty: 1, risk: "low", date: "17 Feb 2026", time: "01:25 PM", status: "approved", note: "Safe" },
  { id: "PA-309", name: "Sanjay Verma", med: "Pain Relief Gel", qty: 2, risk: "low", date: "16 Feb 2026", time: "12:40 PM", status: "autonomous", note: "External use only" },
  { id: "PA-310", name: "Anjali Rao", med: "Thyroid Tablets", qty: 1, risk: "high", date: "16 Feb 2026", time: "09:05 AM", status: "pending", note: "Dose verification needed" }
];

export default function Orders() {
  const [filter, setFilter] = useState("all");
  const [openRow, setOpenRow] = useState(null);

  const filteredOrders =
    filter === "all" ? ordersData : ordersData.filter(o => o.status === filter);

  return (
    <div className="min-h-screen bg-[#f7f9f8] text-[#1f2937] font-[Inter]">

      {/* NAVBAR */}
      {/* <nav className="bg-white px-10 py-4 flex justify-between items-center shadow-md">
        <h2 className="text-[22px] font-bold text-[#0f6f4a]">PharmAgent</h2>
        <div className="flex items-center gap-7">
          <ul className="flex gap-8">
            {["Home", "Orders", "History", "About"].map(link => (
              <li key={link} className="relative">
                <a
                  className={`pb-1 transition ${
                    link === "Orders"
                      ? "text-[#0f6f4a] font-bold"
                      : "hover:after:w-full after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-[#1faa75] after:transition-all"
                  }`}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
          <div className="text-[22px] cursor-pointer">👤</div>
        </div>
      </nav> */}

      {/* PAGE */}
      <div className="w-[92%] mx-auto mt-8">

        {/* HEADER */}
        <div className="bg-[#d9f5e6] p-7 rounded-2xl">
          <h1 className="text-[#0f6f4a] text-2xl font-bold">Orders Overview</h1>
          <p className="text-[#065f46]">
            Autonomous AI + human approval workflow for medicines
          </p>
        </div>

        {/* TABS */}
        <div className="flex gap-3 flex-wrap my-6">
          {[
            ["all", "All"],
            ["autonomous", "Autonomous"],
            ["pending", "To Be Approved"],
            ["approved", "Approved"]
          ].map(([key, label]) => (
            <div
              key={key}
              onClick={() => setFilter(key)}
              className={`px-6 py-2 rounded-full cursor-pointer border text-sm ${
                filter === key
                  ? "bg-[#0f6f4a] text-white"
                  : "bg-white border-[#d1fae5]"
              }`}
            >
              {label}
            </div>
          ))}
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl p-5 overflow-x-auto">
          <table className="w-full min-w-275 border-collapse">
            <thead>
              <tr className="bg-[#f0fdf4] text-[#065f46] text-left">
                {["Order ID", "Customer", "Medicines", "Qty", "Risk", "Date", "Time", "Status"].map(h => (
                  <th key={h} className="p-3 text-sm">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((o, i) => (
                <>
                  <tr
                    key={o.id}
                    onClick={() => setOpenRow(openRow === i ? null : i)}
                    className="hover:bg-[#f9fafb] cursor-pointer"
                  >
                    <td className="p-3">{o.id}</td>
                    <td className="p-3">{o.name}</td>
                    <td className="p-3">{o.med}</td>
                    <td className="p-3">{o.qty}</td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${o.risk === "low" && "bg-[#dcfce7] text-[#166534]"}
                        ${o.risk === "medium" && "bg-[#fef9c3] text-[#854d0e]"}
                        ${o.risk === "high" && "bg-[#fee2e2] text-[#991b1b]"}
                      `}>
                        {o.risk}
                      </span>
                    </td>
                    <td className="p-3">{o.date}</td>
                    <td className="p-3">{o.time}</td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${o.status === "autonomous" && "bg-[#e0f2fe] text-[#075985]"}
                        ${o.status === "pending" && "bg-[#fef3c7] text-[#92400e]"}
                        ${o.status === "approved" && "bg-[#dcfce7] text-[#166534]"}
                      `}>
                        {o.status}
                      </span>
                    </td>
                  </tr>

                  {openRow === i && (
                    <tr className="bg-[#f9fafb]">
                      <td colSpan="8" className="p-4 text-sm text-[#374151]">
                        <b>AI Notes:</b> {o.note}
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}