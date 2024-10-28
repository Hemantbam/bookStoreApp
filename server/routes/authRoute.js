import express from "express";
import {login, register, registerUserByAdmin} from '../controllers/authController.js'
import { sendOtpForRegistration } from "../controllers/authController.js";
import { errorHandlerWrapper } from "../middleware/errorHandellerWrapper.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register",errorHandlerWrapper(register));
router.post("/registerUserByAdmin",verifyToken, isAdmin, errorHandlerWrapper(registerUserByAdmin));
router.post("/login",login)
router.post("/generateOtpForRegistration", errorHandlerWrapper(sendOtpForRegistration));

export default router
