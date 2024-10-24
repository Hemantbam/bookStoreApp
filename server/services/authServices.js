import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  getUserDetails,
  createUserQuery,
} from "../repository/authRepository.js";

import { emailPasswordValidation } from "../validation/EmailPasswordValidation.js";

import { UpdateOtpStatus } from "../repository/passwordReset.js";
import { verifyValidOtp } from "./verifyOtp.js";

const secretKey = "keySecretForbookStoreAuthentication9898#@";

export const userRegistration = async (email, password, otp) => {
  if (!emailPasswordValidation(email, password)) {
    return {
      success: false,
      status: 400,
      message: "Invalid input: Please provide a valid email and password.",
    };
  }

  const userEmail = email.toLowerCase();

  const existingUser = await getUserDetails(userEmail);

  if (existingUser.length > 0) {
    return {
      success: false,
      status: 409,
      message: "Conflict: User already exists.",
    };
  }
  const otpVerified = await verifyValidOtp(userEmail, otp);
  if (!otpVerified) {
    return {
      success: false,
      status: 400,
      message: "Invalid OTP: Please check the OTP you received.",
    };
  }

  const encodedPassword = await bcrypt.hash(password, 10);
  await createUserQuery(userEmail, encodedPassword);
  await UpdateOtpStatus(userEmail);

  return {
    success: true,
    status: 201,
    message: "Success: User created successfully.",
  };
};

export const userLogin = async (email, password) => {
  if (!emailPasswordValidation(email, password)) {
    return { success: false, status: 400, message: "Inavlid Input" };
  }
  const userEmail = email.toLowerCase();
  const userDetails = await getUserDetails(userEmail);
  if (userDetails) {
    const passwordMatch = await bcrypt.compare(
      password,
      userDetails[0].userPassword
    );
    if (!passwordMatch) {
      return {
        success: false,
        status: 400,
        message: "Invalid email or password",
      };
    }
    const token = jwt.sign(
      {
        id: userDetails[0].userId,
        email: userDetails[0].userEmail,
        role: userDetails[0].role,
      },
      secretKey,
      { expiresIn: "1hr" }
    );
    return { success: true, status: 200, token };
  }
  return { success: false, status: 404, message: "User not found" };
};
