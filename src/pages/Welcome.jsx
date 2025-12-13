import React from 'react';
import { Link } from 'react-router-dom';
import { FaRocket, FaBrain, FaTrophy, FaChartLine } from 'react-icons/fa';

function Welcome() {
  return (
    <div className="welcome-container">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="badge-pill">🚀 The #1 Aptitude Platform</span>
          <h1 className="hero-title">Master Your <span className="highlight">Aptitude</span> Skills</h1>
          <p className="hero-subtitle">
            Prepare for interviews, competitive exams, and sharpen your brain with our interactive quizzes and real-time tracking.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="primary-btn-lg">Get Started Free</Link>
            <Link to="/login" className="secondary-btn-lg">I have an account</Link>
          </div>
        </div>
        <div className="hero-image">
          {/* Abstract illustration using CSS shapes or an image */}
          <div className="floating-card card-1"><FaBrain /> Logic</div>
          <div className="floating-card card-2"><FaChartLine /> Data</div>
          <div className="floating-card card-3"><FaTrophy /> Success</div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section">
        <h2>Why choose IndiaBix Portal?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="f-icon"><FaRocket /></div>
            <h3>Fast Learning</h3>
            <p>Bite-sized quizzes designed to help you learn concepts quickly.</p>
          </div>
          <div className="feature-card">
            <div className="f-icon"><FaChartLine /></div>
            <h3>Track Progress</h3>
            <p>Visual dashboards to see your growth and improvements over time.</p>
          </div>
          <div className="feature-card">
            <div className="f-icon"><FaTrophy /></div>
            <h3>Compete & Win</h3>
            <p>Earn badges and challenge yourself to beat your own high scores.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Welcome;