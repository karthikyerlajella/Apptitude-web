import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { questionBank } from '../questions';
import { topics } from '../components/topics';
import { FaArrowLeft, FaArrowRight, FaEye, FaLightbulb } from 'react-icons/fa';

function Study() {
  const { id } = useParams();
  const topicId = parseInt(id);
  const currentTopic = topics.find(t => t.id === topicId);
  const questions = questionBank[topicId]; // Currently reading from file

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  if (!questions) return <div className="app-container" style={{textAlign:'center', padding: '50px'}}>Content Coming Soon</div>;

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowAnswer(false); // Hide answer for next question
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowAnswer(false);
    }
  };

  return (
    <div className="app-container">
      <div className="quiz-game-card">
        {/* Header */}
        <div className="quiz-top-bar">
          <Link to="/" className="back-btn" style={{padding: '5px 15px', fontSize: '0.9rem'}}>Exit Study</Link>
          <div className="progress-indicator">
            <span style={{color: '#4f46e5', fontWeight: 'bold'}}>Study Mode</span>
          </div>
        </div>

        {/* Question Area */}
        <div className="question-section" style={{minHeight: '150px'}}>
          <h4 style={{color: '#64748b', marginBottom: '10px'}}>{currentTopic?.title} • Q{currentQuestionIndex + 1}</h4>
          <h3>{questions[currentQuestionIndex].question}</h3>
        </div>

        {/* Options (Non-clickable for scoring, just visual) */}
        <div className="options-grid">
          {questions[currentQuestionIndex].options.map((option, index) => {
            const isCorrect = option === questions[currentQuestionIndex].answer;
            // If answer is shown, highlight the correct one Green
            const borderStyle = showAnswer && isCorrect ? '2px solid #10b981' : '2px solid #e2e8f0';
            const bgStyle = showAnswer && isCorrect ? '#d1fae5' : 'white';

            return (
              <div key={index} className="option-card" style={{border: borderStyle, background: bgStyle, cursor: 'default'}}>
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <span className="option-text">{option}</span>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="actions" style={{marginTop: '30px', justifyContent: 'space-between'}}>
          <button onClick={handlePrev} className="back-btn" disabled={currentQuestionIndex === 0}>
            <FaArrowLeft /> Prev
          </button>

          <button 
            onClick={() => setShowAnswer(!showAnswer)} 
            className="retry-btn" 
            style={{background: '#f59e0b', width: 'auto'}}
          >
            {showAnswer ? <span>Hide Answer</span> : <span><FaEye /> Show Answer</span>}
          </button>

          <button onClick={handleNext} className="retry-btn" disabled={currentQuestionIndex === questions.length - 1}>
            Next <FaArrowRight />
          </button>
        </div>
        
        {/* Explanation Box (Optional) */}
        {showAnswer && (
          <div style={{marginTop: '20px', padding: '15px', background: '#ecfdf5', borderRadius: '12px', color: '#064e3b', display: 'flex', gap: '10px', alignItems: 'center'}}>
            <FaLightbulb style={{fontSize: '1.2rem'}} />
            <span><strong>Correct Answer:</strong> {questions[currentQuestionIndex].answer}</span>
          </div>
        )}

      </div>
    </div>
  );
}

export default Study;