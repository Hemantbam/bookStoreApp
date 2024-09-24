export const serverError = (req, res) => {
  return res.status(500).json({ message: "Internal server error" });
};
