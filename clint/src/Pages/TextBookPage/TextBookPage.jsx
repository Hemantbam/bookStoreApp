import React, { useState } from 'react'
import { useEffect } from 'react'
import './textBook.css'
import NavigationBar from '../../Components/NavigationBar/NavigationBar.jsx'
import Footer from '../../Components/Footer/Footer.jsx'
import BookDetails from '../../Components/SmallComponents/BookDetails/BookDetails.jsx'
import { getBooks } from '../../api/bookDetails.js'
function TextBookPage() {
    const [books, setBooks] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize] = useState(6)
    const handelGetBookDetails = async () => {
        const result = await getBooks()
        console.log(result)
        setBooks(result)
    }

    useEffect(() => {
        handelGetBookDetails()
        window.scrollTo(0, 0)
    }, [])

    const totalPages = Math.ceil(books.length / pageSize)

    const displayedBooks = books.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    const firstRowBooks = displayedBooks.slice(0, 3);
    const secondRowBooks = displayedBooks.slice(3, 6);

    const handlePageChange = (pageNumber) => {

        setCurrentPage(pageNumber);
    };
    return (
        <>
            <NavigationBar />
            <div className="TextBookViewContainer">
                <div className="searchBar">
                    <label htmlFor="search">Search</label>
                    <input type="text" placeholder='search here' />
                </div>

                <p>Available Books</p>
                <div className="BooksBox">

                    <div className="bookDetailsViewBox">
                        {firstRowBooks.map(book => (
                            <BookDetails
                                key={book.id}
                                bookId={book.id}
                                bookName={book.bookName}
                                bookCategory={book.bookCategory}
                                bookPrice={book.bookPrice}
                                bookPicture={"./Images/book3.jpg"}
                            />
                        ))}
                    </div>
                    <div className="BookBox">

                    </div>
                    <div className="bookDetailsViewBox">
                        {secondRowBooks.map(book => (
                            <BookDetails
                                key={book.id}
                                bookId={book.id}
                                bookName={book.bookName}
                                bookCategory={book.bookCategory}
                                bookPrice={book.bookPrice}
                                bookPicture={"./Images/book2.jpg"}

                            />
                        ))}
                    </div>
                </div>
                <div className="pagination">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className='previousButton'>
                        Prev</button>
                    <button>{currentPage}</button>
                    <button disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className='nextButton'>Next</button>
                </div>

            </div>
            <Footer />

        </>
    )
}

export default TextBookPage
