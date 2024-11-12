import express from "express";
import { getUserDetails, updateUserprofileByUserId, addUserDetails, updateUserProfileImageById } from "../controllers/userDetailsController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { errorHandlerWrapper } from "../middleware/errorHandellerWrapper.js";
import { uploadUserProfileImage } from "../multer/multerConfig.js";
const router = express.Router();

router.get(
  "/getDetails/:id",
  verifyToken,
  errorHandlerWrapper(getUserDetails)
);

router.post(
  "/addUserDetails/:id",
  verifyToken,
  errorHandlerWrapper(addUserDetails)
);

router.put(
  "/updateProfile/:id",
  verifyToken,
  errorHandlerWrapper(updateUserprofileByUserId)
);


router.put(
  "/userImageUpdate/:id",
  verifyToken, uploadUserProfileImage.single('userImage'),
  errorHandlerWrapper(updateUserProfileImageById)
);

export const userDetails = router;

