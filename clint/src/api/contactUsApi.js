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

export const addUserToSubscriberList = async (userEmail) => {
  try {
    const response = await axios.post(`${API_URL}/contactUs/subscribe`, {
      userEmail,
    });
    return response;
  } catch (err) {
    if (err.response) {
      return { error: err.response.data, status: err.response.status };
    }
    return { error: err.message };
  }
};
