import dbConn from "../config/dbConn.js";
import userQuery from "../repository/queries/user.js";
const db = dbConn;
import {
  getLatestRegisteredUser,
  updateUserDetails,
  getAllUserDetails,
  deleteUser,
} from "../repository/handelUserQueries.js";

const getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await db.query(userQuery.getTotalNumber);
    return res
      .status(200)
      .json({ message: "Data fetched Sucessfully", count: totalUsers[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
    return 0;
  }
};

const getLatestUser = (req, res) => {
  getLatestRegisteredUser(req, res);
};

const updateUserEmail = (req, res) => {
  updateUserDetails(req, res);
};

const getUsers = (req, res) => {
  getAllUserDetails(req, res);
};

const deleteUserFromDb = (req, res) => {
  deleteUser(req, res);
};
export { getTotalUsers, getLatestUser, updateUserEmail, getUsers, deleteUserFromDb };
