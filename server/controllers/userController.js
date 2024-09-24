import dbConn from "../config/dbConn.js";
import userQuery from "../repository/queries/user.js";
const db=dbConn

const getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await db.query(userQuery.getTotalNumber);
    return res
      .status(200)
      .json({ message: "Data fetched Sucessfully", count: totalUsers[0] });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Internal server error"});
    return 0
  }
};
export  {getTotalUsers};