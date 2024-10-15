import axios from "axios";
const API_URL = "http://localhost:8080";

export const getTotalUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    const response = await axios(`${API_URL}/user/admin/totalUsers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const count = response.data.userCount.count;
    return count;
  } catch (err) {}
};

/**Api to get the total count of the books in the system */
export const getTotalBooks = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }
    const response = await axios(`${API_URL}/book/bookCount`, {
      headers: {
        Authorization: `Bearer ${token}`, // Proper Authorization Header
      },
    });
    const count = response.data.bookCount.count;
    return count;
  } catch (err) {}
};
