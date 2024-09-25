import dbConn from "../config/dbConn.js";
import serverError from "./statusCode/serverError.js";

const getLatestRegisteredUser = async (req, res) => {
  try {
    const [dbGetUserDetails] = await dbConn.query(
      "SELECT userId,userEmail,role FROM users ORDER BY userId DESC LIMIT 1"
    );
    if (dbGetUserDetails.length > 0) {
      return res.status(200).json({
        userDetails: dbGetUserDetails,
      });
    }
    res.status(404).json({
      status: "404",
      message: "Book not found",
    });
  } catch (err) {
    console.log(err);
    serverError(req, res);
  }
};

const updateUserDetails = async (req, res) => {
  const { id } = req.params;
  const { userEmail } = req.body;
  console.log(id, userEmail);
  try {
    const [result] = await dbConn.query(
      "UPDATE users SET userEmail = ? WHERE userId = ?",
      [userEmail, id]
    );
    console.log(result.affectedRows);

    if (result.affectedRows > 0) {
      return res.status(200).json({
        message: "User updated successfully",
      });
    }
    res.status(404).json({
      message: "No user found to update",
    });
  } catch (err) {
    console.error(err);
    serverError(req, res);
  }
};

const getAllUserDetails = async (req, res) => {
  try {
    const [users] = await dbConn.query(
      "SELECT userId, userEmail, role FROM users"
    );
    if (users.length > 0) {
      return res.status(200).json({ userDetails: users });
    }

    res.status(404).json({
      message: "No user found",
    });
  } catch (err) {
    console.error(err);
    serverError(req, res);
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const [result] = await dbConn.query("DELETE FROM users WHERE userId = ?", [
      userId,
    ]);

    if (result.affectedRows > 0) {
      return res.status(200).json({
        message: "User deleted successfully",
      });
    }

    return res.status(404).json({
      message: "No user found with the given ID",
    });
  } catch (err) {
    console.error(err);
    serverError(req, res);
  }
};

export {
  getLatestRegisteredUser,
  updateUserDetails,
  getAllUserDetails,
  deleteUser,
};
