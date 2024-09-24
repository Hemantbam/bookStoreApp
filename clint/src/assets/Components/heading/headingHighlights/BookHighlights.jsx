import React from 'react'
import './BookHighlights.css'
function BookHighlights({bookName,bookCategory,bookPicture}) {
  return (
    <>
      <div className='bookHighlightBox'>
            <span className='highlightText'>Last Listed</span>
            <div className="bookDetailsBox">
                <span className='bookName'>{bookName}</span>
                <span className='bookCategory'>{bookCategory}</span>
                <img src={bookPicture} alt="book picture" />
            </div>
        </div>
    </>
  )
}

export default BookHighlights
