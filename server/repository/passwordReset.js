import { query } from "express";
import dbConn from "../config/dbConn.js";

export const addOtpToresetPassword = async (otp, status, email) => {
  const query =
    "INSERT INTO resetPassword ( userEmail, otp ,createdTime, status) VALUES (?, ?, NOW(), ?)";
  const result = await dbConn.query(query, [email, otp, status]);
  if (result[0].affectedRows === 1) {
    return true;
  } else {
    return false;
  }
};

export const UpdateOtpStatus = async (email) => {
  const query =
    " UPDATE resetPassword SET status = 'invalid' WHERE userEmail = ?";
  await dbConn.query(query, [email]);
};

export const resetUserPasswordInDB = async (email, password) => {
  const query = "Update users set userPassword=? where userEmail=?";
  await dbConn.query(query, [password, email]);
};

export const getUserValidOtp = async (email) => {
  const query =
    "SELECT * FROM resetPassword WHERE userEmail =? AND status = 'valid'";
  try {
    const result = await dbConn.query(query, [email]);
    console.log(result.length);
    return result;
  } catch (err) {
    console.log(err);
  }
};
