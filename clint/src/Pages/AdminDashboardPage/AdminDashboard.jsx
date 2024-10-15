import { useState, useEffect } from 'react';
import './AdminDashboard.css';
import Dashboard from '../../Components/AdminDashBoardComponent/AdminHomeDashboard/Dashboard';
import ManageUsers from '../../Components/AdminDashBoardComponent/ManageUsers/ManageUsers';
import ManageBooks from '../../Components/AdminDashBoardComponent/ManageBooks/ManageBooks';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminDashboard = () => {
    const [showDashboard, setShowDashboard] = useState(false);
    const [showManageUsers, setManageUsers] = useState(false);
    const [showManageBooks, setManageBooks] = useState(false);

    const handelDashboard = () => {
        setShowDashboard(true);
        setManageUsers(false);
        setManageBooks(false);
    };

    const handelManageUsers = () => {
        setManageUsers(true);
        setShowDashboard(false);
        setManageBooks(false);
    };

    const handelMangeBooks = () => {
        setManageUsers(false);
        setShowDashboard(false);
        setManageBooks(true);
    };

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
                <aside className="sidebar">
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
                        </div>
                    </section>
                    <br />
                    <br />
                    <h3 className='logOut' onClick={handelLogOut}>Logout</h3>
                </aside>
                {showDashboard && <Dashboard />}
                {showManageUsers && <ManageUsers />}
                {showManageBooks && <ManageBooks />}
            </div>
        </>
    );
};

export default AdminDashboard;
