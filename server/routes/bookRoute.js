import express from "express";
import { addNewBook, getBooks, deleteBook , updateBook, getTotalBooks} from "../controllers/bookController.js"; // Ensure this path is correct

const router = express.Router();

// Define the route for adding a new book
router.post("/addBook", addNewBook);
router.get("/getBooks", getBooks);
router.get("/totalBooks", getTotalBooks);
router.delete("/removeBook/:id", deleteBook);
router.put("/updateBook/:id",updateBook)



// Named export
export const bookRouter = router;
