import axios from "axios";

const API_URL = "http://localhost:8080";

/**Api for the user registration */
export const registerUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {}
};

/**Api for the user Log in to the system */
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    const data = response.data;
    return data;
  } catch (error) {

  }
};
