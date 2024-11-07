import React, { useEffect, useState } from 'react';
import './ProfileDashboard.css';
import { useNavigate } from 'react-router-dom';
import { getCancelledOrderCountOfUser, getCompletedOrderCountOfUser, getPendingOrderCountOfUser, getUserOrderListById } from '../../../api/orderDetails';
import { jwtDecode } from 'jwt-decode';

function ProfileDashboard() {
    const [email, setEmail] = useState('');
    const [userRole, setUserRole] = useState('');
    const [userId, setUserId] = useState(null);
    const [completedOrderCount, setCompletedOrderCount] = useState(0);
    const [pendingOrderCount, setPendingOrderCount] = useState(0);
    const [cancelledOrderCount, setCancelledOrderCount] = useState(0);
    const [userOrderDetails, setUserOrderDetails] = useState([]);

    const navigate = useNavigate();

    const handleUserDetails = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate('/login');
            return;
        }
        try {
            const decodedToken = jwtDecode(token);
            setEmail(decodedToken.email);
            setUserRole(decodedToken.role);
            setUserId(decodedToken.id);
        } catch (error) {
            console.error("Invalid token:", error);
            navigate('/login');
        }
    };

    const handleUserOrderDetails = async () => {
        if (!userId) return;
        try {
            const deliveredCount = await getCompletedOrderCountOfUser(userId);
            const pendingCount = await getPendingOrderCountOfUser(userId);
            const cancelledCount = await getCancelledOrderCountOfUser(userId);

            setCompletedOrderCount(deliveredCount.count);
            setPendingOrderCount(pendingCount.count);
            setCancelledOrderCount(cancelledCount.count);
        } catch (error) {
            console.error("Error fetching order counts:", error);
        }
    };

    const handleUserOrderList = async () => {
        if (!userId) return;
        try {
            const result = await getUserOrderListById(userId);
            setUserOrderDetails(result.details);
        } catch (error) {
            console.error("Error fetching user order list:", error);
        }
    };


    useEffect(() => {
        handleUserDetails();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0)
        handleUserOrderDetails();
        handleUserOrderList();
    }, [userId]);
  return (
    <>
     
     <div className="profilePageContainer">
                    <div className="profileBox">
                        <div className="profileHeadingBox">
                            <div className="imageBox">
                                <img src="./Images/profile.png" alt="Profile" />
                            </div>
                            <div className="userBasicInfo">
                                <p>{email}</p>
                                <p>Role: {(userRole).toUpperCase()}</p>
                            </div>
                        </div>
                        <div className="statsBox">
                            <div className="totalStatsBox">
                                <p>Completed Orders: {completedOrderCount || 0}</p>
                            </div>
                            <div className="totalStatsBox">
                                <p>Pending Orders: {pendingOrderCount || 0}</p>
                            </div>
                            <div className="totalStatsBox">
                                <p>Cancelled Orders: {cancelledOrderCount || 0}</p>
                            </div>
                        </div>
                        <div className="profileBody">
                            <div className="recentOrderDetail">
                                <h3>Recently Ordered Items</h3>
                                {userOrderDetails.length > 0 ? (
                                    <div className="orderDetailContainer">
                                        <p><strong>Order ID:</strong> {userOrderDetails[0].orderId}</p>
                                        <p><strong>Book Titles:</strong> {userOrderDetails[0].bookNames}</p>
                                        <p><strong>Order Status:</strong> {userOrderDetails[0].orderStatus}</p>
                                        <p><strong>Total Price:</strong> Rs {userOrderDetails[0].orderPrice}</p>
                                        <p><strong>Payment Status:</strong> {userOrderDetails[0].paymentStatus}</p> </div>
                                ) : (
                                    <p>No recent orders found.</p>
                                )}
                            </div>

                        </div>
                    </div>
                </div> 
    </>
  )
}

export default ProfileDashboard
