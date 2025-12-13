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

// Import Games Component
import Games from './components/Games'; 

import './App.css';

function App() {
  const [user, setUser] = useState(null);

  // 1. Dark Mode State (Initialize from localStorage)
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // 2. Auth Listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // 3. Dark Mode Side Effect (Apply class to body)
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
        {/* WRAPPER FOR NAVBAR */}
        <nav className="navbar">
          <div className="nav-content">
            <div className="logo">IndiaBix Portal</div>
            
            <div className="nav-links">
              {/* THEME TOGGLE BUTTON */}
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
                  
                  {/* Link to Games Page */}
                  <Link to="/games" className="nav-link" style={{ color: '#10b981' }}>
                    🎮 Games
                  </Link>

                  {/* ADMIN LINK (Visible to logged in users) */}
                  <Link to="/admin" className="nav-link" style={{color: '#f59e0b'}}>
                    Admin
                  </Link>

                  <Link to="/profile" className="nav-link">
                    Hi, {user.displayName ? user.displayName.split(' ')[0] : 'User'}
                  </Link>
                  <button onClick={handleLogout} className="nav-btn" style={{background: '#ef4444'}}>
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="nav-btn">Login</Link>
              )}
            </div>
          </div>
        </nav>

        {/* WRAPPER FOR PAGE CONTENT */}
        <main className="main-content">
          <Routes>
            {/* If user is logged in, show Dashboard, otherwise show Welcome */}
            <Route path="/" element={user ? <Dashboard /> : <Welcome />} />
            
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/quiz/:id" element={<Quiz />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leaderboard" element={<Leaderboard />} /> 
            <Route path="/study/:id" element={<Study />} />
            <Route path="/admin" element={<Admin />} />
            
            {/* Route for Games Page */}
            <Route path="/games" element={<Games />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;