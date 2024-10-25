import React, { useEffect } from 'react'
import './BookDescription.css'
import FeaturedBook from '../SmallComponents/FeaturedBook/FeaturedBook.jsx'
import NavigationBar from '../NavigationBar/NavigationBar.jsx';
import Footer from '../Footer/Footer.jsx';
import { CartContext } from '../../Context/context.js'
import { useContext } from 'react';
function BookDescription() {
  const { bookDetails } = useContext(CartContext);

  console.log("tshb", bookDetails)
  useEffect(() => {
    window.scrollTo(0, 0)
  })


  return (

    <>
      <NavigationBar />
      <div className="bookDetailsViewBox">
        <FeaturedBook bookName={(bookDetails.bookName)} bookCategory={(bookDetails.bookCategory)} bookAuthor={bookDetails.bookAuthor} bookPrice={bookDetails.bookPrice} bookDescription={bookDetails.bookDescription} />

      </div>
      <Footer />
    </>
  )
}

export default BookDescription
