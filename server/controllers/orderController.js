import { bookOrder } from "../services/orderServices.js";

export const addNewBookOrder = async (req, res) => {
  const reqBody = req.body;
  const userId = req.user.id;
    const result = await bookOrder(userId, reqBody);
    if (result.success) {
      res.status(result.status).json({ message: result.message });
    }
    res.status(result.status).json({ message: result.message });
};
