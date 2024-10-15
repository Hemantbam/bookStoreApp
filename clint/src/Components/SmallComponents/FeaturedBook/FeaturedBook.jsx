import './FeaturedBook.css';
import RedSubmitBtn from '../Button/RedSubmitBtn';

function FeaturedBook() {
    return (
        <div className="featuredBookContainer">
            <div className="featuredBook">
                <div className="featuredBookDescription">
                    <span className='bookCategory'>POLITICAL SCIENCE</span>
                    <p>
                        In Black Men: Obsolete, Single, Dangerous?, Haki Madhubuti provides insightful
                        commentary on Black life and culture, addressing critical issues in African American
                        families and offering practical solutions for their betterment.
                        Click the button to select more of our titles.
                    </p>
                   <RedSubmitBtn btnName="Explore more"/>
                </div>
                <div className="featuredBookImage">
                    <img src="./Images/book3.jpg" alt="Featured Book" />
                </div>
            </div>
        </div>
    );
}

export default FeaturedBook;
