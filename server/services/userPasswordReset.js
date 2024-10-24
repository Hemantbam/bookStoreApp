import { UpdateOtpStatus } from "../repository/passwordReset.js";
import { resetUserPasswordInDB } from "../repository/passwordReset.js";
import { getUserDetails } from "../repository/authRepository.js";
import { checkUserByEmail } from "../repository/userRepository.js";
import { getUserValidOtp } from "../repository/passwordReset.js";
import bcrypt from "bcrypt";
import { verifyValidOtp } from "./verifyOtp.js";

export const userPasswordReset = async (email, password, otp) => {
  const otpNumber = parseInt(otp);
  try {
    const userExist = await checkUserByEmail(email);
    
    if (!userExist) {
      return { success: false, status: 404, message: "User not found." };
    }

    const userDetails = await getUserDetails(email);
    const [userValidOtp] = await getUserValidOtp(email);

    if (userValidOtp.length === 0) {
      return { success: false, status: 400, message: "No valid OTP found for the user." };
    }

    const otpVerification = await verifyValidOtp(email, otpNumber);
    
    if (!otpVerification) {
      return { success: false, status: 400, message: "Invalid or expired OTP." };
    }

    if (userDetails) {
      const passwordMatch = await bcrypt.compare(password, userDetails[0].userPassword);

      if (passwordMatch) {
        return { success: false, status: 409, message: "New password cannot be the same as the old password." };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await resetUserPasswordInDB(email, hashedPassword);
      await UpdateOtpStatus(email);

      return { success: true, status: 200, message: "Password has been reset successfully." };
    }

  } catch (err) {
    console.error(err);
    return { success: false, status: 500, message: "Internal server error." };
  }
};
