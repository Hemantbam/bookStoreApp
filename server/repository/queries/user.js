const userQuery = {
  getUserByEmail: "select * from users where userEmail=?",
  createUserQuery: "INSERT INTO users (userEmail, userPassword) VALUES (?, ?)",
  getTotalNumber:"SELECT COUNT(userId) AS totalUser FROM users"

};
export default userQuery ;
