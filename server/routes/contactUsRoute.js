import express from "express";
import { addContactUsDetails } from "../controllers/contactUsController.js";
import { addUserEmailToSubscribers } from "../controllers/contactUsController.js";
const router = express.Router();
import { errorHandlerWrapper } from "../middleware/errorHandellerWrapper.js";

router.post("/addDetailToContactUs", errorHandlerWrapper(addContactUsDetails));

router.post("/subscribe", errorHandlerWrapper(addUserEmailToSubscribers));

export const contactUs = router;
