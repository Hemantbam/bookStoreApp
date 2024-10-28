import { getPendingOrders } from "../repository/orderRepository.js";
import { bookOrder } from "../services/orderServices.js";

export const addNewBookOrder = async (req, res) => {
    const reqBody = req.body;
    const userId = req.user.id;
    const result = await bookOrder(userId, reqBody);

    return res.status(result.status).json({ message: result.message });
  
};


export const pendingOrders=async(req,res)=>{
 const result= await getPendingOrders()
 return res.status(result.status).json({ message: result.message , count:result.count});
}