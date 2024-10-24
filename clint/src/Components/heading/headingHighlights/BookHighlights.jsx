import React from 'react'
import './BookHighlights.css'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../../../Context/context'
import { getBookById } from '../../../api/bookDetails'
function BookHighlights({ bookId, bookName, bookCategory, bookPicture }) {
  const { bookDetails, setBookDetails } = useContext(CartContext);

  const navigate = useNavigate()

  const handelBooketailView = async () => {
    const result = await getBookById(bookId)
    await setBookDetails(result.bookDetails)
    navigate("/bookdetails")
  }
  return (
    <>
      <div className='bookHighlightBox'>
        <span className='highlightText'>Last Listed</span>
        <div className="bookDetailsBox">
          <span className='bookName'>{bookName}</span>
          <span className='bookCategory'>{bookCategory}</span>
          <img src={bookPicture} alt="book picture" onClick={handelBooketailView} />
        </div>
      </div>
    </>
  )
}

export default BookHighlights
