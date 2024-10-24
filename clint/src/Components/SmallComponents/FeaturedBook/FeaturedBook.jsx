import './FeaturedBook.css';
import RedSubmitBtn from '../Button/RedSubmitBtn';
import { CartContext } from '../../../Context/context';
import Swal from 'sweetalert2';
import { useContext } from 'react';

function FeaturedBook({ bookName, bookCategory, bookAuthor, bookPrice, bookDescription, }) {

    const bookToAdd = {
        name: bookName,
        category: bookCategory,
        price: parseFloat(bookPrice),
        quantity: 1,
    };

    const { books, setBooks } = useContext(CartContext);


    const isBookInCart = books.find(book => book.name === bookName)

    const handleAddToCart = () => {

        if (!isBookInCart) {
            Swal.fire({
                title: "Book added to cart",
                text: "You just added a book to cart",
                icon: "success"
            });
            return setBooks([...books, bookToAdd]);
        }
        Swal.fire({
            title: "Opps",
            text: "Book already in cart ",
            icon: "warning"
        });

    };
    return (
        <div className="featuredBookContainer">
            <div className="featuredBook">
                <div className="featuredBookDescription">
                    <span className='bookCategory'>{bookCategory}</span>
                    <p>
                        <span className="bookName">{bookName}</span> <br />
                        <span className="bookAuthor">By {bookAuthor}</span> <br /> 
                        <span className="bookDescription">{bookDescription}</span> <br />
                        <span className="bookPrice">Price: {bookPrice}</span>
                    </p>
                    <button className={isBookInCart ? 'bookInCartBtn' : 'buyBtn'} onClick={handleAddToCart}>{isBookInCart ? "In cart" : "Add to cart"}  </button>
                </div>
                <div className="featuredBookImage">
                    <img src="./Images/book3.jpg" alt="Featured Book" />
                </div>
            </div>
        </div>
    );
}

export default FeaturedBook;
