import axios from "axios";
const API_URL = "http://localhost:8080";

const userDetails = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return console.log("no token");
  }
  try {
    const response = await axios.get(`${API_URL}/user/admin/getLatestUser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userData = response.data.userDetails[0];
    return userData;
  } catch (err) {}
};

const allUserDetails = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return console.log("no token");
  }
  try {
    const response = await axios.get(`${API_URL}/user/admin/getAllUsers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userData = response.data.userDetails;
    return userData;
  } catch (err) {}
};

const deleteUser = async (userId) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return console.log("no token");
  }
  try {
    const response = await axios.delete(
      `${API_URL}/user/admin/delete/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

const updateUser = async (id, email) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return console.log("no token");
  }
  try {
    const response = await axios.put(
      `${API_URL}/user/admin/update/${id}`,
      { email: email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    return err;
  }
};
export { userDetails, allUserDetails, deleteUser, updateUser };
