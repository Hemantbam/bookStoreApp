import React, { useEffect, useState } from 'react';
import './ContactUsPage.css';
import NavigationBar from '../../Components/NavigationBar/NavigationBar';
import Footer from '../../Components/Footer/Footer';
import { addUserContactUsDetails } from '../../api/contactUsApi.js';
import Swal from 'sweetalert2';

const ContactUs = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await addUserContactUsDetails(name, email, message);
        if (response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Details Sent',
                text: response.data.message,
            });
            setName("");
            setEmail("");
            setMessage("");
            return 
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: response.error.message
            });
        }
        return 
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <NavigationBar />

            <div className="contactContainer">
                <h1>Contact Us</h1>
                <p>If you have any questions or need assistance, feel free to reach out to us:</p>
                <div className="contactInfo">
                    <h2>Contact Information</h2>
                    <p>Email: <a href="mailto:supportbookMandu@gmail.com">supportbookMandu@gmail.com</a></p>
                    <p>Phone: <a href="tel:+97712345678">+977 12345678</a></p>
                    <p>Location: Kathmandu, Nepal</p>
                </div>

                <div className="contactForm">
                    <h2>Get in Touch</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <textarea
                            name="message"
                            id="message"
                            rows="5"
                            placeholder="Your Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        ></textarea>

                        <button type="submit">Send Message</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ContactUs;
