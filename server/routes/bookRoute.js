import express from "express";
import {
  addNewBook,
  getAllBooks,
  getBookByID,
  getTotalBooks,
  updateBookDetails,
  deleteBook,
  getLatestFourBooks,
  getMostFeaturedAuthor,
   getBookBywords,
   updateBookImage,
} from "../controllers/bookController.js";
import { verifyToken, isAdmin} from "../middleware/authMiddleware.js";
import { errorHandlerWrapper } from "../middleware/errorHandellerWrapper.js";
import { uploadBookImage } from "../multer/multerConfig.js";
const router = express.Router();


router.get("/getBooks", errorHandlerWrapper(getAllBooks));
router.get("/getMostFeaturedAuthor", errorHandlerWrapper(getMostFeaturedAuthor));

router.post("/admin/addBook", verifyToken, isAdmin, uploadBookImage.single('bookImage'), errorHandlerWrapper(addNewBook));
router.post("/admin/updateBook/:id", verifyToken, isAdmin, errorHandlerWrapper(updateBookDetails));

// router.post("/admin/updateBook/:id", verifyToken, isAdmin, uploadBookImage.single('updateImage'), errorHandlerWrapper(updateBookDetails));
router.post("/admin/updateBookImage/:id", verifyToken, isAdmin, uploadBookImage.single('updateImage'), errorHandlerWrapper(updateBookImage));

router.get("/bookCount", verifyToken, errorHandlerWrapper(getTotalBooks));
router.get("/searchBook", errorHandlerWrapper(getBookBywords));
router.get("/latestBooks", errorHandlerWrapper(getLatestFourBooks) );
router.get("/bookById/:id", errorHandlerWrapper(getBookByID));
router.delete("/admin/removeBook/:id", verifyToken, isAdmin, errorHandlerWrapper(deleteBook));

export const bookRouter = router;
