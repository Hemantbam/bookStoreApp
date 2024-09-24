import express from "express";
import { getTotalUsers } from "../controllers/userController.js";

const router = express.Router();

// Define the route for adding a new book

router.get("/totalUsers", getTotalUsers);




// Named export
export const userRoute = router;
