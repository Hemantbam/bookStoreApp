import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react'
import HomePage from "../src/assets/Pages/HomePage";
import Login from "../src/assets/Components/Login/Login";
import RegisterForm from "../src/assets/Components/Register/RegisterForm";
import AdminDashboard from "../src/assets/Dashboard/AdminDashboard/AdminDashboard.jsx";
import PrivateRoutes from "./PrivateRoutes.jsx";
function RouteApp() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<RegisterForm />} />
                    <Route path="/admindashboard" element={<PrivateRoutes component={AdminDashboard} />} />
                    <Route path="*" element={"Page not found"} />
                </Routes>
            </Router>
        </>
    )
}

export default RouteApp
