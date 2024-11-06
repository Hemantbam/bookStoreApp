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

export const getContactUsInformation = async () => {
  const query = "SELECT * FROM contactUs";
  const [result] = await dbConn.query(query);
  if (result.length > 0) {
    return result;
  }
  return false;
};

export const deleteContactUsDetails = async (id) => {
  const query = "DELETE FROM contactUs WHERE id = ?";
  const result = await dbConn.query(query, [id]);
  if (result[0].affectedRows > 0) {
    return true;
  }
  return false;
};

export const getContactUsInformationById = async (id) => {
  const query = "SELECT * FROM contactUs where id=?";
  const [result] = await dbConn.query(query,[id]);
  if (result.length > 0) {
    return true;
  }
  return false;
};