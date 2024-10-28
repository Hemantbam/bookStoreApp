import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { generateOtpForUserRegistration } from '../../api/authApi';
import { useContext } from 'react';
import { userEmailContext } from '../../Context/context';
import '../Login/login.css';

const RegisterForm = () => {
  const { email, setEmail, password, setPassword } = useContext(userEmailContext);
  const [userEmail, setUseremail] = useState('');
  const [userPassword, setUserpassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      setEmail(userEmail);
      setPassword(userPassword);

      const result = await generateOtpForUserRegistration(userEmail);
      console.log(result.status)
      console.log(result.data.message)
      if (result.status === 409) {
         setError(result.data.message)
        setSuccessMessage('');
        return
      }
      if (result.status === 200) {
        setError("")
         setSuccessMessage(result.data.message);
        console.log("OTP sent successfully");
      console.log("message",successMessage)

        navigate('/registerOtpVerification');
      } else {
        setError('Registration failed');
        setSuccessMessage('');

      }
    } catch (err) {
      console.log(err);
      setError(err.message);
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
              value={userEmail}
              onChange={(e) => setUseremail(e.target.value)}
              required
            />
          </div>
          <div className="passwordArea">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="password"
              value={userPassword}
              onChange={(e) => setUserpassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submitBtn">Sign Up</button>
        </form>
        <span>
          Already have an account?{' '}
          <Link to="/login" className="register-link">Login here</Link>
        </span>
      </div>
    </div>
  );
};

export default RegisterForm;
