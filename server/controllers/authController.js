import bcrypt from "bcrypt";
import {
  getUserDetails,
  createUserQuery,
} from "../repository/authRepository.js";
import db from "../config/dbConn.js";
import jwt from "jsonwebtoken";
import { emailPasswordValidation } from "../validation/EmailPasswordValidation.js";
const secretKey = "keySecretForbookStoreAuthentication9898#@";

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!emailPasswordValidation(email, password)) {
      return res.status(400).json({ message: "Invalid Input" });
    }
    const userEmail = email.toLowerCase();
    const userDetails = await getUserDetails(userEmail);
    if (userDetails.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    } else {
      const encodedPassword = await bcrypt.hash(password, 10);
      await createUserQuery(userEmail, encodedPassword);
      return res.status(201).json({ message: "User created successfully" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
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
        { expiresIn: "1h" }
      );
      return res.status(200).json({ token });
    }
    return res.status(404).json({ message: "User not found" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { register, login };
