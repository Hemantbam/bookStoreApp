import {
  getUserByUserId,
  getAllUserDetails,
  getlatestRegisteredUser,
  updateUserDetails,
  deleteUser,
  checkUserEmailDuplicate,
  getTotalCountUsers,
} from "../repository/userRepository.js";

export const countTotalUsers = async () => {
  const response = await getTotalCountUsers();
  console.log(response)
  if (response) {
    return {
      success: true,
      status: 200,
      message: "Data fetched Successfully",
      count:response
    };
  }
  return { success: false, status: 500, message: "Internal Server Error" };
};

export const getNewlyAddedUser = async () => {
  const response = await getlatestRegisteredUser();
  console.log(response)
  if (response) {
    return {
      success: true,
      status: 200,
      message: "Data fetched successfully",
      userDetails: response,
    };
  }
  return { success: false, status: 500, message: "Internal server error" };
};

export const updateUserEmailById = async (userId, email) => {
  const user = await getUserByUserId(userId);
  const emailExists = await checkUserEmailDuplicate(email);

  if (user && !emailExists) {
    await updateUserDetails(email.toLowerCase(), userId);
    return { success: true, status: 200, message: "User updated successfully" };
  }
  return { success: false, status: 409, message: "Email already exists" };
};


export const getAllUser = async () => {
  const response = await getAllUserDetails();
  if (response) {
    return {
      success: true,
      status: 200,
      message: "Data fetched Successfully",
      userDetails: response,
    };
  }
  return { success: false, status: 500, message: "Internal Server Error" };
};


export const deleteUserById = async (userId) => {
  const user = await getUserByUserId(userId);
  if (user) {
    await deleteUser(userId);
    return {success:true, status:200, message:"User deleted successfullly"};
  }
  return { success: false, status: 404, message: "User not found" };
};
