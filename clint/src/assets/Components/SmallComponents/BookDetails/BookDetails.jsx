import React from 'react';
import './BookDetails.css';

function BookDetails({ bookName, bookCategory, bookPrice, bookPicture }) {
    return (
        <div className="detailBox">
            <div className="bookImage">
                <img src={bookPicture} alt={bookName} />
            </div>
            <div className="bookDetails">
                <span className='bookName'>{bookName}</span>
                <span className='bookCategory'>{bookCategory}</span>
                <span className='bookPrice'>{bookPrice}</span>
                <button className='buyBtn'>Buy Now</button>
            </div>
        </div>
    );
}

export default BookDetails;
