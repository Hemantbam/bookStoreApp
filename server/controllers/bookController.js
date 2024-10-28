import { set500Err } from "./controllerHelpers/controllerHelper.js";
import bookInputValidate from "../validation/bookDetailValidation.js";
import {
  addNewBooktoDb,
  deleteBookByBookId,
  getAllBooksDetails,
  getBookDetailsById,
  getAuthorWithMostBooks,
  getLatestAddedFourBooks,
  getTotalBookCount,
  updateBookByBookId,
  searchBookByKeyWords,
  updateBookImageById,
} from "../services/bookServices.js";

//______________________________________________________________________________________________

const addNewBook = async (req, res) => {
  const { bookName, bookCategory, bookAuthor, bookPrice, bookDescription } =
    req.body;

  const bookImage = req.file ? req.file.path : null;
  console.log("This is book path", bookImage);
  const bookData = {
    bookName,
    bookCategory,
    bookAuthor,
    bookPrice,
    bookDescription,
  };

  const result = await addNewBooktoDb(bookData, bookImage);

  res.status(result.status).json({ message: result.message });
};

//______________________________________________________________________________________________

const getAllBooks = async (req, res) => {
  const result = await getAllBooksDetails();
  if (result.success) {
    return res.status(result.status).json({ books: result.books });
  }
  return res.status(result.status).json({ message: result.message });
};

//______________________________________________________________________________________________

const getBookByID = async (req, res) => {
  const bookId = parseInt(req.params.id);
  if (isNaN(bookId)) {
    return res.status(400).json({ message: "Invalid book ID." });
  }

  const result = await getBookDetailsById(bookId);
  if (result.success) {
    return res.status(result.status).json({ bookDetails: result.bookDetails });
  }
  return res.status(result.status).json({ message: result.message });
};

//______________________________________________________________________________________________

const getAllBooksForAdmin = async (req, res) => {};

//______________________________________________________________________________________________

const deleteBook = async (req, res) => {
  const bookId = parseInt(req.params.id);
  if (isNaN(bookId)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }

  const result = await deleteBookByBookId(bookId);
  res.status(result.status).json({ message: result.message });
};
//______________________________________________________________________________________________

const updateBookDetails = async (req, res) => {
  const bookId = parseInt(req.params.id);

  const { bookName, bookCategory, bookAuthor, bookPrice, bookDescription } =
    req.body;
  console.log("Received request body:", req.body);

  // const updateImage = req.file ? req.file.path : null;

  // console.log("backend book image", updateImage);
  if (isNaN(bookId)) {
    return res.status(400).json({ message: "Invalid book ID." });
  }

  // console.log(updateImage);

  console.log("Incoming update for book ID:", bookId);

  const bookData = {
    bookName,
    bookCategory,
    bookAuthor,
    bookPrice,
    bookDescription,
  };

  const result = await updateBookByBookId(bookId, bookData ); //updateImage

  return res.status(result.status).json({ message: result.message });
};

//______________________________________________________________________________________________

const getTotalBooks = async (req, res) => {
  const result = await getTotalBookCount();
  if (result.success) {
    return res.status(result.status).json({ bookCount: result.bookCount });
  }
  return res.status(result.status).json({ message: result.message });
};

//______________________________________________________________________________________________

const getLatestFourBooks = async (req, res) => {
  const result = await getLatestAddedFourBooks();
  return res
    .status(result.status)
    .json({ message: result.message, bookDetails: result.bookDetails });
};

//______________________________________________________________________________________________

const getMostFeaturedAuthor = async (req, res) => {
  const result = await getAuthorWithMostBooks();
  return res
    .status(result.status)
    .json({ message: result.message, bookDetails: result.bookDetails });
};

//______________________________________________________________________________________________

const getBookBywords = async (req, res) => {
  const { word } = req.query;
  const result = await searchBookByKeyWords(word);
  console.log(result);
  return res
    .status(result.status)
    .json({ message: result.message, bookDetails: result.bookdetails });
};



const updateBookImage = async (req, res) => {
  const bookId = parseInt(req.params.id);
console.log("backend bookId",bookId)
  const updateImage = req.file ? req.file.path : null;

  if (isNaN(bookId)) {
    return res.status(400).json({ message: "Invalid book ID." });
  }


  const result = await updateBookImageById(bookId, updateImage ); 

  return res.status(result.status).json({ message: result.message });
};

//______________________________________________________________________________________________

export {
  addNewBook,
  getAllBooks,
  deleteBook,
  updateBookDetails,
  getBookByID,
  getAllBooksForAdmin,
  getTotalBooks,
  getLatestFourBooks,
  getMostFeaturedAuthor,
  getBookBywords,
  updateBookImage,
};
