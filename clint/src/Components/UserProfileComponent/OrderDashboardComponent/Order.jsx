import React, { useEffect, useState } from 'react';
import './Order.css';
import Swal from 'sweetalert2';
import {
    getUserOrderListById,
    cancelOrder
} from '../../../api/orderDetails.js';
import decodeToken from '../../../jwtDecode/jwtDecode.js';
function Order() {
    const [pendingOrders, setPendingOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const [cancelledOrders, setCancelledOrders] = useState([]);
    const [userOrders, setUserOrders] = useState([]);
    const [delivered, setDelivered] = useState(false);
    const [cancelOrderStatus, setCancelOrderStatus] = useState(false);
    const tokenDetails = decodeToken()

    const handeUserOrderDetailList = async () => {
        const result = await getUserOrderListById(tokenDetails.id);
        console.log(result.details)
        setUserOrders(result.details || []);
    };



    const handlePendingUserOrderDetails = () => {
        setPendingOrders(userOrders.filter(order => order.orderStatus === 'pending'));
    };

    const handleCompletedUserOrderDetails = () => {
        setCompletedOrders(userOrders.filter(order => order.orderStatus === 'delivered'));
    };

    const handleCancelledUserOrderDetails = () => {
        setCancelledOrders(userOrders.filter(order => order.orderStatus === 'cancelled'));
    };

    const handelCancelOrder = async (id) => {
        const result = await Swal.fire({
            title: 'Cancel Order',
            text: "Are you sure you want to cancel this order?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!'
        });

        if (result.isConfirmed) {
            const cancelResult = await cancelOrder(id);
            if (cancelResult) {
                setCancelOrderStatus(true);
                Swal.fire('Cancelled!', 'Order has been canceled.', 'success');
            } else {
                Swal.fire('Error!', 'There was an error canceling the order.', 'error');
            }
        }
    };
    useEffect(() => {
        handeUserOrderDetailList();
    }, []);

    useEffect(() => {
        handlePendingUserOrderDetails()
        handleCancelledUserOrderDetails()
        handleCompletedUserOrderDetails()
        setDelivered(false);
        setCancelOrderStatus(false);
    }, [userOrders, cancelOrderStatus, delivered]);

    return (
        <div className="bookOrderDetailsContainer">
            <h1>Book Orders</h1>

            <h2>Pending Book Order Details</h2>
            <div className="pendingBookOrderTableContainer">
                <table>
                    <thead>
                        <tr className='tableHeader'>
                            <th className='headerCell'>Order Id</th>
                            <th className='headerCell'>User ID</th>
                            <th className='headerCell'>Book Name</th>
                            <th className='headerCell'>Book Quantity</th>
                            <th className='headerCell'>Total Price</th>
                            <th className='headerCell'>Payment Mode</th>
                            <th className='headerCell'>Payment Status</th>
                            <th className='headerCell'>Delivery Address</th>
                            <th className='headerCell'>Contact Number</th>
                            <th className='headerCell'>Order Time</th>
                            <th className='headerCell'>Order Status</th>
                            <th className='headerCell'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingOrders.length > 0 ? (
                            pendingOrders.map((detail) => (
                                <tr className="tableRow" key={detail.orderId}>
                                    <td>{detail.orderId}</td>
                                    <td>{detail.userId}</td>
                                    <td>{detail.bookNames}</td>
                                    <td>{detail.quantities}</td>
                                    <td>{detail.orderPrice}</td>
                                    <td>{detail.paymentMode}</td>
                                    <td>{detail.paymentStatus}</td>
                                    <td>{detail.address}</td>
                                    <td>{detail.contactNumber}</td>
                                    <td>{detail.created_at}</td>
                                    <td>{detail.orderStatus}</td>
                                    <td>
                                        <div className="orderActionBtn">
                                            <button className='cancelOrdeBtn' onClick={() => handelCancelOrder(detail.orderId)}>Cancel Order</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="12">No pending orders found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <h2>Completed Book Order Details</h2>
            <div className="completedBookOrderTableContainer">
                <table>
                    <thead>
                        <tr className='tableHeader'>
                            <th className='headerCell'>Order Id</th>
                            <th className='headerCell'>User ID</th>
                            <th className='headerCell'>Book Name</th>
                            <th className='headerCell'>Book Quantity</th>
                            <th className='headerCell'>Total Price</th>
                            <th className='headerCell'>Payment Mode</th>
                            <th className='headerCell'>Payment Status</th>
                            <th className='headerCell'>Delivery Address</th>
                            <th className='headerCell'>Contact Number</th>
                            <th className='headerCell'>Order Time</th>
                            <th className='headerCell'>Order Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {completedOrders.length > 0 ? (
                            (completedOrders).map((detail) => (
                                <tr className="tableRow" key={detail.orderId}>
                                    <td>{detail.orderId}</td>
                                    <td>{detail.userId}</td>
                                    <td>{detail.bookNames}</td>
                                    <td>{detail.quantities}</td>
                                    <td>{detail.orderPrice}</td>
                                    <td>{detail.paymentMode}</td>
                                    <td>{detail.paymentStatus}</td>
                                    <td>{detail.address}</td>
                                    <td>{detail.contactNumber}</td>
                                    <td>{detail.created_at}</td>
                                    <td className='deliveredStatus'>{(detail.orderStatus).toUpperCase()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11">No Completed orders found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>



            <h2>Cancelled Book Order Details</h2>
            <div className="completedBookOrderTableContainer">
                <table>
                    <thead>
                        <tr className='tableHeader'>
                            <th className='headerCell'>Order Id</th>
                            <th className='headerCell'>User ID</th>
                            <th className='headerCell'>Book Name</th>
                            <th className='headerCell'>Book Quantity</th>
                            <th className='headerCell'>Total Price</th>
                            <th className='headerCell'>Payment Mode</th>
                            <th className='headerCell'>Payment Status</th>
                            <th className='headerCell'>Delivery Address</th>
                            <th className='headerCell'>Contact Number</th>
                            <th className='headerCell'>Order Time</th>
                            <th className='headerCell'>Order Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cancelledOrders.length > 0 ? (
                            cancelledOrders.map((detail) => (
                                <tr className="tableRow" key={detail.orderId}>
                                    <td>{detail.orderId}</td>
                                    <td>{detail.userId}</td>
                                    <td>{detail.bookNames}</td>
                                    <td>{detail.quantities}</td>
                                    <td>{detail.orderPrice}</td>
                                    <td>{detail.paymentMode}</td>
                                    <td>{detail.paymentStatus}</td>
                                    <td>{detail.address}</td>
                                    <td>{detail.contactNumber}</td>
                                    <td>{detail.created_at}</td>
                                    <td className='cancelledStatus'>{(detail.orderStatus).toUpperCase()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11">No Cancelled orders found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Order;
