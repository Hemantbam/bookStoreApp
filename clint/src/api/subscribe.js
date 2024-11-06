import axios from "axios";

const API_URL = "http://localhost:8080";

export const addUserToSubscriberList = async (userEmail) => {
    try {
      const response = await axios.post(`${API_URL}/subscribe/subscribeEmail`, {
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

  export const getSubscribersList = async () => {
    try {
      const response = await axios.get(`${API_URL}/subscribe/admin/subscriberList`,);
      return response;
    } catch (err) {
      if (err.response) {
        return { error: err.response.data, status: err.response.status };
      }
      return { error: err.message };
    }
  };