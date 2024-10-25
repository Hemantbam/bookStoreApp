import { orderInputValidate } from "../validation/orderInputValidation.js";
import { addBookOrder } from "../repository/orderRepository.js";
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
  console.log(userDetails);
  const paymentStatusColor = reqBody.paymentStatus === "pending" ? "#FFA500" : "#6a994e";
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
          <span style="color: #000; font-weight:600;">Price: <strong>$${book.price.toFixed(
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
