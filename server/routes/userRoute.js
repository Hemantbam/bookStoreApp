import express from "express";
import {
  getTotalUsers,
  getLatestUser,
  updateUserEmail,getUsers, deleteUserFromDb} from "../controllers/userController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/totalUsers", verifyToken, isAdmin, getTotalUsers);
router.get("/getNewUser", verifyToken, isAdmin, getLatestUser);
router.get("/getAllUsers", verifyToken, isAdmin, getUsers);
router.put("/update/:id", verifyToken, isAdmin, updateUserEmail);
router.delete("/delete/:id", verifyToken, isAdmin, deleteUserFromDb);

export const userRoute = router;
