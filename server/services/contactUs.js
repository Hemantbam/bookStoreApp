import {
  addDetailsToContactUS,
  deleteContactUsDetails,
  getContactUsInformation,
  getContactUsInformationById
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
  } else {
    return {
      success: false,
      status: 400,
      message: "Failed: Please try again with valid details",
    };
  }
};

export const contactUsInformation = async () => {
  const result = await getContactUsInformation();
  if (result) {
    return {
      success: true,
      status: 200,
      message: "Data fetched successfully",
      information: result,
    };
  }

  return {
    success: false,
    status: 404,
    message: "Data not found",
  };
};

export const deleteContactUsInformation = async (id) => {
  const checkDetails = await getContactUsInformationById(id);
  if (!checkDetails) {
    return {
      success: false,
      status: 404,
      message: "Data not found",
    };
  }

  const result = await deleteContactUsDetails(id);
  if (result) {
    return {
      success: true,
      status: 200,
      message: "Data deleted successfully",
    };
  }
};
