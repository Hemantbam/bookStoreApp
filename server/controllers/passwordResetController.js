import { sendOtpToMailForResetPassword } from "../services/sendOtpToMailForResetPassword.js";
import { userPasswordReset } from "../services/userPasswordReset.js";

export const sendOtpforPasswordReset = async (req, res) => {
  const { email } = req.body;
  await sendOtpToMailForResetPassword(res, email);
};

export const resetUserPassword = async (req, res) => {
  const { email, password, otp } = req.body;
  await userPasswordReset(res, email, password, otp);
};
