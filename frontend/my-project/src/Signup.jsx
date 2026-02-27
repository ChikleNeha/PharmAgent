import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUserSignup = (e) => {
    e.preventDefault();
    console.log('User signup:', { name, email, password });
    navigate('/MedicalTracking');
  };

  const handleAdminSignup = (e) => {
    e.preventDefault();
    console.log('Admin signup:', { name, email, password });
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full border border-green-200">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
          Welcome to PharmAgent
        </h1>
        
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-400"
          />
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-400"
          />
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-400"
          />
          
          <button
            onClick={handleUserSignup}
            className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg font-semibold"
          >
            Sign up as User
          </button>
          
          <button
            onClick={handleAdminSignup}
            className="w-full bg-green-700 hover:bg-green-800 text-white p-3 rounded-lg font-semibold"
          >
            Sign up as Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;