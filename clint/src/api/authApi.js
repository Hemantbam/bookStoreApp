import axios from "axios";

const API_URL = "http://localhost:8080";

export const registerUser = async (email, password, otp) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      email,
      password,
      otp,
    });

    console.log(response); 
    return response; 
  } catch (error) {

    console.error("Error during registration:", error);

    return {
      message:
        error.response?.data?.message || "An error occurred. Please try again.",
    };
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    console.log(response)
    const data = response.data;
    return data;
  } catch (error) {}
};

export const generateOtpForUserRegistration = async (email) => {
  try {
      const response = await axios.post(
          `${API_URL}/auth/generateOtpForRegistration`,
          { email }
      );
      console.log("Successful response:", response.data);
      return response.data;
  } catch (error) {
      console.log("Error occurred:", error);
      
      if (error.response) {
          return {
              message: error.response.data.message,
              status: error.response.status,
          };
      } else {
          return {
              message: "An unexpected error occurred.",
              status: 500,
          };
      }
  }
};
