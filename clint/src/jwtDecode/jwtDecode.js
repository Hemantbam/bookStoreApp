import { jwtDecode } from "jwt-decode";

const decodeToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const userDetails = jwtDecode(token);
      return userDetails;
    } catch (err) {
      return null;
    }
  }
};
export default decodeToken;
