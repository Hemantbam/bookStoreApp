import axios from "axios";
const API_URL = "http://localhost:8080";

/**Api to get the total count of the users in the system */
export const getTotalUsers = async () => {
  try {
    const response = await axios(`${API_URL}/user/totalUsers`);
    const count=response.data.count[0].totalUser;
    return count
  } catch (err) {}
};

/**Api to get the total count of the books in the system */
export const getTotalBooks = async ()=>{
    try{
        const response= await axios(`${API_URL}/book/totalBooks`)
        const count=response.data.count[0].totalBooks
        return count;
    }catch(err){
        return 0
    }
   }
