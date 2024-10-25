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
      console.log(err)
      if (err.response) {
        return { error: err.response.data, status: err.response.status };
      }
      return { error: err.message };
    }
  };
  

  export const getPendingOrders=async()=>{
    const token = localStorage.getItem("token");
    if (!token) {
      return { error: "unauthorized" };
    }
    try {
      const response = await axios.get(
        `${API_URL}/order/getPendingOrders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log(err)
      if (err.response) {
        return { error: err.response.data, status: err.response.status };
      }
      return { error: err.message };
    }
  }