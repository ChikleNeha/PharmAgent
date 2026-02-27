import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from './Signup';
import MedicalTracking from './MedicalTracking';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Auth Flow */}
          <Route path="/" element={<SignupPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/medical-tracking" element={<MedicalTracking />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
