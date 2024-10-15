import express from "express";
import {
  getTotalUsers,
  getLatestUser,
  updateUserEmail,getUsers, deleteUserFromDb} from "../controllers/userController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/admin/totalUsers", verifyToken, isAdmin, getTotalUsers);
router.get("/admin/getLatestUser", verifyToken, isAdmin, getLatestUser);
router.get("/admin/getAllUsers", verifyToken, isAdmin, getUsers);
router.put("/admin/update/:id", verifyToken, isAdmin, updateUserEmail);
router.delete("/admin/delete/:id", verifyToken, isAdmin, deleteUserFromDb);

export const userRoute = router;
