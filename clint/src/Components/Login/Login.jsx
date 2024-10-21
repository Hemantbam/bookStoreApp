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
        setError('');
        setSuccessMessage('');

        try {

            const data = await loginUser(email, password);
            localStorage.setItem('token', data.token);
            const token = localStorage.getItem('token');

            const decodedToken = jwtDecode(token);
            setSuccessMessage('Login successful!');
            if (decodedToken.role == 'admin') {
                setTimeout(() => navigate('/adminDashboard'), 1000);
                return;
            }

            setTimeout(() => navigate('/'), 1000);


        } catch (err) {
            setError('Login failed. Please check your details');
        }
    };

    return (
        <>
            <div className="container">
                <div className="formBox">
                    <h2>Login</h2>
                    <span className='errorMessage'>{error}</span>
                    <span className='successMessage'>{successMessage}</span>
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
