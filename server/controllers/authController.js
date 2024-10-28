import { userLogin, userRegistration, userRegistrationByAdmin } from "../services/authServices.js";
import { sendOtpForUserRegistration } from "../services/sendOtpForUserRegistration.js";

const register = async (req, res) => {
  const { email, password, otp } = req.body;
  const result = await userRegistration(email, password, otp);
  return res.status(result.status).json({ message: result.message });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await userLogin(email, password);
  console.log("this is result", result);

  if (result.success) {
    const token = result.token;
    return res.status(result.status).json({ token });
  }
  return res.status(result.status).json({ messaage: result.message });
};

const sendOtpForRegistration = async (req, res) => {
  const { email } = req.body;
  const result = await sendOtpForUserRegistration(email);
  return res.status(result.status).json({ message: result.message });
};

const registerUserByAdmin = async (req, res) => {
  const { email, password } = req.body;
  const result = await userRegistrationByAdmin(email, password);
  return res.status(result.status).json({ message: result.message });
};
export { register, login, sendOtpForRegistration, registerUserByAdmin };
