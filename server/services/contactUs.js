import {
  addDetailsToContactUS,
  addEmailTOSubscribers,
  checkDuplicateSubscriber,
} from "../repository/contactUs.js";

export const contactUsDetails = async (userName, userEmail, message) => {
  if (
    userName.trim() === "" &&
    userEmail.trim() === "" &&
    message.trim() === ""
  ) {
    return {
      success: false,
      status: 400,
      message: "Invalid Input please fill out form correctly",
    };
  }
  const result = await addDetailsToContactUS(userName, userEmail, message);
  if (result) {
    return {
      success: true,
      status: 200,
      message: "Details submitted Successfully",
    };
  }else{
    return {
      success: false,
      status: 400,
      message: "Failed: Please try again with valid details",
    };
  }
  
};

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
