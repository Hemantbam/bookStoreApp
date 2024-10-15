import React, { useState } from 'react';
import axios from 'axios';
import './LoginSignupForm.css';

const LoginSignupForm = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isSignup ? 'http://localhost:8080/register' : 'http://localhost:8080/login'; 

        try {
            const response = await axios.post(url, {
                email: isSignup ? email : undefined,
                password,
            });
            alert("Success: " + response.data.message);
            console.log(response.data);
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="container">
            <div className="form-box">
                <h2 className="form-title">{isSignup ? 'Sign Up' : 'Login'}</h2>

                <form onSubmit={handleSubmit}>
                    {isSignup && (
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    )}

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {isSignup && (
                        <div className="input-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    )}

                    <button type="submit" className="submit-btn">
                        {isSignup ? 'Sign Up' : 'Login'}
                    </button>
                </form>

                <p className="toggle-text">
                    {isSignup ? 'Already have an account?' : "Don’t have an account?"}
                    <button onClick={() => setIsSignup((prev) => !prev)} className="toggle-btn">
                        {isSignup ? 'Login' : 'Sign Up'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginSignupForm;
