import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { questionBank } from '../questions';
import { topics } from '../components/topics';
import { FaClock, FaRedo, FaHome } from 'react-icons/fa';

// Firebase Imports
import { auth, db } from '../firebase';
import { ref, runTransaction, onValue } from "firebase/database"; 

function Quiz() {
  const { id } = useParams();
  const topicId = parseInt(id);
  const currentTopic = topics.find(t => t.id === topicId);

  // State
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [animate, setAnimate] = useState(false);

  // --- EFFECT 1: FETCH QUESTIONS (Hardcoded + Admin Cloud Questions) ---
  useEffect(() => {
    // 1. Start with hardcoded questions
    const initialQuestions = questionBank[topicId] || [];
    setAllQuestions(initialQuestions);

    // 2. Listen for new questions from Admin Panel
    const questionsRef = ref(db, `questions/${topicId}`);
    
    // onValue listens for changes in real-time
    const unsubscribe = onValue(questionsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const cloudQuestions = Object.values(data);
        // Combine hardcoded + new cloud questions
        setAllQuestions([...initialQuestions, ...cloudQuestions]);
      }
    });

    return () => unsubscribe();
  }, [topicId]);

  // --- EFFECT 2: TIMER LOGIC ---
  useEffect(() => {
    if (showScore || allQuestions.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNextQuestion(false); // Time up!
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, showScore, allQuestions]);


  // --- GAME LOGIC ---
  const handleAnswerClick = (selectedOption) => {
    const isCorrect = selectedOption === allQuestions[currentQuestionIndex].answer;
    if (isCorrect) setScore(score + 1);
    handleNextQuestion(isCorrect);
  };

  const handleNextQuestion = (lastWasCorrect) => {
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < allQuestions.length) {
      setCurrentQuestionIndex(nextQuestion);
      setTimeLeft(30);
      setAnimate(true);
      setTimeout(() => setAnimate(false), 500);
    } else {
      finishQuiz(lastWasCorrect ? score + 1 : score);
    }
  };

  const finishQuiz = (finalScore) => {
    setShowScore(true);
    
    // 1. Save Locally (For Dashboard Checkmarks)
    const userId = auth.currentUser ? auth.currentUser.uid : 'guest';
    localStorage.setItem(`${userId}-topic-${topicId}`, finalScore);
    localStorage.setItem(`${userId}-topic-${topicId}-total`, allQuestions.length);

    // 2. Save to Cloud Leaderboard (Realtime DB)
    if (auth.currentUser) {
      const userRef = ref(db, 'users/' + auth.currentUser.uid);

      runTransaction(userRef, (userData) => {
        if (userData) {
          // Add to existing score
          userData.totalPoints = (userData.totalPoints || 0) + finalScore;
          userData.name = auth.currentUser.displayName;
          userData.photo = auth.currentUser.photoURL;
        } else {
          // Create new user entry
          return {
            name: auth.currentUser.displayName,
            photo: auth.currentUser.photoURL,
            totalPoints: finalScore
          };
        }
        return userData;
      });
    }
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowScore(false);
    setTimeLeft(30);
  };

  // --- LOADING STATE ---
  if (allQuestions.length === 0) {
    return (
      <div className="app-container" style={{textAlign: 'center', padding: '50px'}}>
        <h2>Loading Questions...</h2>
      </div>
    );
  }

  // --- RENDER GAME OVER SCREEN ---
  if (showScore) {
    return (
      <div className="app-container">
        <div className="score-card">
          <div className="score-header">
            <h2>Quiz Completed!</h2>
            <p>You mastered {currentTopic?.title}</p>
          </div>
          
          <div className="score-circle">
            <span>{score}</span>
            <small>out of {allQuestions.length}</small>
          </div>

          <div className="score-actions">
            <button onClick={restartQuiz} className="action-btn retry">
              <FaRedo /> Try Again
            </button>
            <Link to="/" className="action-btn home">
              <FaHome /> Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER QUIZ GAME ---
  return (
    <div className="app-container">
      <div className={`quiz-game-card ${animate ? 'fade-in' : ''}`}>
        
        {/* Header: Progress & Timer */}
        <div className="quiz-top-bar">
          <div className="progress-indicator">
            <span className="question-number">Question {currentQuestionIndex + 1}</span>
            <span className="total-count">/{allQuestions.length}</span>
          </div>
          
          <div className={`timer-box ${timeLeft < 10 ? 'danger' : ''}`}>
            <FaClock /> {timeLeft}s
          </div>
        </div>

        {/* Progress Bar Visual */}
        <div className="progress-track">
          <div 
            className="progress-bar-fill" 
            style={{width: `${((currentQuestionIndex + 1) / allQuestions.length) * 100}%`}}
          ></div>
        </div>

        {/* The Question */}
        <div className="question-section">
          <h3>{allQuestions[currentQuestionIndex].question}</h3>
        </div>

        {/* The Options */}
        <div className="options-grid">
          {allQuestions[currentQuestionIndex].options.map((option, index) => (
            <button 
              key={index} 
              onClick={() => handleAnswerClick(option)}
              className="option-card"
            >
              <span className="option-letter">{String.fromCharCode(65 + index)}</span>
              <span className="option-text">{option}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Quiz;