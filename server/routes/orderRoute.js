import express from "express";
import { addNewBookOrder , pendingOrders} from "../controllers/orderController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { errorHandlerWrapper } from "../middleware/errorHandellerWrapper.js";

const router = express.Router();

router.post("/addOrder", verifyToken , errorHandlerWrapper(addNewBookOrder));
router.get("/getPendingOrders", verifyToken , errorHandlerWrapper(pendingOrders));

export const order = router; 
