import React, { useEffect, useState } from 'react';
import './ProfileDashboard.css';
import { useNavigate } from 'react-router-dom';
import { getCancelledOrderCountOfUser, getCompletedOrderCountOfUser, getPendingOrderCountOfUser, getUserOrderListById } from '../../../api/orderDetails';
import { userDetailsById } from '../../../api/userDetailsApi';
import decodeToken from '../../../jwtDecode/jwtDecode';

function ProfileDashboard() {
    const [email, setEmail] = useState('');
    const [userRole, setUserRole] = useState('');
    const [userId, setUserId] = useState(null);
    const [completedOrderCount, setCompletedOrderCount] = useState(0);
    const [pendingOrderCount, setPendingOrderCount] = useState(0);
    const [cancelledOrderCount, setCancelledOrderCount] = useState(0);
    const [userOrderDetails, setUserOrderDetails] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [profileImage, setProfileImage] = useState('./Images/profile.png');
    const [imagePreview, setImagePreview] = useState(profileImage);
    const tokenDetails = decodeToken();
    const serverURL = "http://localhost:8080";
    const navigate = useNavigate();

    const handleUserDetails = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate('/login');
            return;
        }
        try {
            setEmail(tokenDetails.email);
            setUserRole(tokenDetails.role);
            setUserId(tokenDetails.id);
        } catch (error) {
            console.error("Invalid token:", error);
            navigate('/login');
        }
    };

    const handleGetUserDetails = async () => {
        const result = await userDetailsById(tokenDetails.id);
        if (result && result.details) {
            setUserDetails(result.details);
            if (result.details.userImage) {
                const imagePath = `${serverURL}/${result.details.userImage.replace(/\\/g, '/')}`;
                setProfileImage(result.details.userImage);
                setImagePreview(imagePath);
            }
        }
    }

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
            setUserOrderDetails(result.details || []);
        } catch (error) {
            console.error("Error fetching user order list:", error);
        }
    };

    const handleImageError = () => {
        setImagePreview('./Images/profile.png'); 
    };

    useEffect(() => {
        handleUserDetails();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        handleGetUserDetails();
        handleUserOrderDetails();
        handleUserOrderList();
    }, [userId]);

    return (
        <>
            <div className="profilePageContainer">
                <div className="profileBox">
                    <div className="profileHeadingBox">
                        <div className="imageBox">
                            <img src={imagePreview} alt="Profile" onError={handleImageError} />
                        </div>
                        <div className="userBasicInfo">
                            <p>{userDetails ? (`${(userDetails.firstName || "").toUpperCase()} ${(userDetails.lastName || "").toUpperCase()}`) : ""}</p>
                            <p>Role: {userRole.toUpperCase()}</p>
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
                            {userOrderDetails && userOrderDetails.length > 0 ? (
                                <div className="orderDetailContainer">
                                    <p><strong>Order ID:</strong> {userOrderDetails[0].orderId}</p>
                                    <p><strong>Book Titles:</strong> {userOrderDetails[0].bookNames}</p>
                                    <p><strong>Order Status:</strong> {userOrderDetails[0].orderStatus}</p>
                                    <p><strong>Total Price:</strong> Rs {userOrderDetails[0].orderPrice}</p>
                                    <p><strong>Payment Status:</strong> {userOrderDetails[0].paymentStatus}</p>
                                </div>
                            ) : (
                                <p>No recent orders found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileDashboard;
