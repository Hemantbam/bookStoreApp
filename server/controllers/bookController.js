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
  await addNewBooktoDb(req, res, reqBody);
};

//______________________________________________________________________________________________

const getAllBooks = async (req, res) => {
  await getAllBooksDetails(req, res);
};

//______________________________________________________________________________________________

const getBookByID = async (req, res) => {
  const bookId = parseInt(req.params.id);
  getBookDetailsById(req, res);
};

//______________________________________________________________________________________________

const getAllBooksForAdmin = async (req, res) => {};

//______________________________________________________________________________________________

const deleteBook = async (req, res) => {
  const bookId = parseInt(req.params.id);
  await deleteBookByBookId(req, res, bookId);
};
//______________________________________________________________________________________________

const updateBookDetails = async (req, res) => {
  const bookId = parseInt(req.params.id);
  const reqBody = req.body;

  await updateBookByBookId(req, res, bookId, reqBody);
};

//______________________________________________________________________________________________

const getTotalBooks = async (req, res) => {
  await getTotalBookCount(req, res);
};

//______________________________________________________________________________________________

const getLatestFourBooks = async (req, res) => {
  await getLatestAddedFourBooks(req, res);
};

//______________________________________________________________________________________________

const getMostFeaturedAuthor = async (req, res) => {
  await getAuthorWithMostBooks(req, res);
};

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
