import {
  contactUsDetails,
  contactUsInformation,
  deleteContactUsInformation,
} from "../services/contactUs.js";

export const addContactUsDetails = async (req, res) => {
  const { userName, userEmail, message } = req.body;
  const result = await contactUsDetails(userName, userEmail, message);
  return res.status(result.status).json({ message: result.message });
};

export const getAllContactUsInformation = async (req, res) => {
  const result = await contactUsInformation();
  return res
    .status(result.status)
    .json({ message: result.message, details: result.information });
};

export const deleteContactUsDetailsByID = async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await deleteContactUsInformation(id);
  return res.status(result.status).json({ message: result.message });
};
