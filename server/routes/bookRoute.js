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
import { verifyToken, isAdmin} from "../middleware/authMiddleware.js";
import { errorHandlerWrapper } from "../middleware/errorHandellerWrapper.js";
const router = express.Router();

//**Routes for books opeations */
router.get("/getBooks", errorHandlerWrapper(getAllBooks));
router.get("/getMostFeaturedAuthor", errorHandlerWrapper(getMostFeaturedAuthor));

// router.get("/admin/getBooks",verifyToken,isAdmin, getAllBooksForAdmin);
router.post("/admin/addBook", verifyToken,  isAdmin, errorHandlerWrapper(addNewBook));
router.get("/bookCount", verifyToken, errorHandlerWrapper(getTotalBooks));
router.get("/latestBooks", errorHandlerWrapper(getLatestFourBooks) );
router.get("/bookById/:id", errorHandlerWrapper(getBookByID));
router.delete("/admin/removeBook/:id", verifyToken, isAdmin, errorHandlerWrapper(deleteBook));
router.put("/admin/updateBook/:id", verifyToken, isAdmin, errorHandlerWrapper(updateBookDetails));

export const bookRouter = router;
