import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const PrivateRoutes = (props) => {
    const token = localStorage.getItem('token');
    
    const getUserRole = () => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                return decoded.role; 
            } catch (error) {
                console.error("Token decoding failed:", error);
                return null; 
            }
        }
        return null; 
    };

    const userRole = getUserRole();

    if (userRole === "admin") {
        const Component = props.component; 
        return <Component />;
    } else if (userRole === "basic") {
        const Component = props.component; 
        return <Component />;
    } else {
        return <Navigate to='/login' />; 
    }
};

export default PrivateRoutes;
