import express from "express";
import {
  addNewBook,
  getBooks,
  deleteBook,
  updateBook,
  getTotalBooks,
} from "../controllers/bookController.js"; 
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";
verifyToken;
const router = express.Router();

//**Routes for books opeations */
router.post("/addBook", verifyToken, isAdmin, addNewBook);
router.get("/getBooks", verifyToken, getBooks);
router.get("/totalBooks", verifyToken, getTotalBooks);
router.delete("/removeBook/:id", verifyToken, isAdmin, deleteBook);
router.put("/updateBook/:id", verifyToken, isAdmin, updateBook);


export const bookRouter = router;
