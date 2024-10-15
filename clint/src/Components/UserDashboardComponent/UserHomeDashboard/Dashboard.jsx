import { useState, useEffect } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { getTotalBooks, getTotalUsers } from '../../../api/totalDetails';
import { jwtDecode } from 'jwt-decode';
import { userDetails } from '../../../api/userDetails';
import { getLatestFourBooks } from '../../../api/bookDetails';
import BookDetails from '../../SmallComponents/BookDetails/BookDetails'
import Swal from 'sweetalert2';
const Dashboard = () => {
    const [totalBooks, setTotalBooks] = useState(0)
    const [userEmail, setUserEmail] = useState("")
    const [books, setBooks] = useState([])
    console.log("books",books)


    const navigate = useNavigate()

    const handelGetBooks = async () => {
        const details = await getLatestFourBooks();

        console.log("details",details)
         setBooks(details.bookDetails)
    console.log("books",books)


    }

    const handelLogOut = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log out!'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("token");
                navigate("/");
            }
        });
    };

    const handeluserData = () => {
        const token = localStorage.getItem("token")
        const decodedtoken = jwtDecode(token)
        setUserEmail(decodedtoken.email)
    }
    const totalCount = async () => {

        try {
            const countBooks = await getTotalBooks();
            setTotalBooks(countBooks)
        } catch (err) {
            setTotalBooks(0)
            return err
        }
    }




    useEffect(() => {
        totalCount();
        handeluserData()
        handelGetBooks();
    }, [])

    return (
        <>
            <div className="mainContent">
                <header>
                    <span><h1>Welcome,</h1> {userEmail}</span>
                    <div className="userAccount">
                        <img src="Images/user.png" alt="" />
                        <div className="dropDownContent">
                            <a href="#">profile</a>
                            <a href="#" onClick={handelLogOut}>Logout</a>
                        </div>
                    </div>
                </header>
                <section className="stats">
                    <div className="statBox">
                        <h3>Total Books</h3>
                        <p>{totalBooks}</p>
                    </div>
                </section>
                <section>
                    <h2>Latest Books</h2>
                    <div className='recentActivitiesConainer'>
                        {/* <BookDetails bookPicture="./Images/book2.jpg" bookName={books[0].bookName} bookCategory={books[0].bookCategory} bookPrice={books[0].bookPrice} /> */}
                        {/* <BookDetails bookPicture="./Images/book2.jpg" bookName={books[1].bookName} bookCategory={books[1].bookCategory} bookPrice={books[1].bookPrice} />
                        <BookDetails bookPicture="./Images/book2.jpg" bookName={books[2].bookName} bookCategory={books[2].bookCategory} bookPrice={books[2].bookPrice} />
                        <BookDetails bookPicture="./Images/book2.jpg" bookName={books[3].bookName} bookCategory={books[3].bookCategory} bookPrice={books[3].bookPrice} /> */}


                    </div>
                </section>

            </div>
        </>
    );
};

export default Dashboard;
