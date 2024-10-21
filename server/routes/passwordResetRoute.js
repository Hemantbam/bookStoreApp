import express from "express";
import {
sendOtpforPasswordReset,
  resetUserPassword,
} from "../controllers/passwordResetController.js";

const router = express.Router();

router.post("/resetPassword", sendOtpforPasswordReset);
router.put("/verifyOtp", resetUserPassword);


export const otpAndMail = router;
