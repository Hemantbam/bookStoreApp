import { sendOtpToMailForResetPassword } from "../services/sendOtpToMailForResetPassword.js";
import { userPasswordReset } from "../services/userPasswordReset.js";

export const sendOtpforPasswordReset = async (req, res) => {
  const { email } = req.body;
  const result = await sendOtpToMailForResetPassword(email);
  return res.status(result.status).json({ message: result.message });
};

export const resetUserPassword = async (req, res) => {
  const { email, password, otp } = req.body;
  const result = await userPasswordReset(email, password, otp);
  return res.status(result.status).json({ message: result.message });
};
