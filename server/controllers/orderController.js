import {
  getpendingOrderCount,
  getCompleterOrderCount,
  getpendingOrderList,
  getCompletedOrderList, updateOrderStatus,
  cancelOrderById,
  getCompletedOrderCountOfUser,
  getPendingOrderCountOfUser,
  getCancelledOrderCountOfUser,
  getUserCompletedOrderListById,
} from "../services/orderServices.js";
import { bookOrder } from "../services/orderServices.js";

export const addNewBookOrder = async (req, res) => {
  const reqBody = req.body;
  const userId = req.user.id;
  const result = await bookOrder(userId, reqBody);

  return res.status(result.status).json({ message: result.message });
};



export const pendingOrderCount = async (req, res) => {
  const result = await getpendingOrderCount();
  return res
    .status(result.status)
    .json({ message: result.message, count: result.totalCount });
};



export const completedOrderCount = async (req, res) => {
  const result = await getCompleterOrderCount();
  return res
    .status(result.status)
    .json({ message: result.message, count: result.totalCount });
};



export const pendingOrderInformation = async (req, res) => {
  const result = await getpendingOrderList();
  return res
    .status(result.status)
    .json({ message: result.message, details: result.pendingOrderDetails });
};



export const completedOrderInformation = async (req, res) => {
  const result = await getCompletedOrderList();
  return res
    .status(result.status)
    .json({ message: result.message, details: result.completedOrderDetails });
};

export const editOrderStatus = async (req, res) => {
    const { id } = req.params; 
    const result = await updateOrderStatus(id);
    return res
      .status(result.status)
      .json({ message: result.message});
  };


  export const cancelOrder = async (req, res) => {
    const { id } = req.params; 
    const result = await cancelOrderById(id);
    return res
      .status(result.status)
      .json({ message: result.message});
  };


  export const deliveredOrderCountByuserId = async (req, res) => {
    const { id } = req.params; 
    const result = await getCompletedOrderCountOfUser(id);
    return res
      .status(result.status)
      .json({ message: result.message, count:result.count});
  };

  export const pendingOrderCountByuserId = async (req, res) => {
    const { id } = req.params; 
    const result = await getPendingOrderCountOfUser(id);
    return res
      .status(result.status)
      .json({ message: result.message, count:result.count});
  };

  export const cancelledOrderCountByuserId = async (req, res) => {
    const { id } = req.params; 
    const result = await getCancelledOrderCountOfUser(id);
    return res
      .status(result.status)
      .json({ message: result.message, count:result.count});
  };


  export const getUserOrderDetailsById = async (req, res) => {
    const { id } = req.params; 
    const result = await getUserCompletedOrderListById(id);
    return res
      .status(result.status)
      .json({ message: result.message, details: result.orderDetails });
  };


