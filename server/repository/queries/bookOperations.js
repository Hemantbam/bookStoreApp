import dbConn from "../../config/dbConn.js";
import bookInputValidate from "../../validation/bookDetailValidation.js";
import { serverError } from "../statusCode/serverError.js";

const newBooksAdd = async (req,res) => {
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
  
        const [newlyAddedBooks] = await dbConn.query(
          "SELECT * FROM bookdetails ORDER BY id DESC LIMIT 1"
        );
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

export default {newBooksAdd}