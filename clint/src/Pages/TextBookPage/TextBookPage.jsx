import React, { useState, useEffect } from 'react'
import './textBook.css'
import NavigationBar from '../../Components/NavigationBar/NavigationBar.jsx'
import Footer from '../../Components/Footer/Footer.jsx'
import BookDetails from '../../Components/SmallComponents/BookDetails/BookDetails.jsx'
import { getBooks, searchBook } from '../../api/bookDetails.js'

function TextBookPage() {
    const serverURL = "http://localhost:8080";

    const [books, setBooks] = useState([])
    const [searchWord, setSearchWord] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [noResult, setNoResult] = useState(false)
    const [pageSize] = useState(6)
    const [priceFilter, setPriceFilter] = useState('')

    const handelGetBookDetails = async () => {
        const result = await getBooks()
        console.log(result)
        setBooks(result)
    }

    useEffect(() => {
        handelGetBookDetails()
        window.scrollTo(0, 0)
    }, [])

    let totalPages = Math.ceil(books.length / pageSize)

    const displayedBooks = Array.isArray(books) ? books.slice((currentPage - 1) * pageSize, currentPage * pageSize) : [];

    const firstRowBooks = displayedBooks.slice(0, 3);
    const secondRowBooks = displayedBooks.slice(3, 6);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handelSearch = async (word) => {
        const trimmedWord = word.trim()
        if (trimmedWord === "") {
            return handelGetBookDetails()
        }
        const response = await searchBook(trimmedWord)
        console.log(response)
        if (response) {
            setBooks([response])
            setNoResult(false)
        } else {
            setBooks([])
            setNoResult(true)
        }
    }

    const handleSearchInputChange = (e) => {
        const word = e.target.value;
        setSearchWord(word);
        handelSearch(word);
    };

    const handlePriceFilterChange = (e) => {
        const filter = e.target.value;
        setPriceFilter(filter);
        if (filter === 'lowToHigh') {
            setBooks(prevBooks =>
                [...prevBooks].sort((a, b) => a.bookPrice - b.bookPrice)
            );
        } else if (filter === 'highToLow') {
            setBooks(prevBooks =>
                [...prevBooks].sort((a, b) => b.bookPrice - a.bookPrice)
            );
        }
    };

    return (
        <>
            <NavigationBar />
            <div className="TextBookViewContainer">
                <div className="searchBar">
                    <label htmlFor="search">Search</label>
                    <input type="text" placeholder='search book here..' value={searchWord} onChange={handleSearchInputChange} />

                    <div className="filterContainer">
                        <label htmlFor="priceFilter">Sort by Price:</label>
                        <select id="priceFilter" value={priceFilter} onChange={handlePriceFilterChange}>
                            <option value="highToLow">Price: High to Low</option>
                            <option value="lowToHigh">Price: Low to High</option>

                        </select>
                    </div>
                </div>

                <p>Available Books</p>
                <div className="BooksBox">
                    <div className="noResult">
                        {noResult &&
                            <>
                                <h2 className='notfoundBookText'>Book not found</h2>
                                <img src="./Images/notFound.png" alt="book" />
                                <span>
                                    {totalPages = 1}
                                </span>
                            </>}
                    </div>
                    <div className="bookDetailsViewBox">
                        {Array.isArray(firstRowBooks) && firstRowBooks.map(book => (
                            <BookDetails
                                key={book.id}
                                bookId={book.id}
                                bookName={book.bookName.toUpperCase()}
                                bookCategory={book.bookCategory.toUpperCase()}
                                bookPrice={book.bookPrice}
                                bookPicture={book.bookImage ? `${serverURL}/${(book.bookImage).replace(/\\/g, '/')}` : "./Images/defaultBook.png"}
                            />
                        ))}
                    </div>

                    <div className="bookDetailsViewBox">
                        {Array.isArray(secondRowBooks) && secondRowBooks.map(book => (
                            <BookDetails
                                key={book.id}
                                bookId={book.id}
                                bookName={book.bookName.toUpperCase()}
                                bookCategory={book.bookCategory.toUpperCase()}
                                bookPrice={book.bookPrice}
                                bookPicture={book.bookImage ? `${serverURL}/${(book.bookImage).replace(/\\/g, '/')}` : "./Images/defaultBook.png"}
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
