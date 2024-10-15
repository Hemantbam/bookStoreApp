import './HeadingBox.css'
import AuthorHighlightBox from './headingHighlights/AuthorHighlightBox'
import SearchBox from '../SmallComponents/searchBox/SearchBox'
import BookHighlights from './headingHighlights/BookHighlights.jsx'
import { getLatestFourBooks, getMostFeaturedAuthor } from '../../api/bookDetails.js'
import { useState, useEffect } from 'react'

function HeadingBox() {
    const [books, setBooks] = useState([]);
    const [authorDetails, setAuthorDetails] = useState(null);

    const handelBookData = async () => {
        const details = await getLatestFourBooks();
        setBooks(details.bookDetails);
    };

    const handelBookAuthor = async () => {
        const details = await getMostFeaturedAuthor();
        setAuthorDetails(details.authorDetails)
    }
    useEffect(() => {
        handelBookData();
        handelBookAuthor()
    }, [])
    return (
        <>
            <div className='headingBox'>
                <div className="leftSideText">
                    <span className='newText'>
                        New &
                    </span>
                    <span className='trendingTextLeftSide'>
                        Trending
                    </span><br />
                    <span className='exploreText'>
                        Explore new worlds from authors.
                    </span><br />
                    <SearchBox />
                </div>
                <div className="bookCoverPicture">
                    <img src="./Images/bookCoverPhoto.jpg" alt="" />
                </div>
                {authorDetails? (
                    <>
                        <AuthorHighlightBox name={(authorDetails.bookAuthor).toUpperCase()} totalBooks={authorDetails.totalBooks} picture="./Images/1.png" />

                    </>
                ) : (<span>Author Details not found</span>)}

                {books.length > 0 ? (
                    <>
                        <BookHighlights bookName={(books[0].bookName).toUpperCase()} bookCategory={(books[0].bookCategory).toUpperCase()} bookPicture="./Images/bookCoverPhoto.jpg" />

                    </>

                ) : (<span>Data Loading</span>)}
            </div>
        </>
    )
}

export default HeadingBox
