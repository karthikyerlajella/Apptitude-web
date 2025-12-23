import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { auth, signOut } from './firebase';

// Import Pages
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import Study from './pages/Study'; 
import Admin from './pages/Admin';
import DailyChallenge from './pages/DailyChallenge'; // <--- NEW IMPORT

// Import Components
import Games from './components/Games'; 

import './App.css';

function App() {
  const [user, setUser] = useState(null);

  // Initialize Dark Mode
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Apply Dark Mode Class
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <Router>
      <div className="app-container">
        {/* NAVBAR */}
        <nav className="navbar">
          <div className="nav-content">
            <div className="logo">IndiaBix Portal</div>
            
            <div className="nav-links">
              {/* Theme Toggle */}
              <button 
                className="theme-toggle" 
                onClick={() => setDarkMode(!darkMode)}
                title="Toggle Dark Mode"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>

              <Link to="/" className="nav-link">Dashboard</Link>
              
              {user ? (
                <>
                  <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
                  <Link to="/games" className="nav-link" style={{ color: '#10b981' }}>🎮 Games</Link>
                  <Link to="/admin" className="nav-link" style={{color: '#f59e0b'}}>Admin</Link>
                  <Link to="/profile" className="nav-link">
                    Hi, {user.displayName ? user.displayName.split(' ')[0] : 'User'}
                  </Link>
                  <button onClick={handleLogout} className="nav-btn" style={{background: '#ef4444'}}>Logout</button>
                </>
              ) : (
                <Link to="/login" className="nav-btn">Login</Link>
              )}
            </div>
          </div>
        </nav>

        {/* CONTENT */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={user ? <Dashboard /> : <Welcome />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/quiz/:id" element={<Quiz />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leaderboard" element={<Leaderboard />} /> 
            <Route path="/study/:id" element={<Study />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/games" element={<Games />} />
            
            {/* NEW ROUTE */}
            <Route path="/daily" element={<DailyChallenge />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;