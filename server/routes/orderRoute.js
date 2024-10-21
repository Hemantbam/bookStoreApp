import express from "express";
import { addNewBookOrder } from "../controllers/orderController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/addOrder", verifyToken , addNewBookOrder);

export const order = router;
