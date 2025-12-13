import React, { useState } from 'react';
import { auth, googleProvider, signInWithPopup } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { FaGoogle, FaUserPlus, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';

function Register() {
  const navigate = useNavigate();
  
  // State to track what the user types
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle Google Sign Up
  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/'); 
    } catch (error) {
      alert("Google Error: " + error.message);
    }
  };

  // Handle Email/Password Sign Up
  const handleEmailSignUp = async (e) => {
    e.preventDefault(); // Stop page from reloading
    setLoading(true);

    try {
      // 1. Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Update their profile with the Name they typed
      await updateProfile(user, {
        displayName: name
      });

      alert("Account Created Successfully!");
      navigate('/'); // Go to dashboard
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="icon-bg"><FaUserPlus /></div>
          <h2>Create an Account</h2>
          <p>Join thousands of students mastering aptitude today.</p>
        </div>

        {/* Google Button */}
        <button onClick={handleGoogleSignUp} className="google-btn-lg">
          <FaGoogle /> Sign up with Google
        </button>

        <div className="divider">
          <span>or register with email</span>
        </div>

        {/* Email Registration Form */}
        <form className="auth-form" onSubmit={handleEmailSignUp}>
          
          {/* Full Name Input */}
          <div className="input-group">
            <label>Full Name</label>
            <div className="input-wrapper">
              <FaUser className="input-icon" />
              <input 
                type="text" 
                placeholder="John Doe" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="input-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input 
                type="email" 
                placeholder="john@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
          </div>

          {/* Password Input (NEW) */}
          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input 
                type="password" 
                placeholder="At least 6 characters" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                minLength="6"
              />
            </div>
          </div>

          <button type="submit" className="primary-btn-lg" style={{width: '100%', marginTop: '10px'}} disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Log in here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;