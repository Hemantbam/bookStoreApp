import { getUserValidOtp } from "../repository/passwordReset.js";

export const verifyValidOtp = async (email, otp) => {
  const otpNumber = parseInt(otp);

  const [userValidOtp] = await getUserValidOtp(email);
  if (userValidOtp.length > 0) {
    const dateAndTime = userValidOtp[0].createdTime;
    const otpCreatedTime = new Date(dateAndTime);
    const fiveMinuteLaterTime = otpCreatedTime.getTime() + 5 * 60 * 1000;
    const currentTime = new Date().getTime();
    if (
      userValidOtp[0].otp === otpNumber &&
      currentTime <= fiveMinuteLaterTime
    ) {
      return true;
    }
  }

  return false;
};
