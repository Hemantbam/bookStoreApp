import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../api/authApi';
import '../Login/login.css'; 

const RegisterForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  /**Handel the registration submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const data = await registerUser(email, password);
      if (data.message === 'User created successfully') {
        setSuccessMessage(data.message);
        setTimeout(() => navigate('/login'), 2000); 
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred during registration.');
    }
  };

  return (
    <div className="container"> 
      <div className="formBox">
        <h2>Sign Up</h2> 
        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="emailArea"> 
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="passwordArea">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submitBtn">Sign Up</button>
        </form>
        <span>
          Already have an account?{' '}
          <a href="/login" className="register-link">Login here</a> 
        </span>
      </div>
    </div>
  );
};

export default RegisterForm;
