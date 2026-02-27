import React from 'react';
import { createRoot } from 'react-dom/client';
import Signup from './Signup.jsx';

function App() {
  return <Signup />;
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

export default App;  // ← ADD THIS LINE

