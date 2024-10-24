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
} from "../services/bookServices.js";

//______________________________________________________________________________________________

const addNewBook = async (req, res) => {
  const reqBody = req.body;
    const result = await addNewBooktoDb(reqBody);
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
      return res
        .status(result.status)
        .json({ bookDetails: result.bookDetails });
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
  const reqBody = req.body;

    if (isNaN(bookId)) {
      return res.status(400).json({ message: "Invalid book ID." });
    }
    const result = await updateBookByBookId(bookId, reqBody);
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
  const result = await getLatestAddedFourBooks(req, res);
    if (result.success) {
      return res
        .status(result.status)
        .json({ bookDetails: result.bookDetails });
    }
    return res.status(result.status).json({ message: result.message });
};

//______________________________________________________________________________________________

const getMostFeaturedAuthor = async (req, res) => {
  const result = await getAuthorWithMostBooks(req, res);
    if (result.success) {
      return res
        .status(result.status)
        .json({ message: result.message, bookDetails: result.bookDetails });
    }

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
};
