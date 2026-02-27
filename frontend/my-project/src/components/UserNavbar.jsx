
// import { NavLink, useNavigate } from "react-router-dom";

// export default function UserNavbar() {
//   const navigate = useNavigate();
  
//   const navItems = [
//     { name: "Home", path: "." },
//     { name: "Orders", path: "orders" },
//     // { name: "Medical History", path: "medical-tracking" },
//     { name: "History", path: "history" },
//     { name: "About", path: "about" },
//   ];

//   return (
//     <nav className="w-[92%] mx-auto my-4 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-xl flex justify-between items-center">
//       {/* Brand */}
//       <div className="font-bold text-xl">PharmAgent</div>

//       {/* Navigation Links + Profile - Right Side */}
//       <div className="flex items-center gap-8">
//         {/* Navigation Links */}
//         <ul className="flex gap-6">
//           {navItems.map((item) => (
//             <li key={item.name}>
//               <NavLink
//                 to={item.path}
//                 className={({ isActive }) =>
//                   isActive
//                     ? "border-b-2 border-white pb-2 font-semibold hover:opacity-90"
//                     : "hover:opacity-80 transition-colors"
//                 }
//               >
//                 {item.name}
//               </NavLink>
//             </li>
//           ))}
//         </ul>

//         {/* Profile Icon */}
//         <button
//           onClick={() => navigate("profile")}
//           className="p-2 hover:bg-white/20 rounded-xl transition-all hover:scale-105"
//         >
//           <span className="text-2xl">👤</span>
//         </button>
//       </div>
//     </nav>
//   );
// }





import { NavLink, useNavigate } from "react-router-dom";

export default function UserNavbar() {
  const navigate = useNavigate();
  
  const navItems = [
    { name: "Home", path: "." },
    { name: "Orders", path: "orders" },
    // { name: "Medical History", path: "medical-tracking" },
    { name: "History", path: "history" },
    { name: "About", path: "about" },
  ];

  return (
    <nav className="w-[92%] mx-auto my-4 bg-linear-to-r from-emerald-500 to-emerald-600 text-white px-6 py-4 rounded-2xl shadow-xl flex justify-between items-center">
      {/* Brand */}
      <div className="font-bold text-xl">PharmAgent</div>

      {/* Navigation Links + Profile - Right Side */}
      <div className="flex items-center gap-8">
        {/* Navigation Links */}
        <ul className="flex gap-6">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-white pb-2 font-semibold hover:opacity-90"
                    : "hover:opacity-80 transition-colors"
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Profile Icon */}
        <button
          onClick={() => navigate("profile")}
          className="p-2 hover:bg-white/20 rounded-xl transition-all hover:scale-105"
        >
          <span className="text-2xl">👤</span>
        </button>
      </div>
    </nav>
  );
}
