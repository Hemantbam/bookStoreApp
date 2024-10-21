import { set500Err } from "../controllers/controllerHelpers/controllerHelper.js";
import {
  addBook,
  getBooks,
  getBookByBookId,
  updateBook,
  deleteBookDetails,
  getTotalBooksCount,
  getBookByBookName,
  getLatestBooks,
  getAuthorDetails,
} from "../repository/bookRepository.js";
import bookInputValidate from "../validation/bookDetailValidation.js";


//______________________________________________________________________________________________

export const addNewBooktoDb = async (req, res, reqBody) => {
  try {
    if (!bookInputValidate(reqBody)) {
      return res
        .status(400)
        .json({ message: "Invalid input. Please fill all fields correctly." });
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


export const getAllBooksDetails = async (req, res) => {
  try {
    const allBooks = await getBooks();
    return res.status(200).json(allBooks);
  } catch (err) {
    set500Err(err, req, res);
  }
};

//______________________________________________________________________________________________


export const getBookDetailsById = async (req, res, bookId) => {
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


export const deleteBookByBookId = async (req, res, bookId) => {
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


export const updateBookByBookId = async (req, res, bookId, reqBody) => {
  if (isNaN(bookId)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }

  try {
    if (!bookInputValidate(reqBody)) {
      return res
        .status(400)
        .json({ message: "Invalid input. Please check all fields." });
    }

    const existingBook = await getBookByBookId(bookId);
    if (!existingBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    const duplicateBook = await getBookByBookName(reqBody.bookName);
    if (duplicateBook && duplicateBook.id !== bookId) {
      return res
        .status(409)
        .json({ message: "A book with the same name already exists" });
    }

    const updateResult = await updateBook(bookId, reqBody);
    if (updateResult === 0) {
      return res
        .status(404)
        .json({ message: "Book not found or no changes made" });
    }

    res.status(200).json({ message: "Book updated successfully" });
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

//______________________________________________________________________________________________


export const getTotalBookCount = async (req, res) => {
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



export const getLatestAddedFourBooks = async (req, res) => {
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


export const getAuthorWithMostBooks= async (req, res) => {
  try {
    const author = await getAuthorDetails();
    res
      .status(200)
      .json({ message: "Data fetched Sucessfully", authorDetails: author });
  } catch (err) {
    set500Err(err, req, res);
  }
};

//______________________________________________________________________________________________
