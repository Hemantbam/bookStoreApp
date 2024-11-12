import React, { useEffect } from 'react'
import './BookDescription.css'
import FeaturedBook from '../SmallComponents/FeaturedBook/FeaturedBook.jsx'
import NavigationBar from '../NavigationBar/NavigationBar.jsx';
import Footer from '../Footer/Footer.jsx';
import { CartContext } from '../../Context/context.js'
import { useContext } from 'react';
function BookDescription() {
  const { bookDetails } = useContext(CartContext);
  const serverURL = "http://localhost:8080";
  console.log("tshb", bookDetails)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  console.log(bookDetails)

  return (

    <>
      <NavigationBar />
      <div className="container">
        <div className="bookDetailsViewBox">
          <FeaturedBook bookId={bookDetails.id} bookName={ (bookDetails.bookName.toUpperCase())} bookCategory={(bookDetails.bookCategory.toUpperCase())} bookAuthor={bookDetails.bookAuthor.toUpperCase()} bookPrice={bookDetails.bookPrice} bookDescription={bookDetails.bookDescription} bookImage={bookDetails.bookImage ? `${serverURL}/${(bookDetails.bookImage)}` : "./Images/defaultBook.png"}
          />
        </div>
      </div>

      <Footer />
    </>
  )
}

export default BookDescription
