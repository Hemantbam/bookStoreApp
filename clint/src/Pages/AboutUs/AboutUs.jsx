import React, { useEffect } from 'react';
import './AboutUs.css';
import NavigationBar from '../../Components/NavigationBar/NavigationBar';
import Footer from '../../Components/Footer/Footer';
const AboutUs = () => {
  useEffect(()=>{
    window.scrollTo(0,0)
  })
  return (
    <>
    <NavigationBar/>

    <div className="aboutUsContainer">
        
      <h1 className="aboutUsTitle">About Us</h1>
      <p className="aboutUsDescription">
        Welcome to Book Mandu, your go-to place for the best books across genres! Located in the heart of Kathmandu, Nepal, we strive to provide our customers with a wide range of literature to inspire, educate, and entertain. 
      </p>
      <p className="aboutUsDescription">
        At Book Mandu, we believe in the transformative power of reading. Our collection includes everything from classic literature to contemporary bestsellers, ensuring there’s something for everyone. 
      </p>
      <p className="aboutUsDescription">
        Our dedicated team is passionate about books and is here to help you find your next great read. We also host various events, author signings, and book clubs to foster a love for reading in our community.
      </p>
      <p className="aboutUsDescription">
        Join us on this literary journey and explore new worlds through the pages of our books. Thank you for choosing Book Mandu, where every book has a story!
      </p>
      <div className="contactDetails">
        <h2 className="contactTitle">Contact Us</h2>
        <p>Email: supportbookMandu@gmail.com</p>
        <p>Phone: +977 9865986060</p>
        <p>Location: Kathmandu, Nepal</p>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AboutUs;
