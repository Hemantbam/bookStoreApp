import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './NavigationBar.css';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import CartContext from '../../Context/CartContext';

function NavigationBar() {
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [email, setEmail] = useState();
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const { books } = useContext(CartContext)
    const cartItemLength = books.length
    const navigate = useNavigate();

    const verifyToken = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            return setIsLoggedin(false)
        }
        setIsLoggedin(true);
        const decodedtoken = jwtDecode(token);
        setEmail(decodedtoken.email);
    }

    useEffect(() => {
        verifyToken();
    }, [isLoggedin]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedin(false);
    };

    return (
        <>
            <nav>
                <div className="logo">
                    <Link to="/">
                        <img src="/Images/bookLogo.png" alt="Book Logo" />

                    </Link>
                </div>
                <div className="pagesOption">
                    <Link to="/">
                        <span>Home</span>
                    </Link>
                    <Link to="/about">
                        <span>About Us</span>
                    </Link>
                    <Link to="/textbooks">
                        <span>Text Books</span>
                    </Link>
                </div>

                <div className="userAccount">
                    {!isLoggedin ? (
                        <Link to="/login">
                            <button className='login'>Log In</button>
                        </Link>
                    ) : (
                        <div className='afterLoggedIn'>
                            <span className='welcomeMessage'>Welcome, {email}</span>
                            <div
                                className="useracc"
                                onMouseEnter={() => setDropdownVisible(true)}
                                onMouseLeave={() => setDropdownVisible(false)}
                            >
                                <img src="Images/user.png" alt="" />
                                {dropdownVisible && (
                                    <div className="dropDownContent">
                                        <a href="#">Profile</a>
                                        <a href="#" onClick={handleLogout}>Logout</a>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    <div className="cartIcon">
                        <Link to="/cart">
                            <div className="count">{cartItemLength}</div>
                            <img src="./Images/cartIcon.png" alt="" />
                        </Link>

                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavigationBar;
