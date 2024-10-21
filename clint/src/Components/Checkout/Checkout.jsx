import React, { useContext, useEffect, useState } from 'react';
import './checkout.css';
import { CartContext } from '../../Context/context';
import NavigationBar from '../NavigationBar/NavigationBar';
import Swal from 'sweetalert2';
import { addBookOrder } from '../../api/orderDetails';

function Checkout() {
    const { books, setBooks } = useContext(CartContext);
    const [address, setAddress] = useState('');
    const [paymentMode, setPaymentMode] = useState('');
    const [totalPriceCheckout, setTotalPriceCheckout] = useState(0);

    useEffect(() => {
        const total = books.reduce((total, book) => total + (book.price) * book.quantity, 0);
        console.log(total)
        setTotalPriceCheckout(total);

    }, [books]);

    const token = localStorage.getItem("token")

    const handlePlaceOrder = async () => {

        if (!books.length || !address || !paymentMode ) {
            Swal.fire({
                title: "Incomplete Details",
                text: "Please enter your address and select a payment mode. Check Books in the cart.",
                icon: "warning",
                confirmButtonText: "OK"
            });
            return;
        }

        if (!token) {
            Swal.fire({
                title: "Unauthorized",
                text: "Please login first to place an order",
                icon: "warning",
                confirmButtonText: "OK"
            });
            return;
        }
        const paymentStatus = (paymentMode === 'eSewa' ? 'paid' : 'pending');

        const orderData = {
            orderPrice: totalPriceCheckout,
            address: address,
            paymentMode: paymentMode,
            orderStatus: "pending",
            paymentStatus: paymentStatus,
            purchasedBooks: books

        };

        try {
            await addBookOrder(orderData);

            Swal.fire({
                title: "Order Placed Successfully!",
                text: "Your order has been placed. You will receive your books soon.",
                icon: "success",
                confirmButtonText: "Ok!"
            });
            setBooks([]);
            setAddress("");
            setPaymentMode("");
        } catch (error) {
            Swal.fire({
                title: "Order Failed",
                text: "Something went wrong. Please try again.",
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    };

    return (
        <>
            <NavigationBar />
            <h1>Checkout</h1>

            <div className="checkoutContainer">
                <div className="checkoutBooks">
                    <h3>Your Books</h3>
                    <div className="booksList">
                        {books.length > 0 ? (
                            books.map((book, index) => (
                                <div key={index} className="checkoutBookItem">
                                    <p><strong>{book.name}</strong></p>
                                    <p>Category: {book.category}</p>
                                    <p>Price: Rs {book.price}</p>
                                    <p>Quantity: {book.quantity}</p>
                                    <p>Total: Rs {(book.price * book.quantity)}</p>
                                </div>
                            ))
                        ) : (
                            <p>No books in the cart</p>
                        )}
                    </div>
                </div>

                <div className="checkoutTotal">
                    <h2>
                        Total Price: Rs {totalPriceCheckout}
                    </h2>
                </div>

                <div className="deliveryAddress">
                    <h3>Delivery Address</h3>
                    <textarea
                        placeholder="Enter your delivery address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div className="paymentMode">
                    <h3>Payment Mode</h3>
                    <label>
                        <input
                            type="radio"
                            value="eSewa"
                            checked={paymentMode === 'eSewa'}
                            onChange={(e) => setPaymentMode(e.target.value)}
                        />
                        eSewa
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="COD"
                            checked={paymentMode === 'COD'}
                            onChange={(e) => setPaymentMode(e.target.value)}
                        />
                        Cash on Delivery (COD)
                    </label>
                </div>

                <button className="placeOrderBtn" onClick={handlePlaceOrder}>
                    Place Order
                </button>
            </div>
        </>
    );
}

export default Checkout;
