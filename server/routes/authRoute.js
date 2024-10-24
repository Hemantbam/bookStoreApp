import express from "express";
import {login, register} from '../controllers/authController.js'
import { sendOtpForRegistration } from "../controllers/authController.js";
import { errorHandlerWrapper } from "../middleware/errorHandellerWrapper.js";
const router = express.Router();

router.post("/register",errorHandlerWrapper(register));
router.post("/login",login)
router.post("/generateOtpForRegistration", errorHandlerWrapper(sendOtpForRegistration));

export default router
