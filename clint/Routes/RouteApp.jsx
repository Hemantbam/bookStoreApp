import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../src/Pages/HomePage/HomePage.jsx";
import Login from "../src/Components/Login/Login";
import RegisterForm from "../src/Components/Register/RegisterForm.jsx";
import AdminDashboard from "../src/Pages/AdminDashboardPage/AdminDashboard.jsx";
import PrivateRoutes from "./PrivateRoutes.jsx";
import UserDashboard from "../src/Pages/UserDashboardPage/UserDashboard.jsx";
import BookCart from "../src/Components/SmallComponents/Cart/BookCart.jsx";
function RouteApp() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<RegisterForm />} />
                    <Route path='/cart' element={<BookCart />} />
                    <Route path="/admindashboard" element={<PrivateRoutes component={AdminDashboard} />} />
                    <Route path="/userdashboard" element={<PrivateRoutes component={UserDashboard} />} />
                    <Route path="*" element={"Page not found"} />
                </Routes>
            </Router>
        </>
    )
}

export default RouteApp
