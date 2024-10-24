import express from "express";
import { addNewBookOrder } from "../controllers/orderController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { errorHandlerWrapper } from "../middleware/errorHandellerWrapper.js";

const router = express.Router();

router.post("/addOrder", verifyToken , errorHandlerWrapper(addNewBookOrder));

export const order = router;
