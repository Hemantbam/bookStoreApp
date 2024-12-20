import dbConn from "../config/dbConn.js";

export const getUserDetails = async (userEmail) => {
  const query = "SELECT * from users WHERE userEmail = ?";
  const [result] = await dbConn.query(query, [userEmail]);
  if (result.length > 0) {
    return result;
  }
  return false;
};

export const createUserQuery = async (userEmail, userPassword) => {
  const query = "INSERT INTO users (userEmail, userPassword) VALUES (?, ?)";
 await dbConn.query(query, [userEmail, userPassword]);

};

export const getUserEmailInOtpTable = async (userEmail) => {
  const query = "SELECT * from resetPassword WHERE userEmail = ?";
  const [result] = await dbConn.query(query, [userEmail]);
  if (result.length > 0) {
    return result;
  }
  return false;
};
