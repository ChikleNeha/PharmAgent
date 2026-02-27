// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const SignupPage = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleUserSignup = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsLoading(true);
//     console.log('User signup:', { name, email, password });
    
//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false);
//       navigate('/medical-tracking');
//     }, 1000);
//   };

//   const handleAdminSignup = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsLoading(true);
//     console.log('Admin signup:', { name, email, password });
    
//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false);
//       navigate('/admin');
//     }, 1000);
//   };

//   return (
//     <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
//       <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full border border-green-200">
//         <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
//           Welcome to PharmAgent
//         </h1>
        
//         <form className="space-y-4" onClick={(e) => e.stopPropagation()}>
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
//             disabled={isLoading}
//           />
          
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
//             disabled={isLoading}
//           />
          
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
//             disabled={isLoading}
//           />
          
//           <button
//             type="button"
//             onClick={handleUserSignup}
//             disabled={isLoading}
//             className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white p-3 rounded-lg font-semibold transition-all disabled:cursor-not-allowed"
//           >
//             {isLoading ? 'Creating Account...' : 'Sign up as User'}
//           </button>
          
//           <button
//             type="button"
//             onClick={handleAdminSignup}
//             disabled={isLoading}
//             className="w-full bg-green-700 hover:bg-green-800 disabled:bg-green-500 text-white p-3 rounded-lg font-semibold transition-all disabled:cursor-not-allowed"
//           >
//             {isLoading ? 'Creating Account...' : 'Sign up as Admin'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userLoading, setUserLoading] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);
  const navigate = useNavigate();

  const handleUserSignup = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setUserLoading(true);
    console.log('User signup:', { name, email, password });
    
    // Simulate API call
    setTimeout(() => {
      setUserLoading(false);
      navigate('/medical-tracking');
    }, 1000);
  };

  const handleAdminSignup = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAdminLoading(true);
    console.log('Admin signup:', { name, email, password });
    
    // Simulate API call
    setTimeout(() => {
      setAdminLoading(false);
      navigate('/admin');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full border border-green-200">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
          Welcome to PharmAgent
        </h1>
        
        <form className="space-y-4" onClick={(e) => e.stopPropagation()}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
            disabled={userLoading || adminLoading}
          />
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
            disabled={userLoading || adminLoading}
          />
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent"
            disabled={userLoading || adminLoading}
          />
          
          <button
            type="button"
            onClick={handleUserSignup}
            disabled={userLoading || adminLoading}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white p-3 rounded-lg font-semibold transition-all disabled:cursor-not-allowed"
          >
            {userLoading ? 'Creating Account...' : 'Sign up as User'}
          </button>
          
          <button
            type="button"
            onClick={handleAdminSignup}
            disabled={userLoading || adminLoading}
            className="w-full bg-green-700 hover:bg-green-800 disabled:bg-green-500 text-white p-3 rounded-lg font-semibold transition-all disabled:cursor-not-allowed"
          >
            {adminLoading ? 'Creating Account...' : 'Sign up as Admin'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;










