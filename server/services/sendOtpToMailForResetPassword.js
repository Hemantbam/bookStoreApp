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
      const emailMessage = `
<div style="font-family: Arial, sans-serif; line-height: 1.6;">
  <h1 style="color: black;">BookMandu</h1>

  <h3 style="color: black;">One Time Password (OTP)</h3>
  <p style="color: red;">Do not share the OTP with anyone.</p>
  <hr style="border: 1px solid #ccc;">
  <p style="font-size: 1.2rem; color: black;">Your OTP for user registration is valid for only 5 minutes.</p>
  <p style="font-weight: 800; font-size: 1.1rem;">Your OTP: <span style="color: #6a994e;">${otp}</span></p>
</div>
`;

      sendMaill(email, emailSubject, emailMessage);

      return { success: true, status: 200, message: "OTP sent successfully." };
    }

    return { success: false, status: 404, message: "User not found" };
  } catch (err) {
    console.error(err);
    return { success: false, status: 500, message: "Internal server error" };
  }
};
