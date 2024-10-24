import { userLogin, userRegistration } from "../services/authServices.js";
import { sendOtpForUserRegistration } from "../services/sendOtpForUserRegistration.js";
import { set500Err } from "./controllerHelpers/controllerHelper.js";

const register = async (req, res) => {
  const { email, password, otp } = req.body;
  try {
    const result = await userRegistration(email, password, otp);
    return res.status(result.status).json({ message: result.message });
  } catch (err) {
    set500Err(err, req, res);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await userLogin(email, password);
    console.log("this is result",result)
    if (result.success) {
      const token=result.token
      return res.status(result.status).json({ token });
    }
    return res.status(result.status).json({ messaage: result.message });
  } catch (err) {
    set500Err(err, req, res);
  }
};

const sendOtpForRegistration = async (req, res) => {
  const { email } = req.body;
  await sendOtpForUserRegistration(res, email);
};

export { register, login, sendOtpForRegistration };
