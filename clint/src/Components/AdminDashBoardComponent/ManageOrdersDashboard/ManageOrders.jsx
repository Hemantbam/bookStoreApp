import React, { useEffect, useState } from 'react';
import './ManageOrders.css';
import Swal from 'sweetalert2';
import { 
  getPendingOrderDetails, 
  getPendingOrders, 
  handelDelivery, 
  getCompletedOrderCount, 
  getCompletedOrderList, 
  cancelOrder 
} from '../../../api/orderDetails';

function ManageOrders() {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [pendingOrderCount, setPendingOrderCount] = useState(0);
  const [completedOrderCount, setCompletedOrderCount] = useState(0);
  const [delivered, setDelivered] = useState(false);
  const [cancelOrderStatus, setCancelOrderStatus] = useState(false);

  const handlePendingOrderDetailsList = async () => {
    const result = await getPendingOrderDetails();
    setPendingOrders(result.details || []);
  };

  const handelCompletedOrderDetailList = async () => {
    const result = await getCompletedOrderList();
    setCompletedOrders(result.details || []);
  };

  const handlePendingOrderCount = async () => {
    const result = await getPendingOrders();
    setPendingOrderCount(result.count || 0);
  };

  const handleCompletedOrderCount = async () => {
    const result = await getCompletedOrderCount();
    setCompletedOrderCount(result.count || 0);
  };

  const handelConfirmDelivery = async (id) => {
    const result = await Swal.fire({
      title: 'Confirm Delivery',
      text: "Are you sure you want to mark this order as delivered?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, deliver it!'
    });

    if (result.isConfirmed) {
      await handelDelivery(id);
      setDelivered(true);
      Swal.fire('Delivered!', 'Order has been marked as delivered.', 'success');
    }
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
    window.scrollTo(0, 0);
    handlePendingOrderDetailsList();
    handelCompletedOrderDetailList();
    handlePendingOrderCount();
    handleCompletedOrderCount();
    setDelivered(false);
    setCancelOrderStatus(false);
  }, [delivered, cancelOrderStatus]);

  return (
    <div className="bookOrderDetailsContainer">
      <h1>Manage Book Order</h1>

      <div className="countBox">
        <div className="statBox">
          <span>Total pending Orders: {pendingOrderCount}</span>
        </div>
        <div className="statBox">
          <span>Total completed Orders: {completedOrderCount}</span>
        </div>
      </div>

      <h2>Pending Book Order Details</h2>
      <div className="pendingBookOrderTableContainer">
        <table>
          <thead>
            <tr className='tableHeader'>
              {/* Headers */}
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
                      <button onClick={() => handelConfirmDelivery(detail.orderId)} className='confirmDeleveryBtn'>Confirm Delivery</button>
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
              <th className='headerCell'>User Name</th>
              <th className='headerCell'>Book Name</th>
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
              completedOrders.map((detail) => (
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
    </div>
  );
}

export default ManageOrders;
