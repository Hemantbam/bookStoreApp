import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

/** Private route for the authentication and secured access as per the authorization */
const PrivateRoutes = (props) => {
    const token = localStorage.getItem('token');
    const isAdmin = () => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.role === "admin") {
                    return true
                }
            } catch (error) {
                return false;
            }
        }
        return false;
    };

    if (isAdmin() == true) {
        const Component = props.component;
        return <Component />;
    }
    return <Navigate to='/login' />;
};

export default PrivateRoutes;
