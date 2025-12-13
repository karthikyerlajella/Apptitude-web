import React, { useState } from 'react';
import { db } from '../firebase';
import { ref, push } from "firebase/database";
import { topics } from '../components/topics';

function Admin() {
  // Form State
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [question, setQuestion] = useState('');
  const [optionA, setOptionA] = useState('');
  const [optionB, setOptionB] = useState('');
  const [optionC, setOptionC] = useState('');
  const [optionD, setOptionD] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [password, setPassword] = useState(''); // Simple security

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== "admin123") { // Simple PIN protection
      alert("Wrong Admin Password!");
      return;
    }

    try {
      // Create reference to: questions/topicID
      const questionsRef = ref(db, `questions/${selectedTopic}`);
      
      // Push new question to DB
      await push(questionsRef, {
        question: question,
        options: [optionA, optionB, optionC, optionD],
        answer: correctAnswer
      });

      alert("Question Added Successfully!");
      // Reset form
      setQuestion(''); setOptionA(''); setOptionB(''); setOptionC(''); setOptionD(''); setCorrectAnswer('');
    } catch (error) {
      alert("Error adding question: " + error.message);
    }
  };

  return (
    <div className="app-container">
      <div className="quiz-game-card">
        <h2>🛠️ Admin Panel</h2>
        <p>Add new questions to the database.</p>

        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px'}}>
          
          <label><strong>Select Topic:</strong></label>
          <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)} style={{padding: '10px'}}>
            {topics.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
          </select>

          <label><strong>Question Text:</strong></label>
          <textarea 
            placeholder="Type question here..." 
            value={question} 
            onChange={(e) => setQuestion(e.target.value)}
            style={{padding: '10px', height: '80px'}}
            required 
          />

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
            <input type="text" placeholder="Option A" value={optionA} onChange={e => setOptionA(e.target.value)} required style={{padding: '10px'}} />
            <input type="text" placeholder="Option B" value={optionB} onChange={e => setOptionB(e.target.value)} required style={{padding: '10px'}} />
            <input type="text" placeholder="Option C" value={optionC} onChange={e => setOptionC(e.target.value)} required style={{padding: '10px'}} />
            <input type="text" placeholder="Option D" value={optionD} onChange={e => setOptionD(e.target.value)} required style={{padding: '10px'}} />
          </div>

          <label><strong>Correct Answer (Must match one option exactly):</strong></label>
          <input 
            type="text" 
            placeholder="e.g. 150 m" 
            value={correctAnswer} 
            onChange={e => setCorrectAnswer(e.target.value)}
            required 
            style={{padding: '10px'}}
          />

          <label><strong>Admin Password:</strong></label>
          <input type="password" placeholder="Enter PIN" value={password} onChange={e => setPassword(e.target.value)} style={{padding: '10px'}} />

          <button type="submit" className="retry-btn">Add Question</button>
        </form>
      </div>
    </div>
  );
}

export default Admin;