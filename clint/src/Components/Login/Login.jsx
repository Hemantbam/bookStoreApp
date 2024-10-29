import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/authApi';
import './Login.css';
import { jwtDecode } from 'jwt-decode';
const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const data = await loginUser(email, password);
            if (!data) {
                setError('User Details not found');
            }
            console.log(data)
            localStorage.setItem('token', data.token);
            const token = localStorage.getItem('token');

            const decodedToken = jwtDecode(token);
            setError('')
            setSuccessMessage('Login successful!');
            if (decodedToken.role == 'admin') {
                setTimeout(() => navigate('/adminDashboard'), 1000);
                return;
            } else {
                setTimeout(() => navigate('/'), 1000);

            }
        } catch (err) {
            setError('Login failed. Please check your details');
        }
    };

    return (
        <>
            <div className="container">
                <div className="formBox">
                    <h2>Login</h2>
                   {error && <p className='errorMessage'>{error}</p> }
                  {successMessage &&  <p className='successMessage'>{successMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="emailArea">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder='email' value={email} onChange={(event) => { setEmail(event.target.value) }} required />
                        </div>
                        <div className="passwordArea">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder='password' value={password} onChange={(event) => { setPassword(event.target.value) }} required />
                        </div>
                        <button type="submit" className="submitBtn">Login</button>
                    </form>

                    <span>Don't have an account ? <Link to="/register">Register </Link></span>
                    <span> <Link to="/resetPassword">Forget Password</Link></span>
                    <span><Link to="/">Go to homepage</Link></span>

                </div>
            </div>
        </>
    );
};

export default Login;
