import express from "express";
import {
  addNewBookOrder,
  pendingOrderCount,
  completedOrderCount,
  pendingOrderInformation,
  completedOrderInformation,
  editOrderStatus,
  cancelOrder,
  deliveredOrderCountByuserId,
  pendingOrderCountByuserId,
  cancelledOrderCountByuserId,
  getUserOrderDetailsById,
  cancelledOrderInformation,
} from "../controllers/orderController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";
import { errorHandlerWrapper } from "../middleware/errorHandellerWrapper.js";

const router = express.Router();

router.post("/addOrder", verifyToken, errorHandlerWrapper(addNewBookOrder));

router.get(
  "/admin/getPendingOrders",
  verifyToken,
  errorHandlerWrapper(pendingOrderCount)
);

router.get(
  "/admin/getCompletedOrders",
  verifyToken,
  errorHandlerWrapper(completedOrderCount)
);

router.get(
  "/admin/pendingOrderInformation",
  verifyToken,
  errorHandlerWrapper(pendingOrderInformation)
);

router.get(
  "/admin/completedOrderInformation",
  verifyToken,
  errorHandlerWrapper(completedOrderInformation)
);

router.put(
  "/admin/updateOrderStatus/:id",
  verifyToken,
  isAdmin,
  errorHandlerWrapper(editOrderStatus)
);

router.put(
  "/admin/cancelOrder/:id",
  verifyToken,
  errorHandlerWrapper(cancelOrder)
);

router.get(
  "/admin/userDeliveredOrderCount/:id",
  verifyToken,
  errorHandlerWrapper(deliveredOrderCountByuserId)
);

router.get(
  "/admin/userPendingOrderCount/:id",
  verifyToken,
  errorHandlerWrapper(pendingOrderCountByuserId)
);

router.get(
  "/admin/userCancelledOrderCount/:id",
  verifyToken,
  errorHandlerWrapper(cancelledOrderCountByuserId)
);

router.get(
  "/admin/userOrderDetails/:id",
  verifyToken,
  errorHandlerWrapper(getUserOrderDetailsById)
);

// router.get(
//   "/admin/allOrderDetails",
//   verifyToken,
//   isAdmin,
//   errorHandlerWrapper(allOrderInformation)
// );

router.get(
  "/admin/cancelledOrderDetails",
  verifyToken,
  isAdmin,
  errorHandlerWrapper(cancelledOrderInformation)
);

export const order = router;
