import axios from "axios";

const API_URL = "http://localhost:8080";

export const addUserContactUsDetails = async (userName, userEmail, message) => {
  try {
    const response = await axios.post(
      `${API_URL}/contactUs/addDetailToContactUs`,
      {
        userName,
        userEmail,
        message,
      }
    );
    return response;
  } catch (err) {
    if (err.response) {
      return { error: err.response.data, status: err.response.status };
    }
    return { error: err.message };
  }
};

export const getAllContactUsInformation = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return console.log("no token");
  }
  try {
    const response = await axios.get(
      `${API_URL}/contactUs/admin/getContactUsInformation`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);

    return response.data;
  } catch (err) {
    if (err.response) {
      return { error: err.response.data, status: err.response.status };
    }
    return { error: err.message };
  }
};



export const deleteContactUsDetail = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return console.log("no token");
  }
  try {
    const response = await axios.delete(
      `${API_URL}/contactUs/admin/deleteContactUsInformation/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response)
    console.log(response.data);

    return response.data;
  } catch (err) {
    if (err.response) {
      return { error: err.response.data, status: err.response.status };
    }
    return { error: err.message };
  }
};
