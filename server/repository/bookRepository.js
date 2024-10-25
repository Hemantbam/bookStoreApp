import dbConn from "../config/dbConn.js";

//____________________________________________________________________________________

export const addBook = async (reqBody,bookImage) => {
  const query =
    "INSERT INTO bookdetails (bookName, bookCategory, bookAuthor, bookPrice, bookDescription, bookImage) VALUES (?, ?, ?, ?, ?, ?)";
  const response = await dbConn.query(query, [
    reqBody.bookName.toLowerCase(),
    reqBody.bookCategory.toLowerCase(),
    reqBody.bookAuthor.toLowerCase(),
    reqBody.bookPrice,
    reqBody.bookDescription,
    bookImage,
  ]);
  return response ? true : false;
};

//____________________________________________________________________________________

export const getBooks = async () => {
  const query = "SELECT * FROM bookdetails";
  const [books] = await dbConn.query(query);
  if (books.length < 0) {
    return null;
  }
  return books;
};

//____________________________________________________________________________________

export const getBookByBookId = async (bookId) => {
  const query = "select * from bookdetails where id=?";
  const dbRes = await dbConn.query(query, [bookId]);
  const books = dbRes[0];
  if (books.length < 1) {
    return null;
  }

  return books[0];
};

//____________________________________________________________________________________

export const deleteBookDetails = async (bookId) => {
  const query = "DELETE FROM bookdetails WHERE id = ?";
  await dbConn.query(query, [bookId]);
};

//____________________________________________________________________________________

export const updateBook = async (bookId, bookData, bookImage) => {
  const query =
    "UPDATE bookdetails SET bookName = ?, bookCategory = ?, bookAuthor = ?, bookPrice = ? , bookDescription=?, bookImage=? WHERE id = ?";
  await dbConn.query(query, [
    bookData.bookName.toLowerCase(),
    bookData.bookCategory.toLowerCase(),
    bookData.bookAuthor.toLowerCase(),
    bookData.bookPrice,
    bookData.bookDescription,
    bookImage,
    bookId,
  ]);
};

//____________________________________________________________________________________

export const getTotalBooksCount = async () => {
  const query = "SELECT COUNT(*) as count FROM bookdetails;";
  const [count] = await dbConn.query(query);
  if (count.length < 0) {
    return null;
  }
  return count[0];
};

//____________________________________________________________________________________

export const getBookByBookName = async (bookName) => {
  const query = "SELECT * FROM bookdetails WHERE bookName = ?";
  const dbRes = await dbConn.query(query, [bookName]);
  const books = dbRes[0];
  return books.length > 0 ? books[0] : null;
};

//____________________________________________________________________________________

export const getLatestBooks = async () => {
  const query = "SELECT * FROM bookdetails ORDER BY id DESC LIMIT 4";
  const [books] = await dbConn.query(query);
  if (books.length < 0) {
    return null;
  }
  return books;
};

//____________________________________________________________________________________

export const getAuthorDetails = async () => {
  const query =
    "SELECT bookAuthor, count(bookAuthor) as totalBooks FROM bookdetails GROUP BY bookAuthor ORDER BY COUNT(bookAuthor) DESC LIMIT 1;";
  const [bookAuthor] = await dbConn.query(query);
  if (bookAuthor.length === 0) {
    return null;
  }
  return bookAuthor[0];
};

export const searchBook = async (word) => {
  const query =
    "SELECT * FROM bookdetails WHERE bookName LIKE ? OR bookCategory LIKE ? OR bookAuthor LIKE ?";
  const searchValue = `%${word}%`;
  const result = await dbConn.query(query, [
    searchValue,
    searchValue,
    searchValue,
  ]);
  if (result) {
    return result[0];
  }
  return null;
};
