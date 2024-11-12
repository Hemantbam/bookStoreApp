import dbConn from "../config/dbConn.js";

export const getUserDetailsById = async (userId) => {
  const query = "select * from userDetails where userId=?";
  const [result] = await dbConn.query(query, [userId]);
  if (result.length > 0) {
    return result[0];
  }
  return null;
};

export const updateUserProfileById = async (userId, userData) => {
  console.log("userData", userData);
  const query =
    "UPDATE userDetails SET firstName=?, lastName=?, address=?, contactNumber=?, city=?, about=? WHERE userId =?";
  const result = await dbConn.query(query, [
    userData.firstName,
    userData.lastName,
    userData.address,
    userData.contactNumber,
    userData.city,
    userData.about,
    userId,
  ]);
  if (result[0].affectedRows > 0) {
    return true;
  }
  return false;
};

export const addUserProfileDetailsById = async (id) => {

  const query =
    "INSERT INTO userDetails (userId, firstName, lastName, address, contactNumber, city, about,userImage) VALUES (?, ?, ?, ?, ?, ?, ?,?)";

  try {
    const [result] = await dbConn.query(query, [
      id,
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ]);

    if (result.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error inserting user profile details", error);
    return false;
  }
};

export const updateProfileImageById = async (userId, userImage) => {
  const query = "UPDATE userDetails SET userImage = ? WHERE userId = ?";
  const result = await dbConn.query(query, [userImage, userId]);
  if (result[0].affectedRows > 0) {
    return true;
  }
  return false;
};

export const deleteUserFromUserDetails = async (userId) => {
  const query = "DELETE FROM userDetails WHERE userId = ?";
  const result = await dbConn.query(query, [userId]);
  if (result[0].affectedRows > 0) {
    return true;
  }
  return false;
};
