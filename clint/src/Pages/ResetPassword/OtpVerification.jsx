import { useState } from 'react';
import './ResetPassword.css';
import { createOtp } from '../../api/otpVerify';
import { resetPassword } from '../../api/otpVerify';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { userEmailContext } from '../../Context/context';
const OtpVerification = () => {
    const { email, setEmail } = useContext(userEmailContext);

    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            if (email.trim() !== '' && password.trim() !== '' && otp.trim() !== '' && otp.length === 6) {
                const response = await resetPassword(email, password, otp)
                console.log(response)

                if (response.status === 409) {
                    setError(response.err.message)
                    setMessage('')
                    setTimeout(() => {
                    })

                    return

                }
                if (response.status === 400) {
                    setError(response.err.message)
                    setMessage('')
                    setTimeout(() => {
                    })
                    return
                }

                if (response.message) {
                    setMessage(response.message)
                    setError("")
                    setTimeout(() => {
                        navigate('/login')
                    }, 3000)
                    return
                }
            }
            return (setError("Invalid Inputs please check the details")
                , setMessage(''))
        } catch (err) {
            console.log(err)
        }

    };

    const regenerateOtp = async () => {
        await createOtp(email);
        setError('')
        setMessage("OTP resend Successfully")
        setTimeout(()=>{
            setError('')
            setMessage('')
        },3000)
      }

    return (
        <div className="container">
            <div className="formBox">
                <h2>Reset Password</h2>
                {error && <span className="errorMessage">{error}</span>}
                {message && <span className="successMessage">{message}</span>}
                <form onSubmit={handleSubmit}>
                    <div className="emailArea">

                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />


                        <label htmlFor="otp">Otp</label>
                        <input
                            type="number"
                            id="otp"
                            placeholder="Enter your 6 digit otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submitBtn">
                        Update password
                    </button>
                </form>
                <span onClick={regenerateOtp} className='resentOtpBtn'>Resend Otp</span>
                <span><Link to="/">  Back to homepage</Link></span>
            </div>
        </div>
    );
};

export default OtpVerification;
