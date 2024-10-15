import "./BookList.css";
import ContactUs from '../SmallComponents/ContactUs/ContactUs';
import Subscribe from '../SmallComponents/Subscribe/subscribe';
import FeaturedBook from '../SmallComponents/FeaturedBook/FeaturedBook';
import BookDetails from "../SmallComponents/BookDetails/BookDetails";
import { getLatestFourBooks } from "../../api/bookDetails";
import { useState, useEffect } from "react";

function BookLists() {
  const [books, setBooks] = useState([]);

  const handelBookData = async () => {
    const details = await getLatestFourBooks();
    setBooks(details.bookDetails);
  };

  useEffect(() => {
    handelBookData();
  }, []);

  return (
    <>
      <Subscribe />
      <hr />
      <div className="bookListContainer">
        <div className="trendingBox">
          <span className="trendingText">Trending Books</span>
          <div className="trendingBookDetailComponent">
            {books.length > 0 ? (
              <>
                <BookDetails
                  bookPicture="./Images/book2.jpg"
                  bookName={(books[0].bookName).toUpperCase()}
                  bookCategory={(books[0].bookCategory).toUpperCase()}
                  bookPrice={books[0].bookPrice}
                />
                <BookDetails
                  bookPicture="./Images/book2.jpg"
                  bookName={(books[1].bookName).toUpperCase()}
                  bookCategory={(books[1].bookCategory).toUpperCase()}
                  bookPrice={books[1].bookPrice}
                />
                <BookDetails
                  bookPicture="./Images/book2.jpg"
                  bookName={(books[2].bookName).toUpperCase()}
                  bookCategory={(books[2].bookCategory).toUpperCase()}
                  bookPrice={books[2].bookPrice}
                />
                <BookDetails
                  bookPicture="./Images/book2.jpg"
                  bookName={(books[3].bookName).toUpperCase()}
                  bookCategory={(books[3].bookCategory).toUpperCase()}
                  bookPrice={books[3].bookPrice}
                />
              </>
            ) : (
              <p>Loading books...</p>
            )}
          </div>
        </div>
      </div>

      <FeaturedBook />
      <ContactUs />
    </>
  );
}

export default BookLists;
