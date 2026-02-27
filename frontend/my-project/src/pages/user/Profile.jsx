

import { useState } from "react";

// Initialize state safely from localStorage
const getInitialForm = () => {
  try {
    const data = JSON.parse(localStorage.getItem("pharmagent_profile"));
    if (data && typeof data === "object") return data;
  } catch (err) {
    console.error("Error reading localStorage:", err);
  }
  return {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    gender: "Male",
    address: "",
  };
};

export default function Profile() {
  const [form, setForm] = useState(getInitialForm);
  const [status, setStatus] = useState("");

  const saveProfile = () => {
    localStorage.setItem("pharmagent_profile", JSON.stringify(form));
    setStatus("✔ Profile saved successfully");
    setTimeout(() => setStatus(""), 3000);
  };

  const displayName = (form.firstName || "User") + " " + (form.lastName || "");
  const displayEmail = form.email || "user@email.com";
  const avatar = (form.firstName || "U").charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-[#f7f9f8] text-[#1f2937] font-[Inter]">
      

      {/* CONTAINER */}
      <div className="w-[92%] max-w-225 mx-auto my-10">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-[30px] text-[#0f6f4a] font-bold">User Profile</h1>
          <p className="text-[#065f46] text-sm">
            Manage your personal and account information
          </p>
        </div>

        {/* PROFILE CARD */}
        <div className="bg-white rounded-[18px] shadow-[0_6px_18px_rgba(0,0,0,0.06)] p-7">
          {/* TOP */}
          <div className="flex items-center gap-5 mb-6">
            <div className="w-22.5 h-22.5 rounded-full bg-[#e8f7f0] flex items-center justify-center text-[36px] font-bold text-[#0f6f4a]">
              {avatar}
            </div>
            <div>
              <h2 className="text-[20px] mb-1">{displayName}</h2>
              <p className="text-[13px] text-[#6b7280]">{displayEmail}</p>
            </div>
          </div>

          {/* FORM */}
          <div className="grid grid-cols-2 gap-5">
            {[
              ["firstName", "First Name", "text"],
              ["lastName", "Last Name", "text"],
              ["email", "Email", "email"],
              ["phone", "Phone", "text"],
              ["age", "Age", "number"],
            ].map(([key, label, type]) => (
              <div key={key} className="flex flex-col">
                <label className="text-[13px] mb-1 text-[#065f46]">{label}</label>
                <input
                  type={type}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="p-2.5 rounded-[10px] border border-[#d1fae5] text-sm"
                />
              </div>
            ))}

            {/* GENDER */}
            <div className="flex flex-col">
              <label className="text-[13px] mb-1 text-[#065f46]">Gender</label>
              <select
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                className="p-2.5 rounded-[10px] border border-[#d1fae5] text-sm"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            {/* ADDRESS */}
            <div className="flex flex-col col-span-2">
              <label className="text-[13px] mb-1 text-[#065f46]">Address</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="p-2.5 rounded-[10px] border border-[#d1fae5] text-sm"
              />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-between items-center mt-6">
            <span className="text-[13px] text-[#065f46]">{status}</span>
            <button
              onClick={saveProfile}
              className="bg-[#0f6f4a] text-white px-6 py-2.5 rounded-full text-sm hover:bg-[#065f46]"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}