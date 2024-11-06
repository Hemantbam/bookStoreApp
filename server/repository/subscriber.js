import dbConn from "../config/dbConn.js";

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
  
  export const getSubscriberList = async () => {
    const query = "SELECT * FROM subscribers"
    const result = await dbConn.query(query);
    if (result) {
      return result[0];
    }
    return false;
  };