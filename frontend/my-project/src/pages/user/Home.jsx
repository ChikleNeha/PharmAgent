
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [search, setSearch] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const navigate = useNavigate();

  const topSelling = ["Minoxidil 10%", "Vitamin C", "Hair Serum", "Skin Cleanser"];
  const newArrivals = ["Omega 3", "Face Wash", "Biotin Tablets", "Protein Powder"];

  // Filter during render
  const filteredTop = topSelling.filter((m) =>
    m.toLowerCase().includes(search.toLowerCase())
  );

  // PRODUCT IMAGES - REPLACE THESE WITH YOUR ACTUAL IMAGES
  const productImages = {
    // TOP SELLING
    "Minoxidil 10%": '/images/Minoxidil.png',
    "Vitamin C": '/images/Miduty pigment.png',
    "Hair Serum": '/images/Hair Serum.jpg',
    "Skin Cleanser": '/images/Skin cleanser.jpg',

    // NEW ARRIVALS
    "Omega 3": '/images/Omega 3.jpg',
    "Face Wash": '/images/face wash.jpg', 
    "Biotin Tablets": '/images/Biotin tablet.jpg',
    "Protein Powder": '/images/Protein powder.jpg'
  };

  // CATEGORY ICONS
  const categoryIcons = {
    heart: '/images/Heart Care.png',
    eye: '/images/Eye Care.png',
    hair: '/images/Hair Care.png',
    diabetes: '/images/Diabetes.png',
    tooth: '/images/Tooth Care.png',
    pills: '/images/Suppliments.png'
  };

  const Card = ({ name, imageUrl }) => (
    <div className="bg-white rounded-[14px] p-3.5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl shadow-lg group">
      <div className="overflow-hidden rounded-lg mb-3">
        <img
          src={imageUrl}
          className="w-full h-32.5 object-contain group-hover:scale-110 transition-transform duration-300"
          alt={name}
          loading="lazy"
        />
      </div>
      <h4 className="text-[14px] font-semibold my-2 text-gray-800 line-clamp-2">{name}</h4>
      <p className="text-green-dark font-bold text-[15px]">₹499</p>
      <div className="flex justify-between mt-3 pt-2 border-t border-gray-100">
        <span className="cursor-pointer text-[20px] text-red-500 hover:text-red-600 transition-colors group-hover:animate-pulse">♡</span>
        <span className="text-yellow-400 text-[16px]">⭐⭐⭐⭐⭐</span>
      </div>
    </div>
  );

  return (
    <>
      {/* HERO SECTION */}
      <section className="w-[92%] mx-auto my-7.5 bg-linear-to-r from-green-100 to-emerald-100 p-11 rounded-2xl text-center relative overflow-hidden shadow-2xl">
        <h1 className="text-[32px] mb-5.5 font-bold text-gray-800 leading-tight">
          Your Pharmacy, Managed by
          <br />
          <span className="text-green-dark">Autonomous AI Agents</span>.
        </h1>

        <div className="max-w-2xl mx-auto bg-white rounded-[50px] px-6 py-3 flex items-center gap-3 border-2 border-green-200 shadow-xl">
          <select className="border-none outline-none text-[15px] font-medium flex-1 min-w-0">
            <option>All Categories</option>
            <option>Hair Care</option>
            <option>Skin Care</option>
            <option>Vitamins</option>
            <option>Pain Relief</option>
          </select>
          <input
            className="flex-2 border-none outline-none text-[15px] placeholder-gray-500 px-4"
            placeholder="Search 1000+ medicines..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="text-2xl p-2 bg-green-100 rounded-full">🔍</span>
        </div>

        <button
          onClick={() => setChatOpen(true)}
          className="mt-8 bg-linear-to-r from-green-dark to-emerald-700 text-white px-10 py-4 rounded-[30px] font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          💬 Chat with AI Assistant
        </button>
      </section>

      {/* TOP SELLING SECTION */}
      <section className="w-[92%] mx-auto my-10 bg-linear-to-r from-emerald-50 to-green-50 p-8 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-3xl font-bold text-green-dark">Top Selling Medicines</h3>
          <button
            onClick={() => navigate("/user/TopSelling")}
            className="group relative bg-linear-to-r from-green-500 to-emerald-600 text-white px-8 py-3.5 rounded-[25px] text-[15px] font-bold cursor-pointer shadow-xl hover:shadow-2xl hover:from-green-600 hover:to-emerald-700 hover:scale-[1.05] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden border border-green-400 before:absolute before:inset-0 before:bg-linear-to-r before:from-white/20 before:to-transparent before:origin-left before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100"
          >
            <span className="relative z-10 flex items-center gap-2">View All ➤</span>
          </button>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-6">
          {filteredTop.map((m) => (
            <Card 
              key={m} 
              name={m}
              imageUrl={productImages[m]}
            />
          ))}
          {filteredTop.length === 0 && (
            <div className="text-center py-12 text-gray-500 col-span-full">
              No top selling products found matching "{search}"
            </div>
          )}
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="w-[92%] mx-auto my-10 bg-white p-10 rounded-2xl shadow-2xl border border-green-100">
        <h3 className="text-3xl font-bold text-green-dark mb-10 text-center">Shop by Category</h3>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-8 text-center">
          {[
            "heart", "eye", "hair", "diabetes", "tooth", "pills",
          ].map((c) => (
            <div key={c} className="group cursor-pointer hover:scale-110 transition-all duration-300 p-4 rounded-xl hover:bg-green-50">
              <div className="w-28 h-28 rounded-2xl bg-linear-to-br from-green-100 to-emerald-100 p-5 mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-400 group-hover:rotate-6">
                <img
                  src={categoryIcons[c]}
                  className="w-full h-full object-contain"
                  alt={`${c} care`}
                />
              </div>
              <p className="mt-4 text-[15px]  text-gray-700 capitalize group-hover:text-green-dark transition-colors font-medium">{c} care</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS SECTION */}
      <section className="w-[92%] mx-auto my-10 bg-linear-to-r from-emerald-50 to-green-50 p-8 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-3xl font-bold text-green-dark">New Arrivals</h3>
          <button
            onClick={() => navigate("/user/NewArrivals")}
            className="group relative bg-linear-to-r from-green-500 to-emerald-600 text-white px-8 py-3.5 rounded-[25px] text-[15px] font-bold cursor-pointer shadow-xl hover:shadow-2xl hover:from-green-600 hover:to-emerald-700 hover:scale-[1.05] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden border border-green-400 before:absolute before:inset-0 before:bg-linear-to-r before:from-white/20 before:to-transparent before:origin-left before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100"
          >
            <span className="relative z-10 flex items-center gap-2">View All ➤</span>
          </button>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-6">
          {newArrivals.map((m) => (
            <Card 
              key={m} 
              name={m}
              imageUrl={productImages[m]}
            />
          ))}
        </div>
      </section>

      {/* CHAT MODAL */}
      {chatOpen && (
        <div
          onClick={(e) => e.target === e.currentTarget && setChatOpen(false)}
          className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex justify-center items-end md:items-center z-50 backdrop-blur-sm p-4"
        >
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-8 duration-300 border border-gray-200 max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <h4 className="text-2xl font-bold bg-linear-to-r from-green-dark to-emerald-700 bg-clip-text text-transparent">
                🤖 AI Assistant
              </h4>
              <button
                onClick={() => setChatOpen(false)}
                className="text-3xl hover:text-red-500 transition-all duration-200 hover:scale-110"
              >
                ✕
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto border border-gray-200 p-5 rounded-2xl bg-linear-to-b from-gray-50 to-white mb-6 min-h-50">
              <div className="text-sm text-gray-500 text-center py-12 flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-3">
                  <span className="text-2xl">👋</span>
                </div>
                <p>Hello! I can help you with:</p>
                <div className="text-xs space-y-1 opacity-75">
                  <span>• Medicine recommendations</span>
                  <span>• Dosage information</span>
                  <span>• Side effects & precautions</span>
                  <span>• Product comparisons</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 p-1 bg-gray-100 rounded-3xl">
              <input
                placeholder="Ask about medicines, dosages, or recommendations..."
                className="flex-1 border-none outline-none p-4 rounded-3xl text-sm bg-white shadow-sm focus:shadow-md transition-all placeholder-gray-500"
              />
              <button className="bg-linear-to-r from-green-dark to-emerald-700 text-white p-4 rounded-3xl hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl w-14 flex items-center justify-center">
                <span className="text-xl">➤</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
