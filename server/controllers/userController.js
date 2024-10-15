import { set500Err } from "./controllerHelpers/controllerHelper.js";
import {
  getUserByUserId,
  getAllUserDetails,
  getlatestRegisteredUser,
  updateUserDetails,
  deleteUser,
  checkUserEmailDuplicate,
  getTotalCountUsers,
} from "../repository/userRepository.js";

const getTotalUsers = async (req, res) => {
  try {
    const count = await getTotalCountUsers();

    return res
      .status(200)
      .json({ message: "Data fetched Sucessfully", userCount: count });
  } catch (err) {
    set500Err(err, req, res);
  }
};

const getLatestUser = async (req, res) => {
  try {
    const user = await getlatestRegisteredUser();

    if (user.length > 0) {
      return res.status(200).json({
        userDetails: user,
      });
    }

    res.status(404).json({
      status: "404",
      message: "User not found",
    });
  } catch (err) {
    set500Err(err, req, res);
  }
};

const updateUserEmail = async (req, res) => {
  const userId = parseInt(req.params.id);
  const { email } = req.body;
  try {
    const user = await getUserByUserId(userId);
    console.log(user);
    const emailExists = await checkUserEmailDuplicate(email);
    console.log(emailExists);
    if (user && !emailExists) {
      const result = await updateUserDetails(email.toLowerCase(), userId);
      return res.status(200).json({
        message: "User updated successfully",
      });
    }

    res.status(409).json({
      message: "User already exists",
    });
  } catch (err) {
    set500Err(err, req, res);
  }
};

const getUsers = async (req, res) => {
  try {
    const user = await getAllUserDetails();

    return res
      .status(200)
      .json({ message: "Data fetched Sucessfully", userDetails: user });
  } catch (err) {
    set500Err(err, req, res);
  }
};

const deleteUserFromDb = async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const user = await getUserByUserId(userId);

    if (user) {
      await deleteUser(userId);

      return res
        .status(200)
        .json({ message: "User Data Deleted Successfully" });
    }

    res.status(404).json({ message: "User Not Found" });
  } catch (err) {
    set500Err(err, req, res);
  }
};
export {
  getTotalUsers,
  getLatestUser,
  updateUserEmail,
  getUsers,
  deleteUserFromDb,
};
