import React, { useState, useEffect } from 'react';
import '../AdminDashboard.css';
import { useNavigate } from 'react-router-dom';
import { getTotalBooks, getTotalUsers } from '../../../../api/totalDetails';
import { jwtDecode } from 'jwt-decode';
import { userDetails } from '../../../../api/userDetails';
const Dashboard = () => {
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalBooks, setTotalBooks] = useState(0)
    const [totalOrders, setTotalOrders] = useState(0)
    const [userEmail, setUserEmail] = useState("")
    const [dbLatestUser, setDbLatestUser] = useState({ userId: 0, userEmail: "", role: "" })


    const navigate = useNavigate()

    /**Handel the Log out */
    const handleLogOut = () => {
        localStorage.removeItem("token")
        navigate("/")
    }
    const handeluserData = () => {
        const token = localStorage.getItem("token")
        const decodedtoken = jwtDecode(token)
        setUserEmail(decodedtoken.email)
    }
    const totalCount = async () => {

        try {
            const countUsers = await getTotalUsers()
            setTotalUsers(countUsers)
            const countBooks = await getTotalBooks();
            setTotalBooks(countBooks)
        } catch (err) {
            setTotalBooks(0)
            setTotalUsers(0)
        }
    }


    const fetchLatestAddedUser = async () => {
        const latestUser = await userDetails();
        if (latestUser) {
            return setDbLatestUser(latestUser);
        }
        console.error("No latest user data available");

    };

    useEffect(() => {
        totalCount();
        handeluserData()
        fetchLatestAddedUser();
    }, [])

    return (
        <>
            <div className="mainContent">
                <header>
                    <span><h1>Welcome,</h1> {userEmail}</span>
                    <div className="userAccount">
                        <img src="Images/user.png" alt="" />
                        <div className="dropDownContent">
                            <a href="#">profile</a>
                            <a href="#" onClick={handleLogOut}>Logout</a>
                        </div>
                    </div>
                </header>
                <section className="stats">
                    <div className="statBox">
                        <h3>Total Users</h3>
                        <p>{totalUsers}</p>
                    </div>
                    <div className="statBox">
                        <h3>Total Books</h3>
                        <p>{totalBooks}</p>
                    </div>
                    <div className="statBox">
                        <h3>Pending Orders</h3>
                        <p>{totalOrders}</p>
                    </div>
                </section>
                <section>
                    <div className='recentActivitiesConainer'>
                        <h2>Recently Joined User</h2>
                        <section>
                            <table>
                                <thead>
                                    <tr>
                                        <th>User Id</th>
                                        <th>User email</th>
                                        <th>User role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{dbLatestUser.userId}</td>
                                        <td>{dbLatestUser.userEmail}</td>
                                        <td>{dbLatestUser.role}</td>

                                    </tr>
                                </tbody>
                            </table>
                        </section>
                    </div>
                </section>

            </div>
        </>
    );
};

export default Dashboard;
