import { useState } from "react";

export default function AdminProfile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@pharmagent.com",
    phone: "+91 98765 43210",
    license: "MH-REG-2024-5678",
    specialty: "Pharmacy Manager",
    experience: "8 Years",
    hospital: "City Medical Center, Nagpur"
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const stats = [
    { label: "Total Orders", value: "2,847", change: "+12.5%" },
    { label: "Approved", value: "2,456", change: "+8.3%" },
    { label: "Pending", value: "391", change: "-2.1%" },
    { label: "Revenue", value: "₹8.45L", change: "+23.7%" }
  ];

  return (
    <div className="p-8 bg-linear-to-br from-gray-50 to-emerald-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-linear-to-r from-emerald-500 to-green-600 rounded-full shadow-2xl mb-6 border-8 border-white">
            <span className="text-4xl">👩‍⚕️</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Dr. Sarah Johnson
          </h1>
          <p className="text-xl text-emerald-700 font-semibold mb-1">
            Pharmacy Manager
          </p>
          <p className="text-gray-600">License: MH-REG-2024-5678</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-emerald-100">
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              <p className={`text-sm font-semibold mt-1 ${
                stat.change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {stat.change}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-12">
          <div className="flex border-b border-gray-200">
            {['profile', 'activity', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-6 font-semibold text-center transition-all ${
                  activeTab === tab
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
                <div className="space-x-3">
                  <button
                    onClick={handleEditToggle}
                    className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 transition-all"
                  >
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                  {isEditing && (
                    <button
                      onClick={handleSave}
                      className="px-6 py-2 bg-emerald-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all"
                    >
                      Save Changes
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      disabled={!isEditing}
                      className={`w-full p-4 border rounded-2xl text-lg font-semibold focus:ring-2 ${
                        isEditing 
                          ? 'border-gray-300 focus:ring-emerald-500 focus:border-emerald-500' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      disabled={!isEditing}
                      className={`w-full p-4 border rounded-2xl focus:ring-2 ${
                        isEditing 
                          ? 'border-gray-300 focus:ring-emerald-500 focus:border-emerald-500' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      disabled={!isEditing}
                      className={`w-full p-4 border rounded-2xl focus:ring-2 ${
                        isEditing 
                          ? 'border-gray-300 focus:ring-emerald-500 focus:border-emerald-500' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">License Number</label>
                    <input
                      type="text"
                      value={profileData.license}
                      onChange={(e) => setProfileData({...profileData, license: e.target.value})}
                      disabled={!isEditing}
                      className={`w-full p-4 border rounded-2xl focus:ring-2 ${
                        isEditing 
                          ? 'border-gray-300 focus:ring-emerald-500 focus:border-emerald-500' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Professional Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Specialty</label>
                    <p className="p-4 bg-gray-50 border border-gray-200 rounded-2xl">{profileData.specialty}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Experience</label>
                    <p className="p-4 bg-gray-50 border border-gray-200 rounded-2xl">{profileData.experience}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Affiliated Hospital</label>
                    <p className="p-4 bg-gray-50 border border-gray-200 rounded-2xl">{profileData.hospital}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  { time: "2 hours ago", action: "Approved 15 orders", type: "success" },
                  { time: "5 hours ago", action: "Reviewed inventory", type: "info" },
                  { time: "1 day ago", action: "Updated medicine prices", type: "warning" },
                  { time: "2 days ago", action: "Added new supplier", type: "success" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl hover:bg-white transition-all">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.type === 'success' ? 'bg-emerald-500' :
                      activity.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">Account Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-lg mb-4">Notifications</h3>
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-2xl hover:bg-gray-50 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 text-emerald-600 rounded" />
                      <span>Email notifications</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-2xl hover:bg-gray-50 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 text-emerald-600 rounded" checked />
                      <span>SMS alerts</span>
                    </label>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-4">Security</h3>
                  <div className="space-y-4">
                    <button className="w-full p-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all text-left">
                      Change Password
                    </button>
                    <button className="w-full p-4 bg-red-50 border-2 border-red-200 text-red-700 rounded-2xl hover:bg-red-100 transition-all font-semibold">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
