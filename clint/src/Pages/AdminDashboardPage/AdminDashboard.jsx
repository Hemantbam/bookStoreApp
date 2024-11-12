import { useState, useEffect } from 'react';
import './AdminDashboard.css';
import Dashboard from '../../Components/AdminDashBoardComponent/AdminHomeDashboard/Dashboard';
import ManageUsers from '../../Components/AdminDashBoardComponent/ManageUsers/ManageUsers';
import ManageBooks from '../../Components/AdminDashBoardComponent/ManageBooks/ManageBooks';
import ManageContactUsQueries from '../../Components/AdminDashBoardComponent/ManageContactUsQueries/ManageContactUsQueries';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ManageSubscribers from '../../Components/AdminDashBoardComponent/ManageSubscribers/ManageSubscribers';
import ManageOrders from '../../Components/AdminDashBoardComponent/ManageOrdersDashboard/ManageOrders';

const AdminDashboard = () => {
    const [showDashboard, setShowDashboard] = useState(false);
    const [showManageUsers, setManageUsers] = useState(false);
    const [showManageBooks, setManageBooks] = useState(false);
    const [showManageContactUS, setShowManageContactUs] = useState(false);
    const [showManageSubscribers, setShowManageSubscribers] = useState(false);
    const [showManageOrders, setShowManageOrders] = useState(false);

    const handelDashboard = () => {
        setShowDashboard(true);
        setManageUsers(false);
        setManageBooks(false);
        setShowManageContactUs(false)
        setShowManageSubscribers(false)
        setShowManageOrders(false)
    };

    const handelManageUsers = () => {
        setManageUsers(true);
        setShowDashboard(false);
        setManageBooks(false);
        setShowManageContactUs(false)
        setShowManageSubscribers(false)
        setShowManageOrders(false)

    };

    const handelMangeBooks = () => {
        setManageUsers(false);
        setShowDashboard(false);
        setManageBooks(true);
        setShowManageContactUs(false)
        setShowManageSubscribers(false)
        setShowManageOrders(false)

    };

    const handelManageContactUs = () => {
        setShowManageContactUs(true)
        setManageUsers(false);
        setShowDashboard(false);
        setManageBooks(false);
        setShowManageSubscribers(false)
        setShowManageOrders(false)

    }

    const handelManageSubscriber = () => {
        setShowManageSubscribers(true)
        setShowManageContactUs(false)
        setManageUsers(false);
        setShowDashboard(false);
        setManageBooks(false);
        setShowManageOrders(false)

    }

    const handelManageOrders = () => {
        setShowManageOrders(true)
        setShowManageSubscribers(false)
        setShowManageContactUs(false)
        setManageUsers(false);
        setShowDashboard(false);
        setManageBooks(false);


    }

    const navigate = useNavigate();

    const handelLogOut = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log out!'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("token");
                navigate("/");
            }
        });
    };

    useEffect(() => {
        handelDashboard();
    }, []);

    return (
        <>
            <div className="Container">
                <aside className="sidebarAdmin">
                    <h2>Admin Panel</h2>
                    <section className="authorizedFunction">
                        <div className="manage">
                            <span className='manageUsersAndBooks' onClick={handelDashboard}>
                                <img src="./Images/dashboard.png" alt="" />Dashboard
                            </span>
                            <span className='manageUsersAndBooks' onClick={handelManageUsers}>
                                <img src="./Images/manageUsers.png" alt="" />Manage Users
                            </span>
                            <span className='manageUsersAndBooks' onClick={handelMangeBooks}>
                                <img src="./Images/manageBooks.png" alt="" />Manage Books
                            </span>
                            <span className='manageUsersAndBooks' onClick={handelManageOrders}>
                                <img src="./Images/manageOrders.png" alt="" />Manage Orders
                            </span>
                            <span className='manageUsersAndBooks' onClick={handelManageContactUs}>
                                <img src="./Images/contactUs.png" alt="" />Manage Contact Us
                            </span>
                            <span className='manageUsersAndBooks' onClick={handelManageSubscriber}>
                                <img src="./Images/subscribe.png" alt="" />Manage Subscribers
                            </span>
                        </div>
                    </section>
                    <br />
                    <br />
                    <h3 className='logOut' onClick={handelLogOut}>Logout</h3>
                </aside>
                {showDashboard && <Dashboard />}
                {showManageUsers && <ManageUsers />}
                {showManageBooks && <ManageBooks />}
                {showManageOrders && <ManageOrders />}
                {showManageContactUS && <ManageContactUsQueries />}
                {showManageSubscribers && <ManageSubscribers />}
            </div>
        </>
    );
};

export default AdminDashboard;
