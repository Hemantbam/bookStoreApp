import express from "express";
import {
sendOtpforPasswordReset,
  resetUserPassword,
} from "../controllers/passwordResetController.js";
import { errorHandlerWrapper } from "../middleware/errorHandellerWrapper.js";

const router = express.Router();

router.post("/resetPassword", errorHandlerWrapper(sendOtpforPasswordReset));
router.put("/verifyOtp", errorHandlerWrapper(resetUserPassword));


export const otpAndMail = router;
