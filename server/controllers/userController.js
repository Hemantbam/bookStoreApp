import {
  countTotalUsers,
  deleteUserById,
  getAllUser,
  getNewlyAddedUser,
  updateUserEmailById,
} from "../services/userServices.js";

const getTotalUsers = async (req, res) => {
  const result = await countTotalUsers();
  return res
    .status(200)
    .json({ message: "Data fetched Successfully", userCount: result });
};

const getLatestUser = async (req, res) => {
  const result = await getNewlyAddedUser();
  if (result) {
    return res.status(200).json({ userDetails: result });
  }
  return res.status(404).json({ message: "User Not Found" });
};

const updateUserEmail = async (req, res) => {
  const userId = parseInt(req.params.id);
  const { email } = req.body;

  const result = await updateUserEmailById(userId, email);

  if (result.success) {
    return res.status(result.status).json({ message: result.message });
  }
  return res.status(result.status).json({ message: result.message });
};

const getUsers = async (req, res) => {
  const result = await getAllUser();
  if (result.success)
    return res
      .status(result.status)
      .json({ message: result.message, userDetails: result });
};

const deleteUserFromDb = async (req, res) => {
  const userId = parseInt(req.params.id);

  const result = await deleteUserById(userId);
  if (result.success) {
    return res.status(result.status).json({ message: result.message });
  }
  return res.status(result.status).json({ message: result.message });
};

export {
  getTotalUsers,
  getLatestUser,
  updateUserEmail,
  getUsers,
  deleteUserFromDb,
};
