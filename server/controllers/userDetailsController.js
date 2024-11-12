import {
  addUserProfileDetails,
  getUserDetailsByUserId,
  updateUserProfileImage,
} from "../services/userDetailsServices.js";
import { updateUserProfile } from "../services/userDetailsServices.js";

export const getUserDetails = async (req, res) => {
  const userId = parseInt(req.params.id);
  const result = await getUserDetailsByUserId(userId);
  return res
    .status(result.status)
    .json({
      status: result.status,
      message: result.message,
      details: result.details,
    });
};


export const addUserDetails = async (req, res) => {
  const userId = parseInt(req.params.id);
  const { firstName, lastName, address, contactNumber, city, about } = req.body;

  const userData = {
    firstName,
    lastName,
    address,
    contactNumber,
    city,
    about,
  };
  console.log("controller", userData);
  const result = await addUserProfileDetails(userId, userData);
  return res
    .status(result.status)
    .json({ status: result.status, message: result.message });
};


export const updateUserprofileByUserId = async (req, res) => {
  const userId = parseInt(req.params.id);
  const { firstName, lastName, address, contactNumber, city, about } = req.body;

  if (isNaN(userId)) {
    return res.status(400).json({ message: "Invalid User ID." });
  }
  const userData = {
    firstName,
    lastName,
    address,
    contactNumber,
    city,
    about,
  };

  const result = await updateUserProfile(userId, userData);
  return res
    .status(result.status)
    .json({ status: result.status, message: result.message });
};


export const updateUserProfileImageById = async (req, res) => {
  const userId = parseInt(req.params.id);
  const updateImage = req.file ? req.file.path : null;

  if (isNaN(userId)) {
    return res.status(400).json({ message: "Invalid User ID." });
  }

  const result = await updateUserProfileImage(userId, updateImage);

  return res.status(result.status).json({ message: result.message });
};