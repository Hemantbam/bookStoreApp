import { addSubscriber, subscribersList } from "../services/subscriber.js";

export const addUserEmailToSubscribers = async (req, res) => {
  const { userEmail } = req.body;
  const result = await addSubscriber(userEmail);
  return res.status(result.status).json({ message: result.message });
};

export const getSubscribersList = async (req, res) => {
  const result = await subscribersList();
  if (result.success) {
    return res
      .status(result.status)
      .json({ message: result.message, list: result.details });
  }
  return res.status(result.status).json({ message: result.message });
};
