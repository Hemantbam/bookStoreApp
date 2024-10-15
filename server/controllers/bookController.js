import {
  addBook,
  getBooks,
  getBookByBookId,
  updateBook,
  deleteBookDetails,
  getTotalBooksCount,
  getBookByBookName,
  getLatestBooks,
  getAuthorDetails
} from "../repository/bookRepository.js";
import { set500Err } from "./controllerHelpers/controllerHelper.js";
import bookInputValidate from "../validation/bookDetailValidation.js";

//______________________________________________________________________________________________

const addNewBook = async (req, res) => {
  const reqBody = req.body;

  try {
    if (!bookInputValidate(reqBody)) {
      return res.status(400).json({ message: "Invalid input. Please fill all fields correctly." });
    }

    const bookDetails = await getBookByBookName(reqBody.bookName);
    if (bookDetails) {
      return res.status(409).json({ message: "Book already exists" });
    }

    await addBook(reqBody);
    return res.status(201).json({ message: "Book added successfully" });
  } catch (err) {
    console.error("Error adding book:", err);
    set500Err(err, req, res);
  }
};


//______________________________________________________________________________________________

const getAllBooks = async (req, res) => {
  try {
    const allBooks = await getBooks();
    return res.status(200).json(allBooks);
  } catch (err) {
    set500Err(err, req, res);
  }
};

//______________________________________________________________________________________________

const getBookByID = async (req, res) => {
  const bookId = parseInt(req.params.id);
  if (isNaN(bookId)) {
    return res.status(404).json({ message: "Book Not Found" });
  }

  try {
    const book = await getBookByBookId(bookId);

    if (book == null) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ bookDetails: book });
  } catch (err) {
    set500Err(err, req, res);
  }
};

//______________________________________________________________________________________________

const getAllBooksForAdmin = async (req, res) => {
  // return getAllBooks(req, res); // Reuse the same getAllBooks function
};

//______________________________________________________________________________________________

const deleteBook = async (req, res) => {
  const bookId = parseInt(req.params.id); // Get bookId from request parameters
  if (isNaN(bookId)) {
    return res.status(404).json({ message: "Book not found" });
  }

  try {
    const book = await getBookByBookId(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    await deleteBookDetails(bookId);
    return res.status(200).json({ message: "Book Deleted Successfully" });
  } catch (err) {
    set500Err(err, req, res);
  }
};

//______________________________________________________________________________________________

const updateBookDetails = async (req, res) => {
  const bookId = parseInt(req.params.id);
  const reqBody = req.body;

  if (isNaN(bookId)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }

  try {
    if (!bookInputValidate(reqBody)) {
      return res.status(400).json({ message: "Invalid input. Please check all fields." });
    }

    const existingBook = await getBookByBookId(bookId);
    if (!existingBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    const duplicateBook = await getBookByBookName(reqBody.bookName);
    if (duplicateBook && duplicateBook.id !== bookId) {
      return res.status(409).json({ message: "A book with the same name already exists" });
    }

    const updateResult = await updateBook(bookId, reqBody);
    if (updateResult === 0) {
      return res.status(404).json({ message: "Book not found or no changes made" });
    }

    res.status(200).json({ message: "Book updated successfully" });
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};


//______________________________________________________________________________________________

const getTotalBooks = async (req, res) => {
  try {
    const totalBooks = await getTotalBooksCount();
    res
      .status(200)
      .json({ message: "Data fetched Successfully", bookCount: totalBooks });
  } catch (err) {
    set500Err(err, req, res);
  }
};

//______________________________________________________________________________________________

const getLatestFourBooks = async (req, res) => {
  try {
    const books = await getLatestBooks();
    res
      .status(200)
      .json({ message: "Data fetched Sucessfully", bookDetails: books });
  } catch (err) {
    set500Err(err, req, res);
  }
};

//______________________________________________________________________________________________

const getMostFeaturedAuthor = async (req, res) => {
  try {
    const author = await getAuthorDetails();
    res
      .status(200)
      .json({ message: "Data fetched Sucessfully", authorDetails: author });
  } catch (err) {
    set500Err(err, req, res);
  }
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
  getMostFeaturedAuthor
};
