import { contactUsDetails } from "../services/contactUs.js";
import { addSubscriber } from "../services/contactUs.js";


export const addContactUsDetails = async (req, res) => {
  const { userName, userEmail, message } = req.body;
  const result = await contactUsDetails(userName, userEmail, message);
  return res.status(result.status).json({ message: result.message });
};

export const addUserEmailToSubscribers = async (req, res) => {
  const { userEmail } = req.body;
  const result = await addSubscriber(userEmail);
  return res.status(result.status).json({ message: result.message });
};
