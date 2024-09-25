import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';
import { getTotalUsers, getTotalBooks } from '../../../api/totalDetails';
import { jwtDecode } from 'jwt-decode';
import Dashboard from './AdminDashBoardComponent/Dashboard';
import ManageUsers from './AdminDashBoardComponent/ManageUsers';
import ManageBooks from './AdminDashBoardComponent/ManageBooks';


const AdminDashboard = () => {
    const [showDashboard, setShowDashboard] = useState(false)
    const [showManageUsers, setManageUsers] = useState(false)
    const [showManageBooks, setManageBooks] = useState(false)
    const navigate = useNavigate()
    const handelDashboard = () => {
        setShowDashboard(true)
        setManageUsers(false)
        setManageBooks(false)
    }

    const handelManageUsers = () => {
        setManageUsers(true)
        setShowDashboard(false)
        setManageBooks(false)
    }

    const handelMangeBooks = () => {
        setManageUsers(false)
        setShowDashboard(false)
        setManageBooks(true)
    }

    
    useEffect(() => {
        handelDashboard()
}, [])

return (
    <>
        <div className="Container">

            <aside className="sidebar">
                <h2>Admin Panel</h2>
                <section className="authorizedFunction">
                    <div className="manage">
                        <span className='manageUsersAndBooks' onClick={handelDashboard}><img src="./Images/manageBooks.png" alt="" />Dashboard</span>
                        <span className='manageUsersAndBooks' onClick={handelManageUsers}><img src="./Images/manageUsers.png" alt="" />Manager Users</span>
                        <span className='manageUsersAndBooks' onClick={handelMangeBooks}><img src="./Images/manageBooks.png" alt="" />Manage Books</span>
                    </div>
                </section>
                <br />
                <br />
                <h3>Logout</h3>
            </aside>
            {showDashboard && < Dashboard />}
            {showManageUsers && < ManageUsers />}
            {showManageBooks && < ManageBooks />}

        </div>

    </>
);
};

export default AdminDashboard;
