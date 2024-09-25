import axios from "axios";
const API_URL = "http://localhost:8080";
const token = localStorage.getItem("token");

const userDetails = async () => {
  try {
    const response = await axios(`${API_URL}/user/getNewUser`, {
      headers: {
        Authorization: `"Bearer" ${token}`,
      },
    });
    const userData = response.data.userDetails[0];
    return userData;
  } catch (err) {}
};

const allUserDetails = async () => {
  try {
    const response = await axios(`${API_URL}/user/getAllUsers`, {
      headers: {
        Authorization: `"Bearer" ${token}`,
      },
    });
    const userData = response.data.userDetails;
    return userData;
  } catch (err) {}
};

const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/user/delete/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    return err;
  }
};

const updateUser = async (id, email) => {
  if (!token) {
    return console.log("no token");
  }
  try {
    const response = await axios.put(
      `${API_URL}/user/update/${id}`,
      { userEmail: email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err)
    return err;
  }
};
export { userDetails, allUserDetails, deleteUser, updateUser };
