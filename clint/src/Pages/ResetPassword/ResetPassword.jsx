import { useState } from 'react';
import './ResetPassword.css';
import { createOtp } from '../../api/otpVerify';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { userEmailContext } from '../../Context/context';

const ResetPassword = () => {
  const { email, setEmail } = useContext(userEmailContext);

  const [userEmail, setUserEmail] = useState('')
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');


  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setEmail(userEmail)
    try {
      const response = await createOtp(userEmail);

      if (response.status === 404) {
        setError("User not found");
        setMessage('')
        setTimeout(() => {
          setError('');
        }, 3000)
        return;
      }

      setMessage('A reset OTP  has been sent to your email.');
      setTimeout(() => {
        setMessage('')
        setError('')
      }, 3000);

      setTimeout(() => {
        navigate('/otpVerification')
      }, 3000)

      setError('');

    } catch (err) {
      setError('Failed to send reset password email.');
    }

  };

  return (
    <div className="container">
      <div className="formBox">
        <h2>Reset Password</h2>
        {error && <span className="errorMessage">{error}</span>}
        {message && <span className="successMessage">{message}</span>}
        <form onSubmit={handleSubmit}>
          <div className="emailArea">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submitBtn">
            Send otp
          </button>
        </form>
        <span><Link to="/">  Back to homepage</Link></span>
      </div>
    </div>
  );
};

export default ResetPassword;
