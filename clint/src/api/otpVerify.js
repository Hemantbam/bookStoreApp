import axios from "axios";

const API_URL = "http://localhost:8080";

export const createOtp = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/reset/resetPassword`, {
      email,
    });
    return response.data;
  } catch (err) {
    if (err.response) {
      return { error: err.response.data, status: err.response.status };
    }
    return { error: err.message };
  }
};

export const resetPassword = async (email, password, otp) => {
  try {
    const response = axios.put(`${API_URL}/reset/verifyOtp`, {
      email,
      password,
      otp,
    });
    console.log(response);
    return (await response).data;
  } catch (err) {
    if (err.response) {
      return { err: err.response.data, status: err.response.status };
    }
    return { error: err.message };
  }
};

export const registrationOtpVerify = async (email, otp) => {
  try {
    const response = axios.put(`${API_URL}/reset/registrationOtpVerify`, {
      email,
      otp,
    });
    console.log(response);
    return (await response).data;
  } catch (err) {
    if (err.response) {
      return { err: err.response.data, status: err.response.status };
    }
    return { error: err.message };
  }
};

