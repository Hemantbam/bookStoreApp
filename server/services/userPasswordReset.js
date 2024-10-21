import { UpdateOtpStatus } from "../repository/passwordReset.js";
import { resetUserPasswordInDB } from "../repository/passwordReset.js";
import { set500Err } from "../controllers/controllerHelpers/controllerHelper.js";
import { getUserDetails } from "../repository/authRepository.js";
import { checkUserByEmail } from "../repository/userRepository.js";
import { getUserValidOtp } from "../repository/passwordReset.js";
import bcrypt from "bcrypt";
import { verifyValidOtp } from "./verifyOtp.js";

export const userPasswordReset = async (res, email, password, otp) => {
  const otpNumber = parseInt(otp);
  try {
    const userExist = await checkUserByEmail(email);
    if (userExist) {
      const userDetails = await getUserDetails(email);
      const [userValidOtp] = await getUserValidOtp(email);

      if (userValidOtp.length > 0) {
        const otpVerification = await verifyValidOtp(email, otpNumber);

        if (otpVerification === true) {
          
          if (userDetails) {
            const passwordMatch = await bcrypt.compare(
              password,
              userDetails[0].userPassword
            );

            if (passwordMatch) {
              return res.status(409).json({
                message: "New password cannot be the same as the old password.",
              });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            await resetUserPasswordInDB(email, hashedPassword);
            await UpdateOtpStatus(email);

            return res
              .status(200)
              .json({ message: "Password has been reset successfully." });
          }
        } else {
          return res.status(400).json({ message: "Invalid or expired OTP." });
        }
      } else {
        return res
          .status(400)
          .json({ message: "No valid OTP found for the user." });
      }
    } else {
      return res.status(404).json({ message: "User not found." });
    }
  } catch (err) {
    set500Err(err, req, res);
    return res.status(500).json({ message: "Internal server error." });
  }
};
