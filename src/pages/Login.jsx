import React from 'react';
// Import the authentication tools we created in firebase.js
import { auth, googleProvider, signInWithPopup } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      // This line opens the Google Popup
      await signInWithPopup(auth, googleProvider);
      
      alert("Login Successful!");
      // Send user back to the Dashboard
      navigate('/'); 
    } catch (error) {
      console.error(error);
      alert("Login Failed: " + error.message);
    }
  };

  return (
    <div className="app-container" style={{textAlign: 'center', marginTop: '50px'}}>
      <div className="quiz-card" style={{maxWidth: '400px', margin: '0 auto'}}>
        <h2>Welcome Back</h2>
        <p>Sign in to save your progress permanently.</p>
        
        <button 
          onClick={handleGoogleSignIn}
          style={{
            padding: '12px 24px',
            backgroundColor: '#4285F4',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            marginTop: '20px',
            width: '100%'
          }}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;