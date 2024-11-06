import express from "express";
import {
  addUserEmailToSubscribers,
  getSubscribersList,
} from "../controllers/subscriberController.js";

const router = express.Router();

import { errorHandlerWrapper } from "../middleware/errorHandellerWrapper.js";

router.post("/subscribeEmail", errorHandlerWrapper(addUserEmailToSubscribers));
router.get("/admin/subscriberList", errorHandlerWrapper(getSubscribersList));

export const subscribe = router;
