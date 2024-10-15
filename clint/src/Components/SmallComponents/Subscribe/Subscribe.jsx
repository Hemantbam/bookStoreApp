import  { useState } from 'react';
import './Subscribe.css';
import RedSubmitBtn from '../Button/RedSubmitBtn';

function Subscribe() {
    const [email, setEmail] = useState('');

    /**Handel the mail for subscription */
    const handleSubscribe = () => {
        if (!email) return;
        const subject = encodeURIComponent("Request for subscription");
        const body = encodeURIComponent(`Hello Sir/Madam, I would like to subscribe with the email: ${email}`);
        const mailTo = `mailto:bookMandu@example.com?subject=${subject}&body=${body}`;

        window.location.href = mailTo;
        setEmail('');
    };

    return (
        <>
            <div className='signUpContainer'>
                <span className='topSignupText'>Sign Up and Save</span>
                <span className='subscribeText'>
                    Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
                </span>
                <div className="submission">
                    <input
                        type="email"
                        placeholder='Email'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <RedSubmitBtn btnName="Subscribe" onClick={handleSubscribe} />
                </div>
            </div>
        </>
    );
}

export default Subscribe;
