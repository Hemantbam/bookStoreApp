import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { getUserDetails, createUserQuery } from '../repository/authRepository.js';

import { emailPasswordValidation } from '../validation/EmailPasswordValidation.js';

import { UpdateOtpStatus } from '../repository/passwordReset.js';
import { verifyValidOtp } from './verifyOtp.js';

const secretKey = "keySecretForbookStoreAuthentication9898#@";


export const userRegistration = async (res, email, password, otp) => {
  try {
    if (!emailPasswordValidation(email, password)) {
      return res.status(400).json({
        message: "Invalid input: Please provide a valid email and password.",
      });
    }

    const userEmail = email.toLowerCase();

    const existingUser = await getUserDetails(userEmail);
    console.log(existingUser);
    if (existingUser.length > 0) {
      return res
        .status(409)
        .json({ message: "Conflict: User already exists." });
    }

    const otpVerified = await  verifyValidOtp(userEmail, otp);
    if (!otpVerified) {
      return res
        .status(400)
        .json({ message: "Invalid OTP: Please check the OTP you received." });
    }

    const encodedPassword = await bcrypt.hash(password, 10);
    await createUserQuery(userEmail, encodedPassword);
    await UpdateOtpStatus(userEmail);

    return res
      .status(201)
      .json({ message: "Success: User created successfully." });
  } catch (err) {
    console.error("Registration error:", err);
    return res
      .status(500)
      .json({ message: "Internal server error: Please try again later." });
  }
};

export const userLogin = async (res, email, password) => {
  try {
    if (!emailPasswordValidation(email, password)) {
      return res.status(400).json({ message: "Inavlid Input" });
    }
    const userEmail = email.toLowerCase();
    const userDetails = await getUserDetails(userEmail);
    if (userDetails) {
      const passwordMatch = await bcrypt.compare(
        password,
        userDetails[0].userPassword
      );
      if (!passwordMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
      const token = jwt.sign(
        {
          id: userDetails[0].userId,
          email: userDetails[0].userEmail,
          role: userDetails[0].role,
        },
        secretKey,
        { expiresIn: "2m" }
      );
      return res.status(200).json({ token });
    }
    return res.status(404).json({ message: "User not found" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
