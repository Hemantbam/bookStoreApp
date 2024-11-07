import { orderInputValidate } from "../validation/orderInputValidation.js";
import {
  addBookOrder,
  getPendingOrderCountNumber,
  getCompletedOrderCountNumber,
  getPendingOrderDetails,
  getCompletedOrderDetails,
  editOrderStatus,
  cancelOrder,
  getDeliveredOrderCountByUserId,
  getPendingOrderCountByUserId,
  getCancelledOrderCountByUserId,
  getUserALLOrderDetails,
} from "../repository/orderRepository.js";
import { sendMaill } from "./sendMail.js";
import { getUserByUserId } from "../repository/userRepository.js";

export const bookOrder = async (userId, reqBody) => {
  if (!orderInputValidate(reqBody)) {
    return {
      success: false,
      status: 400,
      message: "Invalid input. Please fill all fields correctly.",
    };
  }
  const response = await addBookOrder(reqBody, userId);
  const userDetails = await getUserByUserId(userId);

  const paymentStatusColor =
    reqBody.paymentStatus === "pending" ? "#FFA500" : "#6a994e";
  const email = userDetails.userEmail;
  const subject = "An order placed from bookMandu";
  const message = `
  <div style="line-height: 1.5; color: #black; padding: 20px;">
    <h2 style="color: #386641;">Thank You for Your Order, ${
      userDetails.userEmail
    }!</h2>
    
    <h2 style="border-bottom: 2px solid #000; padding-bottom: 10px;">Your Order Details:</h2>
    
    <p><strong>Order Price:</strong> <span>Nrs${reqBody.orderPrice.toFixed(
      2
    )}</span></p>
    <p><strong>Address:</strong> <span>${reqBody.address}</span></</p>
    <p><strong>Contact Information:</strong> <span>${
      reqBody.contactNumber
    }</span></</p>
    <p><strong>Payment Mode:</strong> <span>${reqBody.paymentMode}</span></</p>
    <p><strong>Order Status:</strong> <span style="color: orange;">${
      reqBody.orderStatus
    }</span></p>
    <p><strong>Payment Status:</strong> <span style="color: ${paymentStatusColor}">${
    reqBody.paymentStatus
  }</span></p>
    
    <h3 style="color: #386641;">Purchased Books:</h3>
    <ul style="">
      ${reqBody.purchasedBooks
        .map(
          (book) => `
        <li style="margin-bottom: 15px; padding: 10px; border: 2px solid #ddd; border-radius: 5px;">
          <strong style="font-size: 1.1em;">${book.name}</strong><br>
          <span style="color: #555;">Category: ${book.category}</span><br>
          <span style="color: #000; font-weight:600;">Price: <strong>Rs ${book.price.toFixed(
            2
          )}</strong></span><br>
          <span style="color: #555;">Quantity: ${book.quantity}</span>
        </li>
      `
        )
        .join("")}
    </ul>
  </div>
`;

  const details = JSON.stringify(reqBody);
  if (response && userDetails) {
    sendMaill(email, subject, message, details);
    return {
      success: true,
      status: 201,
      message: "Book order added successfully",
    };
  }
  return {
    success: false,
    status: 400,
    message: "Failed to add book order. Please try again.",
  };
};

export const getpendingOrderCount = async () => {
  const result = await getPendingOrderCountNumber();
  if (result) {
    return {
      success: true,
      status: 200,
      message: "Data fetched successfully",
      totalCount: result,
    };
  }
  return {
    success: false,
    status: 404,
    message: "Data not found",
  };
};

export const getpendingOrderList = async () => {
  const result = await getPendingOrderDetails();
  if (result !== null) {
    return {
      success: true,
      status: 200,
      message: "Data fetched successfully",
      pendingOrderDetails: result,
    };
  }
  return {
    success: false,
    status: 404,
    message: "Data not found",
  };
};

export const getCompleterOrderCount = async (req, res) => {
  const result = await getCompletedOrderCountNumber();
  console.log(result);
  if (result !== null) {
    return {
      success: true,
      status: 200,
      message: "Data fetched successfully",
      totalCount: result,
    };
  }
  return {
    success: false,
    status: 404,
    message: "Data not found",
  };
};

export const getCompletedOrderList = async () => {
  const result = await getCompletedOrderDetails();
  if (result !== null) {
    return {
      success: true,
      status: 200,
      message: "Data fetched successfully",
      completedOrderDetails: result,
    };
  }
  return {
    success: false,
    status: 404,
    message: "Data not found",
  };
};

export const updateOrderStatus = async (orderId) => {
  const result = await editOrderStatus(orderId);
  if (result === true) {
    return {
      success: true,
      status: 200,
      message: "Data updated Successfully",
    };
  }
  return {
    success: false,
    status: 400,
    message: "Unable to update the data",
  };
};

export const cancelOrderById = async (orderId) => {
  const result = await cancelOrder(orderId);
  if (result === true) {
    return {
      success: true,
      status: 200,
      message: "Order cancelled Successfully",
    };
  }
  return {
    success: false,
    status: 400,
    message: "Unable to cancel the order",
  };
};

export const getCompletedOrderCountOfUser = async (userId) => {
  const result = await getDeliveredOrderCountByUserId(userId);
  console.log(result);
  if (result >= 0) {
    return {
      success: true,
      status: 200,
      message: "Data fetched Successfully",
      count: result,
    };
  }
  return {
    success: false,
    status: 400,
    message: "Unable to fetch data",
  };
};

export const getPendingOrderCountOfUser = async (userId) => {
  const result = await getPendingOrderCountByUserId(userId);
  console.log(result);
  if (result >= 0) {
    return {
      success: true,
      status: 200,
      message: "Data fetched Successfully",
      count: result,
    };
  }
  return {
    success: false,
    status: 400,
    message: "Unable fetch data",
  };
};

export const getCancelledOrderCountOfUser = async (userId) => {
  const result = await getCancelledOrderCountByUserId(userId);
  if (result >= 0) {
    return {
      success: true,
      status: 200,
      message: "Data fetched Successfully",
      count: result,
    };
  }
  return {
    success: false,
    status: 400,
    message: "Unable fetch data",
  };
};

export const getUserCompletedOrderListById = async (userId) => {
  const result = await getUserALLOrderDetails(userId);
  if (result !== null) {
    return {
      success: true,
      status: 200,
      message: "Data fetched successfully",
      orderDetails: result,
    };
  }
  return {
    success: false,
    status: 404,
    message: "Data not found",
  };
};

