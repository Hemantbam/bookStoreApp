import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../src/Pages/HomePage/HomePage.jsx";
import Login from "../src/Components/Login/Login.jsx";
import Checkout from "../src/Components/Checkout/Checkout.jsx";
import RegisterForm from "../src/Components/Register/RegisterForm.jsx";
import AdminDashboard from "../src/Pages/AdminDashboardPage/AdminDashboard.jsx";
import PrivateRoutes from "./PrivateRoutes.jsx";
import BookCart from "../src/Components/Cart/BookCart.jsx";
import ResetPassword from "../src/Pages/ResetPassword/ResetPassword.jsx";
import OtpVerification from '../src/Pages/ResetPassword/OtpVerification.jsx'
import AboutUs from "../src/Pages/AboutUs/AboutUs.jsx";
import RegistrationOtpVerification from "../src/Components/Register/RegistrationOtpVerification.jsx";
function RouteApp() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/aboutUs' element={<AboutUs />} />
                    <Route path='/registerOtpVerification' element={<RegistrationOtpVerification />} />
                    <Route path='/otpVerification' element={<OtpVerification />} />
                    <Route path='/resetPassword' element={<ResetPassword />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<RegisterForm />} />
                    <Route path='/cart' element={<BookCart />} />
                    <Route path='/checkout' element={<Checkout />} />
                    <Route path="/admindashboard" element={<PrivateRoutes component={AdminDashboard} />} />
                    <Route path="*" element={"Page not found"} />
                </Routes>
            </Router>
        </>
    )
}

export default RouteApp
