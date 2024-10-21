export const generateOtp = () => {
  const generatedOtp = [];
  for (let i = 0; i < 6; i++) {
    const num = Math.floor(Math.random() * 10);
    generatedOtp.push(num);
  }
  const otp = generatedOtp.join("");
  console.log(otp);
  return otp;
};
