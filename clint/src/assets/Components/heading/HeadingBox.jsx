import React from 'react'
import './HeadingBox.css'
import AuthorHighlightBox from './headingHighlights/AuthorHighlightBox'
import SearchBox from '../SmallComponents/searchBox/SearchBox'
import BookHighlights from './headingHighlights/BookHighlights.jsx'
function HeadingBox() {
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
                <AuthorHighlightBox name="Mary Kubica" totalBooks="76" picture="./Images/1.png" />
                <BookHighlights bookName="wdef" bookCategory="dddsd" bookPicture="./Images/bookCoverPhoto.jpg" />
            </div>
        </>
    )
}

export default HeadingBox
