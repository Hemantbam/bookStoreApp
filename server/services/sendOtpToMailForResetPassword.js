import { set500Err } from "../controllers/controllerHelpers/controllerHelper.js";
import { sendMaill } from "./sendMail.js";
import { generateOtp } from "../controllers/controllerHelpers/generateOtp.js";
import { addOtpToresetPassword } from "../repository/passwordReset.js";
import { UpdateOtpStatus } from "../repository/passwordReset.js";
import { checkUserByEmail } from "../repository/userRepository.js";

export const sendOtpToMailForResetPassword = async (res, email) => {
  const otpStatus = "Valid";
  
  try {

    const otp = generateOtp();

    const userExist = await checkUserByEmail(email);

    if (userExist) {
      await UpdateOtpStatus(email);
      await addOtpToresetPassword(otp, otpStatus, email);

      const emailSubject = "Your OTP for Password Reset";
      const emailMessage =
        "Your OTP for password reset is valid for only 5 minutes";
      await sendMaill(email, emailSubject, emailMessage, otp);

      return res.status(200).json({ message: "OTP sent successfully." });
    }
    res.status(404).json({ message: "User not found" });
  } catch (err) {
    console.error(err);
    set500Err(res, "Failed to send OTP.");
  }
};
