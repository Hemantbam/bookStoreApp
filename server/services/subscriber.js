import {
  addEmailTOSubscribers,
  checkDuplicateSubscriber,
  getSubscriberList,
} from "../repository/subscriber.js";

export const addSubscriber = async (userEmail) => {
  if (!userEmail || userEmail.trim() === "") {
    return {
      success: false,
      status: 400,
      message: "Please enter the email",
    };
  }
  const checkSubscriber = await checkDuplicateSubscriber(userEmail);
  if (checkSubscriber) {
    return {
      success: false,
      status: 409,
      message: "You have already subscribed",
    };
  }
  const result = await addEmailTOSubscribers(userEmail);
  if (result) {
    return {
      success: true,
      status: 200,
      message: "Subscribed successfully",
    };
  } else {
    return {
      success: false,
      status: 400,
      message: "Invalid data",
    };
  }
};

export const subscribersList = async () => {
  const result = await getSubscriberList();
  if (!result) {
    return {
      success: false,
      status: 404,
      message: "Subscribers not found",
    };
  }
  return {
    success: true,
    status: 200,
    message: "Data fetched successfully",
    details: result,
  };
};
