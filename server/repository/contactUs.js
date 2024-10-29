import dbConn from "../config/dbConn.js";

export const addDetailsToContactUS = async (userName, UserEmail, message) => {
  const query =
    "INSERT INTO contactUs ( userName, UserEmail ,message, created_at) VALUES (?, ?, ?, NOW())";
  const result = await dbConn.query(query, [userName, UserEmail, message]);
  if (result[0].affectedRows === 1) {
    return true;
  }
  return false;
};

export const addEmailTOSubscribers = async (userEmail) => {
  const query = "INSERT INTO subscribers ( userEmail) VALUES (?)";
  const result = await dbConn.query(query, [userEmail]);
  if (result[0].affectedRows === 1) {
    return true;
  }
  return false;
};

export const checkDuplicateSubscriber = async (userEmail) => {
  const query = "select * from subscribers where userEmail=?";
  const [result] = await dbConn.query(query, [userEmail]);
  if (result.length > 0) {
    return true;
  }
  return false;
};
