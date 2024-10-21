import axios from "axios";

const API_URL = "http://localhost:8080";

export const addBookOrder = async (orderData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return { error: "unauthorized" };
    }
    try {
      const response = await axios.post(
        `${API_URL}/order/addOrder`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      if (err.response) {
        return { error: err.response.data, status: err.response.status };
      }
      return { error: err.message };
    }
  };
  