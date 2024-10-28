import axios from "axios";

const API_URL = "http://localhost:8080";

export const updateBook = async (id, bookData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return { error: "unauthorized" };
  }
  try {
    const response = await axios.post(
      `${API_URL}/book/admin/updateBook/${id}`,
      bookData,
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

export const addBook = async (bookData) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return { error: "unauthorized" };
  }
  try {
    const response = await axios.post(
      `${API_URL}/book/admin/addBook`,
      bookData,
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

export const getBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/book/getBooks`, {});
    console.log(response);
    return response.data.books;
  } catch (err) {
    console.error(err);
  }
};

export const deleteBook = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return "unauthorized";
  }
  try {
    const response = await axios.delete(
      `${API_URL}/book/admin/removeBook/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    return err.response ? err.response.data : err.message;
  }
};

export const getLatestFourBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/book/latestBooks`);

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const getMostFeaturedAuthor = async () => {
  try {
    const response = await axios.get(`${API_URL}/book/getMostFeaturedAuthor`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const getBookById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/book/bookById/${id}`);
    console.log("this is response", response);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const searchBook = async (word) => {
  try {
    const response = await axios.get(`${API_URL}/book/searchBook`, {
      params: { word },
    });
    return response.data.bookDetails[0];
  } catch (err) {
    console.log(err);
  }
};
