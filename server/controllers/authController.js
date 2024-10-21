
import { userLogin, userRegistration } from "../services/userServices.js";
import { sendOtpForUserRegistration } from "../services/sendOtpForUserRegistration.js";

const register = async (req, res) => {
  const { email, password, otp } = req.body;
  await userRegistration(res, email, password, otp);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  await userLogin(res, email, password);
};

const sendOtpForRegistration = async (req, res) => {
  const { email } = req.body;
  await sendOtpForUserRegistration(res, email);
};

export { register, login, sendOtpForRegistration };
