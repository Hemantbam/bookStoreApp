import './ContactUs.css'
import { useNavigate } from 'react-router-dom'
function ContactUs() {
    const navigate=useNavigate()
    const handelOnclick=()=>{
        navigate("/contactUsPage")
    }
    return (
        <>
            <div className="ContactUsContainer">
                <span className='leftSideQueryText'>Any Other<br />Queries <hr /> </span>
                <span className='contactUsText'>Contact Us <hr />
                </span>
                    <img src="./Images/arrow.png" alt="Button Contact us" onClick={handelOnclick} />

            </div>
        </>
    )
}

export default ContactUs
