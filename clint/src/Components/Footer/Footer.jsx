import './Footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-section">
                    <h4>About Us</h4>
                    <p>Your go-to place for the best books across genres. Discover, read, and enjoy!</p>
                </div>
                <div className="footer-section">
                    <h4>Contact Us</h4>
                    <p>Email: <a href="supportbookMandu@gmail.com">supportbookMandu@gmail.com</a></p>
                    <p>Phone: +977 9865986060 </p>
                </div>
                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <ul className="social-links">
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">Twitter</a></li>
                        <li><a href="#">Instagram</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Your Bookstore. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
