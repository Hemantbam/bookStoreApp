import dbConn from "../config/dbConn.js";

//____________________________________________________________________________________

export const getUserByUserId = async (userId) => {
  const query = "SELECT userId,userEmail,role FROM users where userId=?";
  const [user] = await dbConn.query(query, [userId]);
  if (user.length === 0) {
    return false;
  }
  return user[0];
};

//____________________________________________________________________________________

export const getUserByUserEmail = async (email) => {
  const query = "SELECT userId FROM users where userEmail=?";
  const [user] = await dbConn.query(query, [email]);
  if (user.length === 0) {
    return false;
  }
  return user[0].userId;
};

//____________________________________________________________________________________

export const getTotalCountUsers = async () => {
  const query = "SELECT count(*) as count from users";
  const [count] = await dbConn.query(query);
  if (count.length === 0) {
    return null;
  }
  return count[0];
};

//____________________________________________________________________________________

export const getlatestRegisteredUser = async () => {
  const query =
    "SELECT userId,userEmail,role FROM users ORDER BY userId DESC LIMIT 1";
  const [user] = await dbConn.query(query);
  if (user.length === 0) {
    return null;
  }
  return user;
};

//____________________________________________________________________________________

export const updateUserDetails = async (userEmail, userId) => {
  const query = "UPDATE users SET userEmail = ? WHERE userId = ?";
  await dbConn.query(query, [userEmail, userId]);
};

//____________________________________________________________________________________

export const deleteUser = async (userId) => {
  const query = "DELETE FROM users WHERE userId = ?";
  const result = await dbConn.query(query, [userId]);
  if (result[0].affectedRows > 0) {
    return true;
  }
  return false;
};

//____________________________________________________________________________________

export const checkUserEmailDuplicate = async (userEmail) => {
  console.log(userEmail);
  const query = "SELECT count(*) as user FROM users WHERE userEmail = ?";
  const [result] = await dbConn.query(query, [userEmail]);
  console.log(result);
  if (result.user === 0) {
    return true;
  }
  return false;
};

export const getAllUserDetails = async () => {
  const query = "SELECT userId,userEmail,role FROM USERS";
  const [user] = await dbConn.query(query);
  if (user.length > 0) {
    return user;
  }
  return false;
};

//____________________________________________________________________________________

export const checkUserByEmail = async (userEmail) => {
  console.log(userEmail);
  const query = "SELECT count(*) as user FROM users WHERE userEmail = ?";
  const [result] = await dbConn.query(query, [userEmail]);
  console.log(result);
  if (result[0].user === 1) {
    return true;
  }
  return false;
};
