import express from "express";
import {
  getTotalUsers,
  getLatestUser,
  updateUserEmail,getUsers, deleteUserFromDb} from "../controllers/userController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";
import { errorHandlerWrapper } from "../middleware/errorHandellerWrapper.js";
const router = express.Router();

router.get("/admin/totalUsers", verifyToken, isAdmin, errorHandlerWrapper(getTotalUsers));
router.get("/admin/getLatestUser", verifyToken, isAdmin, errorHandlerWrapper(getLatestUser));
router.get("/admin/getAllUsers", verifyToken, isAdmin, errorHandlerWrapper(getUsers));
router.put("/admin/update/:id", verifyToken, isAdmin, errorHandlerWrapper(updateUserEmail));
router.delete("/admin/delete/:id", verifyToken, isAdmin, errorHandlerWrapper(deleteUserFromDb));

export const userRoute = router;
