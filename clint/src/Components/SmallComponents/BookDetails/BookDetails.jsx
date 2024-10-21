import { useState, useEffect, useContext } from 'react';
import './BookDetails.css';
import BookCart from '../../Cart/BookCart';
import { CartContext } from '../../../Context/context';
import Swal from 'sweetalert2';
function BookDetails({ bookId, bookName, bookCategory, bookPrice, bookPicture }) {
    const { books, setBooks } = useContext(CartContext);
    const bookToAdd = {
        name: bookName,
        category: bookCategory,
        price: parseFloat(bookPrice),
        quantity: 1,
        id: bookId
    };

    const isBookInCart = books.find(book => book.name === bookName)

    const handleAddToCart = () => {

        if (!isBookInCart) {
            Swal.fire({
                title: "Book added to cart",
                text: "You just added a book to cart",
                icon: "success"
            });
            return setBooks([...books, bookToAdd]);
        }
        Swal.fire({
            title: "Opps",
            text: "Book already in cart ",
            icon: "warning"
        });

    };


    return (
        <div className="detailBox">
            <div className="bookImage">
                <img src={bookPicture} alt={bookName} />
            </div>
            <div className="bookDetails">
                <span className='bookName'>{bookName}</span>
                <span className='bookName'>{bookId}</span>
                <span className='bookCategory'>{bookCategory}</span>
                <span className='bookPrice'>Rs {bookPrice}</span>
                <button className={isBookInCart ? 'bookInCartBtn' : 'buyBtn'} onClick={handleAddToCart} >{isBookInCart ? "In cart" : "Add to cart"}</button>
            </div>
        </div>
    );
}

export default BookDetails;
