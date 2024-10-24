import { set500Err } from "../controllers/controllerHelpers/controllerHelper.js";
import { sendMaill } from "./sendMail.js";
import { generateOtp } from "../controllers/controllerHelpers/generateOtp.js";
import { addOtpToresetPassword } from "../repository/passwordReset.js";
import { UpdateOtpStatus } from "../repository/passwordReset.js";
import { checkUserByEmail } from "../repository/userRepository.js";

export const sendOtpToMailForResetPassword = async (email) => {
  const otpStatus = "Valid";
  
  try {
    const otp = generateOtp();
    const userExist = await checkUserByEmail(email);

    if (userExist) {
      await UpdateOtpStatus(email);
      await addOtpToresetPassword(otp, otpStatus, email);

      const emailSubject = "Your OTP for Password Reset";
      const emailMessage = "Your OTP for password reset is valid for only 5 minutes";
      sendMaill(email, emailSubject, emailMessage, otp);

      return { success: true, status: 200, message: "OTP sent successfully." };
    }
    
    return { success: false, status: 404, message: "User not found" };
    
  } catch (err) {
    console.error(err);
    return { success: false, status: 500, message: "Internal server error" };
  }
};
