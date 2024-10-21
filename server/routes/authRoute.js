import express from "express";
import {login, register} from '../controllers/authController.js'
import { sendOtpForRegistration } from "../controllers/authController.js";
const router = express.Router();

router.post("/register", register);
router.post("/login",login)
router.post("/generateOtpForRegistration", sendOtpForRegistration);

export default router
