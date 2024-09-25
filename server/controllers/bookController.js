import db from "../config/dbConn.js";
import bookInputValidate from "../validation/bookDetailValidation.js";
import bookQueries from "../repository/queries/bookQueries.js";
import  serverError  from "../repository/statusCode/serverError.js";
const addNewBook = async (req, res) => {
  const { bookName, bookCategory, bookAuthor, bookPrice } = req.body;

  try {
    if (!bookInputValidate(bookName, bookCategory, bookAuthor, bookPrice)) {
      return res.status(400).json({ message: "Invalid input" });
    } else {
      await db.query(bookQueries.addNewBook, [
        bookName,
        bookCategory,
        bookAuthor,
        bookPrice,
      ]);

      const [newlyAddedBooks] = await db.query(bookQueries.getLatestAddedBooks);
      const newlyAddedBook = newlyAddedBooks[0];

      return res
        .status(200)
        .json({ message: "Book added successfully", book: newlyAddedBook });
    }
  } catch (err) {
    console.error(err);
    return serverError(req, res);
  }
};

const getBooks = async (req, res) => {
  try {
    const [db_getBookDetails] = await db.query(bookQueries.getAllBooks);
    if (db_getBookDetails.length > 0) {
      res.status(200).json({
        bookDetails: db_getBookDetails,
      });
    } else {
      res.status(404).json({
        status: "404",
        message: "Book not found",
      });
    }
  } catch (err) {
    serverError(req, res);
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const [checkBookDetails] = await db.query(bookQueries.getBookById, [id]);

    if (checkBookDetails.length == 0) {
      res.status(404).json({
        status: "404",
        message: "Book not found",
      });

      return;
    }

    await db.query(bookQueries.deleteBook, [id]);

    res.status(200).json({
      status: "200",
      message: "Book Deleted successfully",
    });
  } catch (err) {
    serverError(req, res);
  }
};

const updateBook = async (req, res) => {
  const id = parseInt(req.params.id);
  const { bookName, bookCategory, bookAuthor, bookPrice } = req.body;

  try {
    if (!bookInputValidate(bookName, bookCategory, bookAuthor, bookPrice)) {
      return res.status(400).json({ message: "Invalid input" });
    }
    const [checkBookDetails] = await db.query(bookQueries.getBookById, [id]);

    if (checkBookDetails.length > 0) {
      // Update the book details
      await db.query(bookQueries.updateBookDetails, [
        bookName,
        bookCategory,
        bookAuthor,
        bookPrice,
        id,
      ]);

      res.status(200).json({
        status: "200",
        message: "Book Updated Successfully",
      });
    } else {
      res.status(404).json({
        status: "404",
        message: "Book not found",
      });
    }
  } catch (err) {
    serverError(req, res);
  }
};

const getTotalBooks = async (req, res) => {
  try {
    const totalBooks = await db.query(bookQueries.getTotalNumber);
    res
      .status(200)
      .json({ message: "Data fetched Sucessfull", count: totalBooks[0] });
  } catch (err) {
    serverError(req, res);
  }
};




export { addNewBook, getBooks, deleteBook, updateBook, getTotalBooks };
