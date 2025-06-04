import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { route } from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
   
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} /> {/* Hoofd dashboard route */}
      </Routes>
    </Router>
  );
}

export default App
