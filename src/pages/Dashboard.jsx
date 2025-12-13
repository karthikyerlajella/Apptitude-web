import React, { useEffect, useState } from 'react';
import { topics } from '../components/topics';
import { Link } from 'react-router-dom';
import { auth } from '../firebase'; // Import Auth
import { FaTrain, FaRulerVertical, FaPercentage, FaCalendarAlt, FaChartPie, FaCalculator, FaBrain } from 'react-icons/fa';
import { MdTrendingUp, MdAttachMoney } from 'react-icons/md';

const getIcon = (id) => {
  const icons = [FaCalculator, FaChartPie, FaBrain, MdTrendingUp];
  if (id === 0) return <FaTrain />;
  if (id === 1) return <FaRulerVertical />;
  if (id === 2) return <MdAttachMoney />;
  if (id === 3) return <MdTrendingUp />;
  if (id === 4) return <FaPercentage />;
  if (id === 5) return <FaCalendarAlt />;
  const IconComponent = icons[id % icons.length];
  return <IconComponent />;
};

function Dashboard() {
  const [user, setUser] = useState(null);

  // Wait for user to load so we check the right storage
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Your Learning Path</h2>
        <p className="subtitle">Master Aptitude one topic at a time</p>
      </div>

      <div className="topic-grid">
        {topics.map((topic) => {
          // Check storage using the unique User ID
          const userId = user ? user.uid : 'guest';
          const savedScore = localStorage.getItem(`${userId}-topic-${topic.id}`);
          const totalQuestions = localStorage.getItem(`${userId}-topic-${topic.id}-total`);
          const isCompleted = savedScore !== null;

          return (
            // Changed from Link to div so buttons inside work correctly
            <div key={topic.id} className={`topic-card ${isCompleted ? 'completed' : ''}`}>
              <div className="icon-wrapper">
                {getIcon(topic.id)}
              </div>
              
              <div className="card-content">
                <span className="topic-title">{topic.title}</span>
                <div className="meta-info">
                   <span className="topic-id">Topic #{topic.id + 1}</span>
                   {isCompleted && <span className="score-badge">✅ {savedScore}/{totalQuestions}</span>}
                </div>
                
                <div className="progress-bg">
                  <div className="progress-fill" style={{width: isCompleted ? '100%' : '0%'}}></div>
                </div>

                {/* NEW ACTION BUTTONS */}
                <div style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
                    <Link to={`/quiz/${topic.id}`} className="nav-btn" style={{flex: 1, textAlign: 'center', fontSize: '0.9rem'}}>
                        Start Quiz
                    </Link>
                    <Link to={`/study/${topic.id}`} className="back-btn" style={{flex: 1, textAlign: 'center', padding: '8px', fontSize: '0.9rem'}}>
                        📖 Study
                    </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;