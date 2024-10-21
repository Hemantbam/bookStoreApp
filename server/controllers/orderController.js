import { addBookOrder } from "../repository/orderRepository.js";
import { set500Err } from "./controllerHelpers/controllerHelper.js";
import { orderInputValidate } from "../validation/orderInputValidation.js";

export const addNewBookOrder = async (req, res) => {
  const reqBody = req.body;

  try {
    if (!orderInputValidate(reqBody)) {
      return res
        .status(400)
        .json({ message: "Invalid input. Please fill all fields correctly." });
    }

    const userId = req.user.id;
    console.log(reqBody);

    await addBookOrder(reqBody, userId);
    
    return res.status(201).json({ message: "Book order added successfully" });
  } catch (err) {
    console.error("Error adding book order:", err);
    set500Err(err, req, res);
  }
};
