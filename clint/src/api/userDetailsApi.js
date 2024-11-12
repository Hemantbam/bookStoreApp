import axios from "axios";
const API_URL = "http://localhost:8080";

export const userDetailsById = async (id) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return console.log("no token");
  }
  try {
    const response = await axios.get(
      `${API_URL}/userDetails/getDetails/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response)
    return response.data;
  } catch (err) {}
};


export const addUserProfileDetails = async (id, userData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return { error: "unauthorized" };
    }
    try {
      const response = await axios.post(
        `${API_URL}/userDetails/addUserDetails/${id}`,
        userData,
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


export const updateUserProfile = async (id, userData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return { error: "unauthorized" };
    }
    try {
      const response = await axios.put(
        `${API_URL}/userDetails/updateProfile/${id}`,
        userData,
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
  

  export const updateUserProfileImageById = async (id, userImage) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return { error: "unauthorized" };
    }
  
    const formData = new FormData();
    formData.append("userImage", userImage);
  
    try {
      const response = await axios.put(
        `${API_URL}/userDetails/userImageUpdate/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      return response.data;
    } catch (err) {
      console.error("Error response:", err.response);
      if (err.response) {
        return { error: err.response.data, status: err.response.status };
      }
      return { error: err.message };
    }
  };
  