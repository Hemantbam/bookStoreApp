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
} from "../services/bookServices.js";

//______________________________________________________________________________________________

const addNewBook = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Error adding new book:", error);
    res
      .status(500)
      .json({ message: "An error occurred while adding the book." });
  }
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
  console.log("22222222222222222222222222222222")

  const bookId = parseInt(req.params.id);
  const { bookName, bookCategory, bookAuthor, bookPrice, bookDescription } = req.body;
  console.log("Received request body:", req.body);

  if (isNaN(bookId)) {
      return res.status(400).json({ message: "Invalid book ID." });
  }
  console.log("reqFile",req.file);
  console.log("Request Headers:", req.headers);
  console.log("Request Body:", req.body);
  console.log("Request Files:", req.file);
  const bookImage = req.file ? req.file.path : null;
console.log(bookImage)
  console.log("Incoming update for book ID:", bookId);
  console.log("Book data:", {
      bookName,
      bookCategory,
      bookAuthor,
      bookPrice,
      bookDescription,
      bookImage,
  });

  // Prepare book data to be updated
  const bookData = {
      bookName,
      bookCategory,
      bookAuthor,
      bookPrice,
      bookDescription,
      ...(bookImage && { bookImage }), // Only add bookImage if it's provided
  };

  try {
      // Assuming updateBookByBookId is a function that updates the book in the database
      const result = await updateBookByBookId(bookId, bookData,bookImage);

      if (!result) {
          return res.status(404).json({ message: "Book not found." });
      }

      // Return success response
      return res.status(200).json({ message: "Book updated successfully." });
  } catch (error) {
      // Log the error for debugging
      console.error("Error occurred during book update:", error);
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
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
};
