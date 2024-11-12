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
        `${API_URL}/order/admin/getPendingOrders`,
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


  export const getPendingOrderDetails=async()=>{
    const token = localStorage.getItem("token");
    if (!token) {
      return { error: "unauthorized" };
    }
    try {
      const response = await axios.get(
        `${API_URL}/order/admin/pendingOrderInformation`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response)
      return response.data;
    } catch (err) {
      console.log(err)
      if (err.response) {
        return { error: err.response.data, status: err.response.status };
      }
      return { error: err.message };
    }
  }


  export const getCompletedOrderCount=async()=>{
    const token = localStorage.getItem("token");
    if (!token) {
      return { error: "unauthorized" };
    }
    try {
      const response = await axios.get(
        `${API_URL}/order/admin/getCompletedOrders`,
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

  export const handelDelivery=async(id)=>{
    const token = localStorage.getItem("token");
    if (!token) {
      return { error: "unauthorized" };
    }
    try {
      const response = await axios.put(
        `${API_URL}/order/admin/updateOrderStatus/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response)
      return response.data;
    } catch (err) {
      console.log(err)
      if (err.response) {
        return { error: err.response.data, status: err.response.status };
      }
      return { error: err.message };
    }
  }


  export const getCompletedOrderList=async()=>{
    const token = localStorage.getItem("token");
    if (!token) {
      return { error: "unauthorized" };
    }
    try {
      const response = await axios.get(
        `${API_URL}/order/admin/completedOrderInformation`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response)
      return response.data;
    } catch (err) {
      console.log(err)
      if (err.response) {
        return { error: err.response.data, status: err.response.status };
      }
      return { error: err.message };
    }
  }


  export const cancelOrder=async(id)=>{
    const token = localStorage.getItem("token");
    if (!token) {
      return { error: "unauthorized" };
    }
    try {
      const response = await axios.put(
        `${API_URL}/order/admin/cancelOrder/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response)
      return response.data;
    } catch (err) {
      console.log(err)
      if (err.response) {
        return { error: err.response.data, status: err.response.status };
      }
      return { error: err.message };
    }
  }



  export const getCompletedOrderCountOfUser=async(id)=>{
    const token = localStorage.getItem("token");
    if (!token) {
      return { error: "unauthorized" };
    }
    try {
      const response = await axios.get(
        `${API_URL}/order/admin/userDeliveredOrderCount/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response)
      return response.data;
    } catch (err) {
      console.log(err)
      if (err.response) {
        return { error: err.response.data, status: err.response.status };
      }
      return { error: err.message };
    }
  }

  export const getPendingOrderCountOfUser=async(id)=>{
    const token = localStorage.getItem("token");
    if (!token) {
      return { error: "unauthorized" };
    }
    try {
      const response = await axios.get(
        `${API_URL}/order/admin/userPendingOrderCount/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response)
      return response.data;
    } catch (err) {
      console.log(err)
      if (err.response) {
        return { error: err.response.data, status: err.response.status };
      }
      return { error: err.message };
    }
  }

  export const getCancelledOrderCountOfUser=async(id)=>{
    const token = localStorage.getItem("token");
    if (!token) {
      return { error: "unauthorized" };
    }
    try {
      const response = await axios.get(
        `${API_URL}/order/admin/userCancelledOrderCount/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response)
      return response.data;
    } catch (err) {
      console.log(err)
      if (err.response) {
        return { error: err.response.data, status: err.response.status };
      }
      return { error: err.message };
    }
  }

  export const getUserOrderListById=async(id)=>{
    const token = localStorage.getItem("token");
    if (!token) {
      return { error: "unauthorized" };
    }
    try {
      const response = await axios.get(
        `${API_URL}/order/admin/userOrderDetails/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response)
      return response.data;
    } catch (err) {
      console.log(err)
      if (err.response) {
        return { error: err.response.data, status: err.response.status };
      }
      return { error: err.message };
    }
  }



  
  export const getCancelledOrderDetails=async()=>{
    const token = localStorage.getItem("token");
    if (!token) {
      return { error: "unauthorized" };
    }
    try {
      const response = await axios.get(
        `${API_URL}/order/admin/cancelledOrderDetails`,
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