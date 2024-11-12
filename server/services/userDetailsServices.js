import {
  addUserProfileDetailsById,
  getUserDetailsById,
  updateProfileImageById,
} from "../repository/userDetailsRepository.js";
import { updateUserProfileById } from "../repository/userDetailsRepository.js";
import fs from "fs";
export const getUserDetailsByUserId = async (userId) => {
  const result = await getUserDetailsById(userId);
  if (result !== null) {
    return {
      sucess: true,
      status: 200,
      message: "Data fetched Successfully",
      details: result,
    };
  }
  return {
    success: false,
    status: 404,
    message: "User data not found",
  };
};

export const updateUserProfile = async (userId, userData) => {
  const result = await updateUserProfileById(userId, userData);
  if (result === true) {
    return {
      success: true,
      status: 200,
      message: " User Data updated successfully",
    };
  }
  return {
    success: false,
    status: 400,
    message: "Unable to update your data",
  };
};

export const addUSerProfileDetails = async (id, userData) => {
  const result = await addUserProfileDetailsById(id, userData);
  if (result === true) {
    return {
      success: true,
      status: 200,
      message: " User Data updated successfully",
    };
  }
  return {
    success: false,
    status: 400,
    message: "Unable to update your data",
  };
};

export const updateUserProfileImage = async (userId, userImage) => {
  const userDetails = await getUserDetailsById(userId);
  if (!userDetails) {
    return { success: false, status: 404, message: "user not found" };
  }
  let oldUserImage = null;

  if (userDetails) {
    oldUserImage = userDetails.userImage.replace(/\\/g, "/");
  }
  const result = await updateProfileImageById(userId, userImage);
  if (result === true) {
    if (userDetails) {
      if (oldUserImage) {
        fs.unlink(oldUserImage, (err) => {
          if (err) {
            console.error("Error deleting old image:", err);
          } else {
            console.log("Old image deleted successfully:", oldUserImage);
          }
        });
      }
    }
    return {
      success: true,
      status: 200,
      message: " User Profile Image updated successfully",
    };
  }
  return {
    success: false,
    status: 400,
    message: "Unable to update profile Image",
  };
};
