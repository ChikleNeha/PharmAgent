import { useState } from "react";

export default function Signup() {
  const [role, setRole] = useState("user");
  const [submitted, setSubmitted] = useState(false);

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form processing
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log("Signup data:", data, "Role:", role);
    
    setSubmitted(true);
    
    // Navigate based on role after 1.5s delay
    setTimeout(() => {
      if (role === "user") {
        window.location.href = "/MedicalTracking";
      } else {
        window.location.href = "/user";
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-7.5 text-[#1f2937] font-[Inter] flex items-center justify-center">
      <div className="max-w-175 w-full bg-white border border-[#cbd5e1] rounded-[10px] p-5.5">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-4.5 pb-2.5 border-b-2 border-[#ecfdf5]">
          <div className="w-9.5 h-9.5 rounded-full bg-[#ecfdf5] flex items-center justify-center text-[20px]">
            👤
          </div>
          <h1 className="text-[18px] text-[#2f855a] font-semibold">
            Create Account
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          {/* NAME */}
          <div className="mb-4.5">
            <label className="text-[13px] block mb-1">Full Name</label>
            <input
              name="name"
              type="text"
              placeholder="Enter your full name"
              className="w-full h-8.5 px-2 text-[13px] border border-[#cbd5e1] rounded-md focus:outline-none focus:border-[#2f855a] focus:ring-1 focus:ring-[#2f855a]/20 transition-all"
            />
          </div>

          {/* EMAIL */}
          <div className="mb-4.5">
            <label className="text-[13px] block mb-1">Email ID</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full h-8.5 px-2 text-[13px] border border-[#cbd5e1] rounded-md focus:outline-none focus:border-[#2f855a] focus:ring-1 focus:ring-[#2f855a]/20 transition-all"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-4.5">
            <label className="text-[13px] block mb-1">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full h-8.5 px-2 text-[13px] border border-[#cbd5e1] rounded-md focus:outline-none focus:border-[#2f855a] focus:ring-1 focus:ring-[#2f855a]/20 transition-all"
            />
          </div>

          {/* ROLE SELECTION */}
          <div className="mb-4.5">
            <label className="text-[13px] block mb-2 font-medium">Signup as:</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleRoleChange("user")}
                className={`flex-1 h-9 px-3 text-[13px] rounded-lg font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg ${
                  role === "user"
                    ? "bg-[#2f855a] text-white shadow-md shadow-[#2f855a]/20"
                    : "bg-white border-2 border-[#cbd5e1] text-[#1f2937] hover:border-[#2f855a] hover:text-[#2f855a] hover:bg-[#ecfdf5]"
                }`}
              >
                User
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange("admin")}
                className={`flex-1 h-9 px-3 text-[13px] rounded-lg font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg ${
                  role === "admin"
                    ? "bg-[#2f855a] text-white shadow-md shadow-[#2f855a]/20"
                    : "bg-white border-2 border-[#cbd5e1] text-[#1f2937] hover:border-[#2f855a] hover:text-[#2f855a] hover:bg-[#ecfdf5]"
                }`}
              >
                Admin
              </button>
            </div>
            <div className="mt-1 text-[11px] text-[#6b7280]">
              {role === "user" ? "Access Medical Tracking" : "Access Admin Panel"}
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full h-9.5 bg-[#2f855a] text-white rounded-lg text-[14px] font-medium cursor-pointer hover:bg-green-700 hover:shadow-lg hover:shadow-[#2f855a]/30 transform hover:scale-[1.02] transition-all duration-200"
          >
            Create Account
          </button>

          {/* SUCCESS MESSAGE */}
          {submitted && (
            <div className="mt-3 bg-[#ecfdf5] p-2.5 rounded-md text-[13px] text-[#2f855a] font-medium border border-[#2f855a]/20 flex items-center gap-2">
              ✔ Account created successfully. Redirecting...
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

