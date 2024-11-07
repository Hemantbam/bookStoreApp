import { useState } from 'react';
import './Subscribe.css';
import RedSubmitBtn from '../Button/RedSubmitBtn';
import { addUserToSubscriberList } from '../../../api/subscribe.js';
import Swal from 'sweetalert2';

function Subscribe() {
    const [userEmail, setUserEmail] = useState('');

    const handleSubscribe = async () => {
        if (!userEmail) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter a valid email address!',
            });
            return;
        }

        const response = await addUserToSubscriberList(userEmail);

        if (response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Subscribed!',
                text: response.data.message,
            });
            setUserEmail('');
            
        } else if (response.status === 400) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: response.data.message,
            });
        } else if (response.status === 409) {
            Swal.fire({
                icon: 'error',
                title: 'opps!!',
                text: response.error.message,
            });

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Server Error',
                text: 'Something went wrong. Please try again later.',
            });
        }
    };

    return (
        <div className='signUpContainer'>
            <span className='topSignupText'>Sign Up and Place Orders</span>
            <span className='subscribeText'>
                Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </span>
            <div className="submission">
                <input
                    type="email"
                    placeholder='Email'
                    id='email'
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                />
                <RedSubmitBtn btnName="Subscribe" onClick={handleSubscribe} />
            </div>
        </div>
    );
}

export default Subscribe;
