import express from "express";
import {
  addNewBook,
  getAllBooks,
  getBookByID,
  getTotalBooks,
  updateBookDetails,
  deleteBook,
  getLatestFourBooks,
  getMostFeaturedAuthor
} from "../controllers/bookController.js";

import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";
verifyToken;
const router = express.Router();

//**Routes for books opeations */
router.get("/getBooks", getAllBooks);
router.get("/getMostFeaturedAuthor", getMostFeaturedAuthor);

// router.get("/admin/getBooks",verifyToken,isAdmin, getAllBooksForAdmin);
router.post("/admin/addBook", verifyToken, isAdmin, addNewBook);
router.get("/bookCount", verifyToken, getTotalBooks);
router.get("/latestBooks", getLatestFourBooks );
router.get("/bookById/:id", verifyToken, getBookByID);
router.delete("/admin/removeBook/:id", verifyToken, isAdmin, deleteBook);
router.put("/admin/updateBook/:id", verifyToken, isAdmin, updateBookDetails);

export const bookRouter = router;
