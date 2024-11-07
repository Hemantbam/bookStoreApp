import NavigationBar from '../../Components/NavigationBar/NavigationBar'
import HeadingBox from '../../Components/heading/HeadingBox'
import BookLists from '../../Components/Body/BookLists'
import Footer from '../../Components/Footer/Footer'
import './homePage.css'
function HomePage() {
    return (
        <>
            <div className="homePagecontainer">
                <NavigationBar />
                <HeadingBox />
                <BookLists />
                <Footer />
            </div>

        </>
    )
}

export default HomePage
