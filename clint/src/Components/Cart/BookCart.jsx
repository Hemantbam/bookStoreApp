import React, { useContext } from 'react';
import './BookCart.css';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/context';
import NavigationBar from '../NavigationBar/NavigationBar';

function BookCart() {
    const { books, setBooks } = useContext(CartContext);


    const handleQuantityIncrement = (index) => {
        const updatedBooks = [...books];
        let bookQuantity = parseInt(updatedBooks[index].quantity)
        console.log(bookQuantity)
        if (bookQuantity >= 1) {
            updatedBooks[index].quantity += 1;
            setBooks(updatedBooks);
        }
        console.log(books)
    };


    const handleQuantityDecrement = (index) => {
        const updatedBooks = [...books];
        let bookQuantity = parseInt(updatedBooks[index].quantity)
        if (bookQuantity > 1) {
            updatedBooks[index].quantity -= 1;

            setBooks(updatedBooks);
        }
    };


    const handleRemoveBook = (index) => {
        const updatedBooks = [...books];
        updatedBooks.splice(index, 1);
        setBooks(updatedBooks);
    };



    return (
        <>
            <NavigationBar />
            <div className="cartContainer">
                <h1>Shopping Cart</h1>
                <div className="addedItemstoCartBox">
                    {
                        books.length > 0 ? (books.map((book, index) => (
                            <div key={index} className="books">
                                <div className="bookItem">
                                    <p>{book.name}</p>
                                    <p>{book.category}</p>
                                    <p>{book.price}</p>

                                </div>
                                <div className="quantity">
                                    <button onClick={() => handleQuantityDecrement(index)}>-</button>
                                    <button>{book.quantity}</button>
                                    <button onClick={() => handleQuantityIncrement(index)}>+</button>
                                </div>
                                <p>Rs {(book.price) * book.quantity}</p>
                                <button className="removeBtn" onClick={() => handleRemoveBook(index)}>
                                    <img src="./Images/delete.png" alt="" />
                                </button>
                            </div>
                        ))) : (
                            <p>No books available in cart</p>
                        )}
                </div>
                <div className="totalItems">

                    <h2>
                        Total Cart Price: Rs{" "}
                        {books.reduce((total, book) => total + parseInt(book.price) * book.quantity, 0)}
                    </h2>
                </div>
                <button className='checkOutBtn' ><Link to='/checkout' className='checkOutLink'>Check Out
                </Link></button>

            </div>

        </>
    );
}

export default BookCart;
