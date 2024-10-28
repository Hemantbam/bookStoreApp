import { generateOtp } from "../controllers/controllerHelpers/generateOtp.js";
import {
  getUserDetails,
  getUserEmailInOtpTable,
} from "../repository/authRepository.js";
import { addOtpToresetPassword } from "../repository/passwordReset.js";
import { sendMaill } from "./sendMail.js";
import { UpdateOtpStatus } from "../repository/passwordReset.js";

export const sendOtpForUserRegistration = async (email) => {
  const userEmail = email.toLowerCase();
  const otp = generateOtp();
  const status = "valid";

  try {
    const existingUser = await getUserDetails(userEmail);

    if (existingUser) {
      return {
        success: false,
        status: 409,
        message: "Conflict: User already exists.",
      };
    }
    const checkUserInOtpTable = await getUserEmailInOtpTable(userEmail);
    if (checkUserInOtpTable) {
      await UpdateOtpStatus(userEmail);
    }
    const result = await addOtpToresetPassword(otp, status, userEmail);

    if (result === true) {
      const subject = "Otp for user registration";

      const message = `
<div style="font-family: Arial, sans-serif; line-height: 1.6;">
  <h1 style="color: black;">BookMandu</h1>

  <h3 style="color: black;">One Time Password (OTP)</h3>
  <p style="color: red;">Do not share the OTP with anyone.</p>
  <hr style="border: 1px solid #ccc;">
  <p style="font-size: 1.2rem; color: black;">Your OTP for user registration is valid for only 5 minutes.</p>
  <p style="font-weight: 800; font-size: 1.1rem;">Your OTP: <span style="color: #6a994e;">${otp}</span></p>
</div>
`;

      await sendMaill(email, subject, message, otp);

      return {
        success: true,
        status: 200,
        message: "User registration otp sent to yout email",
      };
    } else {
      return {
        success: false,
        status: 400,
        message: "Error in generating otp",
      };
    }
  } catch (err) {
    console.log(err)
  }
};
