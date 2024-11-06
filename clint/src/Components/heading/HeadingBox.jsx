import './HeadingBox.css'
import AuthorHighlightBox from './headingHighlights/AuthorHighlightBox'
import SearchBox from '../SmallComponents/searchBox/SearchBox'
import BookHighlights from './headingHighlights/BookHighlights.jsx'
import { getBookById, getBookIdOfMostBoughtBook, getLatestFourBooks, getMostFeaturedAuthor } from '../../api/bookDetails.js'
import { useState, useEffect , useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../Context/context.js'
function HeadingBox() {
    const serverURL = "http://localhost:8080";
    const [books, setBooks] = useState([]);
    const [authorDetails, setAuthorDetails] = useState(null);
    const [bookImagePath, setBookImagePath] = useState("")
    const[mostBoughtBookId, setMostBoughtBookId]=useState()
    const { bookDetails, setBookDetails } = useContext(CartContext);

    const handelBookData = async () => {
        const details = await getLatestFourBooks();
        setBooks(details.bookDetails);
    };

    const handelBookAuthor = async () => {
        const details = await getMostFeaturedAuthor();
        setAuthorDetails(details.bookDetails)
    }


    const getPictureOfMostBoughtBook=async()=>{
        const bookId = await getBookIdOfMostBoughtBook()
        setMostBoughtBookId(bookId)
        const result= await getBookById(bookId)
        setBookImagePath(result.bookDetails.bookImage)
    }




    const navigate = useNavigate()
  
    const handelBooketailView = async () => {
      const result = await getBookById(mostBoughtBookId)
      await setBookDetails(result.bookDetails)
      navigate("/bookdetails")
    }


    useEffect(() => {
        handelBookData();
        handelBookAuthor()
        getPictureOfMostBoughtBook()
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
                </div>
                <div className="bookCoverPicture" onClick={handelBooketailView}>
                    <img src={bookImagePath ? `${serverURL}/${(bookImagePath).replace(/\\/g, '/')}` : "./Images/bookCoverPhoto.jpg"} alt="Most bought Book Image" />
                </div>

                {authorDetails ? (
                    <>
                        <AuthorHighlightBox name={(authorDetails.bookAuthor).toUpperCase()} totalBooks={authorDetails.totalBooks} picture="./Images/author.png" />

                    </>
                ) : (<span>Author Details not found</span>)}

                {books.length > 0 ? (
                    <>
                        <BookHighlights bookId={books[0].id} bookName={(books[0].bookName).toUpperCase()} bookCategory={(books[0].bookCategory).toUpperCase()} bookPicture={books[0].bookImage ? `${serverURL}/${(books[0].bookImage).replace(/\\/g, '/')}` : "./Images/defaultBook.png"}
                            alt={books[0].bookName} />
                    </>

                ) : (<span>Data Loading</span>)}
            </div>
        </>
    )
}

export default HeadingBox
