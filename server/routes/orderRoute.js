import express from "express";
import { addNewBookOrder , pendingOrderCount, completedOrderCount, pendingOrderInformation, completedOrderInformation,editOrderStatus, cancelOrder} from "../controllers/orderController.js";
import { verifyToken , isAdmin} from "../middleware/authMiddleware.js";
import { errorHandlerWrapper } from "../middleware/errorHandellerWrapper.js";

const router = express.Router();

router.post("/addOrder", verifyToken , errorHandlerWrapper(addNewBookOrder));
router.get("/admin/getPendingOrders", verifyToken , errorHandlerWrapper(pendingOrderCount));
router.get("/admin/getCompletedOrders", verifyToken , errorHandlerWrapper(completedOrderCount));
router.get("/admin/pendingOrderInformation", verifyToken , errorHandlerWrapper(pendingOrderInformation));
router.get("/admin/completedOrderInformation", verifyToken , errorHandlerWrapper(completedOrderInformation));
router.put("/admin/updateOrderStatus/:id", verifyToken , isAdmin, errorHandlerWrapper(editOrderStatus));
router.put("/admin/cancelOrder/:id", verifyToken, isAdmin, errorHandlerWrapper(cancelOrder));


export const order = router; 
