import { orderInputValidate } from "../validation/orderInputValidation.js";
import { addBookOrder } from "../repository/orderRepository.js";

export const bookOrder = async (userId, reqBody) => {
    if (!orderInputValidate(reqBody)) {
      return {success:false, status:400, message: "Invalid input. Please fill all fields correctly." };
    }
    const response= await addBookOrder(reqBody, userId);
    if(response){
      return {success:true, status:201, message: "Book order added successfully" };

    }
    return {success:false, status:400, message: "Failed to add book order. Please try again." };


}; 
