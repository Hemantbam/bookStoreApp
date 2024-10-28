import "./BookList.css";
import ContactUs from '../SmallComponents/ContactUs/ContactUs';
import Subscribe from '../SmallComponents/Subscribe/subscribe';
import FeaturedBook from '../SmallComponents/FeaturedBook/FeaturedBook';
import BookDetails from "../SmallComponents/BookDetails/BookDetails";
import { getLatestFourBooks } from "../../api/bookDetails";
import { useState, useEffect } from "react";

function BookLists() {
  const [books, setBooks] = useState([]);
  const serverURL = "http://localhost:8080";
  const handelBookData = async () => {
    const details = await getLatestFourBooks();
    setBooks(details.bookDetails);
  };

  useEffect(() => {
    handelBookData();
    console.log(books)
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
                  bookId={books[0].id}
                  bookName={(books[0].bookName).toUpperCase()}
                  bookCategory={(books[0].bookCategory).toUpperCase()}
                  bookPrice={books[0].bookPrice}
                  bookPicture={`${serverURL}/${(books[0].bookImage).replace(/\\/g, '/')}`}

                />
                <BookDetails

                  bookId={books[1].id}
                  bookName={(books[1].bookName).toUpperCase()}
                  bookCategory={(books[1].bookCategory).toUpperCase()}
                  bookPrice={books[1].bookPrice}
                  bookPicture={`${serverURL}/${(books[1].bookImage).replace(/\\/g, '/')}`}

                />
                <BookDetails
                  bookId={books[2].id}
                  bookName={(books[2].bookName).toUpperCase()}
                  bookCategory={(books[2].bookCategory).toUpperCase()}
                  bookPrice={books[2].bookPrice}
                  bookPicture={`${serverURL}/${(books[2].bookImage).replace(/\\/g, '/')}`}


                />
                <BookDetails
                  bookId={books[3].id}
                  bookName={(books[3].bookName).toUpperCase()}
                  bookCategory={(books[3].bookCategory).toUpperCase()}
                  bookPrice={books[3].bookPrice}
                  bookPicture={`${serverURL}/${(books[3].bookImage).replace(/\\/g, '/')}`}


                />
              </>
            ) : (
              <p>Loading books...</p>
            )}
          </div>
        </div>
      </div>

      {books.length > 0 ? (

        <FeaturedBook bookName={(books[0].bookName.toUpperCase())} bookCategory={(books[0].bookCategory).toUpperCase()} bookAuthor={books[0].bookAuthor} bookPrice={books[0].bookPrice} bookDescription={books[0].bookDescription} bookImage={`${serverURL}/${(books[0].bookImage)}`} />

      ) : (
        <p>Loading book Details...</p>
      )}

      <ContactUs />
    </>
  );
}

export default BookLists;
