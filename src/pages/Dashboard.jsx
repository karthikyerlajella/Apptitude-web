import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Static list of topics for the dashboard
  const topics = [
    { id: 'aptitude', title: 'Aptitude', count: 15, icon: '📊' },
    { id: 'logical', title: 'Logical Reasoning', count: 10, icon: '🧩' },
    { id: 'verbal', title: 'Verbal Ability', count: 12, icon: '🗣️' },
    { id: 'programming', title: 'Programming', count: 20, icon: '💻' },
    { id: 'interview', title: 'Interview Q&A', count: 5, icon: '🤝' }
  ];

  return (
    <div>
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <p style={{ color: 'var(--text-light)' }}>Select a topic to start practicing</p>
      </div>

      {/* --- THIS IS THE DAILY CHALLENGE CARD --- */}
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <Link to="/daily" style={{ textDecoration: 'none' }}>
          <div style={{
            background: 'linear-gradient(135deg, #FF512F 0%, #DD2476 100%)',
            color: 'white',
            padding: '25px',
            borderRadius: '16px',
            maxWidth: '600px',
            margin: '0 auto',
            boxShadow: '0 10px 20px rgba(221, 36, 118, 0.3)',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            border: '2px solid rgba(255,255,255,0.2)'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <h2 style={{ margin: 0, fontSize: '1.8rem' }}>🔥 Daily Challenge</h2>
            <p style={{ margin: '10px 0 0', fontSize: '1.1rem', opacity: 0.9 }}>
              Test your skills! 5 New Questions Everyday.
            </p>
          </div>
        </Link>
      </div>

      {/* Existing Topic Grid */}
      <div className="topic-grid">
        {topics.map((topic) => (
          <Link to={`/quiz/${topic.id}`} key={topic.id} className="topic-card">
            <div className="icon-box">{topic.icon}</div>
            <div className="topic-info">
              <h3>{topic.title}</h3>
              <div className="topic-meta">
                <span>{topic.count} Questions</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;