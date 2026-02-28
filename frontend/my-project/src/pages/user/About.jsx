
// export default function About() {
//   return (
//     <>
//       {/* CONTENT */}
//       <div className="w-[92%] mx-auto my-8">
//         {/* HEADER - Eye-catching */}
//         <div className="text-center mb-16 bg-linear-to-br from-emerald-500/5 to-green-500/5 backdrop-blur-xl p-12 rounded-3xl shadow-2xl border border-emerald-200">
//           <h1 className="text-5xl lg:text-6xl font-black  mb-6 bg-linear-to-r from-emerald-600 via-emerald-700 to-teal-600 bg-clip-text text-transparent">
//             PharmAgent
//           </h1>
//           <div className="w-28 h-1 bg-linear-to-r from-emerald-500 to-green-500 mx-auto mb-8 rounded-full shadow-xl"></div>
//           <p className="text-2xl font-semibold text-emerald-800 max-w-2xl mx-auto leading-relaxed">
//             AI-Driven Pharmacy Management & Decision Support System
//           </p>
//         </div>

//         {/* MISSION */}
//         <div className="bg-white/80 backdrop-blur-xl p-10 lg:p-12 rounded-3xl mb-10 shadow-2xl border border-emerald-100 hover:shadow-3xl hover:-translate-y-2 transition-all duration-500">
//           <div className="flex items-start gap-6 mb-8">
//             <div className="w-16 h-16 bg-linear-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-2xl shrink-0">
//               <span className="text-3xl">🎯</span>
//             </div>
//             <h3 className="text-4xl lg:text-5xl font-bold text-gray-800 mt-2">Our Mission</h3>
//           </div>
//           <p className="text-xl lg:text-2xl leading-relaxed text-gray-700 max-w-4xl font-light">
//             Empowering pharmacies worldwide with autonomous AI agents that revolutionize 
//             medicine management, ensure uncompromising patient safety, and deliver 
//             real-time actionable business intelligence.
//           </p>
//         </div>

//         {/* TECHNOLOGY */}
//         <div className="bg-linear-to-br from-emerald-50 to-green-50 p-10 lg:p-12 rounded-3xl mb-10 shadow-xl border border-emerald-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
//           <div className="absolute top-0 right-0 w-72 h-72 bg-linear-to-br from-emerald-400/20 to-transparent rounded-full blur-3xl -translate-y-20"></div>
//           <div className="flex items-start gap-6 mb-8 relative z-10">
//             <div className="w-16 h-16 bg-linear-to-r from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-2xl linearshrink-0">
//               <span className="text-3xl">🚀</span>
//             </div>
//             <h3 className="text-4xl lg:text-5xl font-bold bg-linear-to-r from-gray-800 to-gray-700 bg-clip-text text-transparent">Our Technology</h3>
//           </div>
//           <div className="grid lg:grid-cols-2 gap-8 relative z-10">
//             <p className="text-xl lg:text-2xl leading-relaxed text-gray-700 col-span-1 lg:col-span-2 max-w-3xl">
//               Enterprise-grade AI powered by cutting-edge large language models, bulletproof 
//               cloud infrastructure, human-in-the-loop validation, and military-grade safety protocols.
//             </p>
//             <div className="grid grid-cols-2 gap-6 pt-6 border-t border-emerald-200">
//               <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all">
//                 <span className="text-2xl mb-3 block">🧠</span>
//                 <h4 className="font-bold text-xl text-gray-800 mb-2">LLM Intelligence</h4>
//                 <p className="text-emerald-700 font-semibold">GPT-4o powered</p>
//               </div>
//               <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all">
//                 <span className="text-2xl mb-3 block">🔒</span>
//                 <h4 className="font-bold text-xl text-gray-800 mb-2">Enterprise Security</h4>
//                 <p className="text-emerald-700 font-semibold">HIPAA/GDPR compliant</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* FEATURES HIGHLIGHTS */}
//         <div className="bg-white/80 backdrop-blur-xl p-10 lg:p-12 rounded-3xl shadow-2xl border border-emerald-100 mb-10 hover:shadow-3xl hover:-translate-y-2 transition-all duration-500">
//           <div className="flex items-start gap-6 mb-12">
//             <div className="w-16 h-16 bg-linear-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-2xl shrink-0">
//               <span className="text-3xl">⚡</span>
//             </div>
//             <h3 className="text-4xl lg:text-5xl font-bold text-gray-800 mt-2">Why Choose Us</h3>
//           </div>
          
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <div className="group p-8 rounded-3xl bg-linear-to-br from-emerald-50 to-teal-50 border border-emerald-200 hover:shadow-2xl hover:-translate-y-3 hover:bg-emerald-100 transition-all duration-500 cursor-pointer">
//               <div className="w-20 h-20 bg-linear-to-r from-emerald-500 to-green-600 rounded-3xl flex items-center justify-center shadow-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 mx-auto">
//                 <span className="text-3xl">🧠</span>
//               </div>
//               <h4 className="text-2xl font-bold text-gray-800 mb-4 text-center">AI Decision Support</h4>
//               <p className="text-lg text-gray-700 leading-relaxed text-center">Real-time clinical recommendations and drug interaction analysis</p>
//             </div>
            
//             <div className="group p-8 rounded-3xl bg-linear-to-br from-orange-50 to-yellow-50 border border-orange-200 hover:shadow-2xl hover:-translate-y-3 hover:bg-orange-100 transition-all duration-500 cursor-pointer">
//               <div className="w-20 h-20 bg-glinear-to-r from-orange-500 to-yellow-500 rounded-3xl flex items-center justify-center shadow-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 mx-auto">
//                 <span className="text-3xl">📦</span>
//               </div>
//               <h4 className="text-2xl font-bold text-gray-800 mb-4 text-center">Smart Inventory</h4>
//               <p className="text-lg text-gray-700 leading-relaxed text-center">Predictive stock management with automated reordering</p>
//             </div>
            
//             <div className="group p-8 rounded-3xl bg-linear-to-br from-blue-50 to-indigo-50 border border-blue-200 hover:shadow-2xl hover:-translate-y-3 hover:bg-blue-100 transition-all duration-500 cursor-pointer">
//               <div className="w-20 h-20 bg-linear-to-r from-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center shadow-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 mx-auto">
//                 <span className="text-3xl">🛡️</span>
//               </div>
//               <h4 className="text-2xl font-bold text-gray-800 mb-4 text-center">Patient Safety</h4>
//               <p className="text-lg text-gray-700 leading-relaxed text-center">Automated compliance checks and safety alerts</p>
//             </div>
//           </div>
//         </div>

//         {/* CALL TO ACTION */}
//         <div className="bg-linear-to-r from-emerald-600 to-emerald-700 text-white p-12 lg:p-16 rounded-4xl shadow-2xl text-center hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 border border-emerald-500/50">
//           <div className="w-24 h-24 bg-white/20 rounded-4xl flex items-center justify-center mx-auto mb-8 shadow-2xl backdrop-blur-xl">
//             <span className="text-4xl">🚀</span>
//           </div>
//           <h3 className="text-4xl lg:text-5xl font-black mb-6 bg-linear-to-r from-white to-emerald-100 bg-clip-text text-transparent">
//             Ready to Transform Your Pharmacy?
//           </h3>
//           <p className="text-2xl font-light mb-10 text-emerald-100 max-w-2xl mx-auto leading-relaxed">
//             Join thousands of pharmacies already revolutionizing patient care with PharmAgent
//           </p>
//           <button className="px-12 py-6 bg-white text-emerald-700 font-black text-xl rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 tracking-wide uppercase">
//             Start Free Trial
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }







export default function About() {
  return (
    <>
      {/* CONTENT - Compact */}
      <div className="w-[92%] mx-auto my-6">
        {/* HEADER - Smaller */}
        <div className="text-center mb-8 bg-linear-to-br from-emerald-500/10 to-green-500/10 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-emerald-100">
          <h1 className="text-3xl lg:text-4xl font-bold  mb-4 bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            About PharmAgent
          </h1>
          <p className="text-lg font-semibold text-emerald-800 max-w-xl mx-auto">
            AI-Driven Pharmacy Management System
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* MISSION */}
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-emerald-100 hover:shadow-2xl hover:-translate-y-1 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Our Mission</h3>
            </div>
            <p className="text-sm leading-relaxed text-gray-700">
              Empower pharmacies with AI agents that streamline medicine management, 
              ensure patient safety, and provide real-time insights.
            </p>
          </div>

          {/* TECHNOLOGY */}
          <div className="bg-linear-to-br from-emerald-50 to-green-50 p-6 rounded-2xl shadow-xl border border-emerald-200 hover:shadow-2xl hover:-translate-y-1 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-linear-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Our Technology</h3>
            </div>
            <p className="text-sm leading-relaxed text-gray-700">
              Advanced LLMs, secure cloud infrastructure, human-in-the-loop validation, 
              and enterprise-grade safety protocols.
            </p>
          </div>
        </div>

        {/* CTA - Compact */}
        <div className="mt-8 p-8 bg-linear-to-r from-emerald-600 to-emerald-700 text-white rounded-3xl shadow-2xl text-center hover:shadow-3xl hover:-translate-y-1 transition-all">
          <h3 className="text-2xl font-bold mb-4 bg-linear-to-r from-white to-emerald-100 bg-clip-text text-transparent">
            Transform Your Pharmacy Today
          </h3>
          <button className="px-8 py-3 bg-white text-emerald-700 font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
            Start Free Trial
          </button>
        </div>
      </div>
    </>
  );
}
