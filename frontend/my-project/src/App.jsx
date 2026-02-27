// import './App.css';
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import SignupPage from './Signup';
// import MedicalTracking from './MedicalTracking';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           {/* Auth Flow */}
//           <Route path="/" element={<SignupPage />} />
//           <Route path="/signup" element={<SignupPage />} />
//           <Route path="/medical-tracking" element={<MedicalTracking />} />
          
//           {/* Fallback */}
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;



import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from './Signup';
import MedicalTracking from './MedicalTracking';

// User pages
import Home from './pages/user/Home';
import About from './pages/user/About';
import Orders from './pages/user/Orders';
import History from './pages/user/History';
import Profile from './pages/user/Profile';

// Admin pages
import Dashboard from './pages/admin/Dashboard';
import Customers from './pages/admin/Customers';
import Analytics from './pages/admin/Analytics';
import Inventory from './pages/admin/Inventory';
import AdminProfile from './pages/admin/AdminProfile';

// Layouts
import UserLayout from './Layout/UserLayout';
import AdminLayout from './Layout/AdminLayout';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* ⭐ PRIORITY 1: Auth Flow (No Layout) */}
          <Route path="/" element={<SignupPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/medical-tracking" element={<MedicalTracking />} />
          
          {/* ⭐ PRIORITY 2: User Routes (With UserLayout) */}
          <Route path="/user" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="orders" element={<Orders />} />
            <Route path="history" element={<History />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          
          {/* ⭐ PRIORITY 3: Admin Routes (With AdminLayout) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="customers" element={<Customers />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
