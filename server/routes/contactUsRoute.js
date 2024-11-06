import express from "express";
import { addContactUsDetails, getAllContactUsInformation, deleteContactUsDetailsByID } from "../controllers/contactUsController.js";
const router = express.Router();
import { errorHandlerWrapper } from "../middleware/errorHandellerWrapper.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

router.post("/addDetailToContactUs", errorHandlerWrapper(addContactUsDetails));

router.get("/admin/getContactUsInformation", verifyToken, isAdmin, errorHandlerWrapper(getAllContactUsInformation))

router.delete("/admin/deleteContactUsInformation/:id", verifyToken, isAdmin,errorHandlerWrapper(deleteContactUsDetailsByID))

export const contactUs = router;
