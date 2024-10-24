import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userEmailContext } from '../../Context/context';
import { registerUser } from '../../api/authApi';
import './ResetPassword.css';

const RegistrationOtpVerification = () => {
  const { email, password } = useContext(userEmailContext);
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await registerUser(email, password, otp);
      console.log(response);
      
      if (response.status=== 201) {
        setMessage(response.data.message);
        setError('');
        setTimeout(() => navigate('/login'), 2000); 
      } else {
        setError(response.message);
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError('An error occurred during registration. Please try again later.');
    }
  };

  return (
    <div className="container">
      <div className="formBox">
        <h2>Verify Email</h2>
        {error && <span className="errorMessage">{error}</span>}
        {message && <span className="successMessage">{message}</span>}
        <form onSubmit={handleSubmit}>
          <div className="emailArea">
            <label htmlFor="otp">OTP</label>
            <input
              type="number"
              id="otp"
              placeholder="Enter your 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submitBtn">
            Verify Email
          </button>
        </form>
        <span>
          <Link to="/">Back to homepage</Link>
        </span>
      </div>
    </div>
  );
};

export default RegistrationOtpVerification;