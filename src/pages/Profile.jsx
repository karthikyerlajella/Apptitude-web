import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { FaMedal, FaStar, FaHistory, FaUserCircle } from 'react-icons/fa';

function Profile() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ totalScore: 0, quizzesTaken: 0, history: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        navigate('/login');
      } else {
        setUser(currentUser);
        calculateStats(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const calculateStats = (userId) => {
    let totalScore = 0;
    let quizzesTaken = 0;
    let history = [];

    // Loop through local storage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      // ONLY count items that start with this User's ID
      if (key.startsWith(`${userId}-topic-`) && !key.endsWith('-total')) {
        const score = parseInt(localStorage.getItem(key));
        const topicId = key.split('-')[2]; // Extract topic ID from key
        
        totalScore += score;
        quizzesTaken++;
        history.push({ topicId, score });
      }
    }
    setStats({ totalScore, quizzesTaken, history });
  };

  if (!user) return null;

  return (
    <div className="app-container">
      <div className="profile-container">
        
        {/* HEADER SECTION */}
        <div className="profile-header">
          <div className="profile-pic-wrapper">
             {/* Show Google Pic or Default Icon */}
            {user.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="profile-pic" />
            ) : (
              <FaUserCircle className="profile-icon-default" />
            )}
          </div>
          <h2>{user.displayName}</h2>
          <p>{user.email}</p>
        </div>

        {/* STATS CARDS */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon yellow"><FaStar /></div>
            <h3>{stats.quizzesTaken}</h3>
            <p>Quizzes Played</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon green"><FaMedal /></div>
            <h3>{stats.totalScore}</h3>
            <p>Total Points</p>
          </div>
        </div>

        {/* RECENT ACTIVITY SECTION */}
        <div className="history-section">
          <h3><FaHistory /> Recent Activity</h3>
          
          {stats.history.length === 0 ? (
            <div className="empty-state">
              <p>You haven't played any quizzes yet!</p>
              <Link to="/" className="start-btn">Start Your First Quiz</Link>
            </div>
          ) : (
            <ul className="history-list">
              {stats.history.map((item, index) => (
                <li key={index} className="history-item">
                  <span>Topic #{parseInt(item.topicId) + 1}</span>
                  <span className="history-score">Score: {item.score}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}

export default Profile;