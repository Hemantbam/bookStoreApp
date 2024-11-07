import React, { useEffect, useState } from 'react';
import './ProfilePage.css';
import NavigationBar from '../../Components/NavigationBar/NavigationBar';
import Footer from '../../Components/Footer/Footer';
import ProfileDashboard from '../../Components/UserProfileComponent/ProfileDashboardComponet/ProfileDashboard';
import Order from '../../Components/UserProfileComponent/OrderDashboardComponent/Order';
function ProfilePage() {
    const [Dashboard, setDashboard] = useState(false)
    const [orders, setOrders] = useState(false)
    const [editProfile, setEditProfile] = useState(false)
    const handelShowDashboard = () => {
        setDashboard(true)
        setOrders(false)
        setEditProfile(false)
    }

    const handelShowOrders = () => {
        setDashboard(false)
        setOrders(true)
        setEditProfile(false)
    }

    const handelShowEditProfile = () => {
        setDashboard(false)
        setOrders(false)
        setEditProfile(true)
    }

    useEffect(() => {
        handelShowDashboard()
    }, [])
    return (
        <>
            <NavigationBar />
            <div className="profileContainer">

                <aside className="sidebar">
                    <h2>User Profile</h2>
                    <section className="authorizedFunction">
                        <div className="manage">
                            <span className='ManageUserProfile' onClick={handelShowDashboard} >
                                <img src="./Images/dashboard.png" alt="" />Dashboard
                            </span>
                            <span className='ManageUserProfile' onClick={handelShowOrders} >
                                <img src="./Images/manageUsers.png" alt="" />Order Details
                            </span>
                            <span className='ManageUserProfile' onClick={handelShowEditProfile}>
                                <img src="./Images/manageBooks.png" alt="" />Edit Profile
                            </span>
                        </div>
                    </section>
                    <br />
                    <br />
                    <h3 className='logOut' >Logout</h3>
                </aside>

                {Dashboard && <ProfileDashboard />}
                {orders && <Order />}
            </div>
            <Footer />
        </>
    );
}

export default ProfilePage;
