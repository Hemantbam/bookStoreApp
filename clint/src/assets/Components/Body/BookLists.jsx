import React from 'react'
import "./BookList.css"
import BookDetails from '../SmallComponents/BookDetails/BookDetails'
import ContactUs from '../SmallComponents/ContactUs/ContactUs'
import Subscribe from '../SmallComponents/Subscribe/subscribe'
import FeaturedBook from '../SmallComponents/FeaturedBook/FeaturedBook'
function BookLists() {
    return (
        <>
            <Subscribe />
            <hr />
            <div className="container">
                <div className="trendingBox">
                    <span className='trendingText'>Trending Books</span>
                    <div className="trendingBookDetailComponent">
                        <BookDetails bookPicture="./Images/book2.jpg" bookName="dsfdsds" bookCategory="ddsff" bookPrice="2343" />
                        <BookDetails bookPicture="./Images/book2.jpg" bookName="dsfdsds" bookCategory="ddsff" bookPrice="2343" />
                        <BookDetails bookPicture="./Images/book2.jpg" bookName="dsfdsds" bookCategory="ddsff" bookPrice="2343" />
                        <BookDetails bookPicture="./Images/book2.jpg" bookName="dsfdsds" bookCategory="ddsff" bookPrice="2343" />

                    </div>
                </div>
            </div>

            <FeaturedBook />
            <ContactUs />
        </>
    )
}

export default BookLists
