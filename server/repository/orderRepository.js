import dbConn from "../config/dbConn.js";

export const addBookOrder = async (reqBody, userId) => {
  const connection = await dbConn.getConnection();
  try {

    await connection.beginTransaction();


    const query = `
      INSERT INTO bookOrder (userId, orderPrice, address, paymentMode, orderStatus, paymentStatus) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const result = await connection.query(query, [
      userId,
      reqBody.orderPrice,
      reqBody.address,
      reqBody.paymentMode,
      reqBody.orderStatus || "pending",
      reqBody.paymentStatus || "pending",
    ]);

    const orderId = result[0].insertId;


    await addOrderItems(connection, orderId, reqBody.purchasedBooks);
    throw Error("test")

    await connection.commit();
    return orderId;

  } catch (err) {

    await connection.rollback();
    throw err;

  } finally {

    connection.release();
  }
};

const addOrderItems = async (connection, bookOrderId, purchasedBooks) => {
  const query = `
    INSERT INTO bookOrderDetails (bookOrderId, quantity, price, bookId) 
    VALUES (?, ?, ?, ?)
  `;

  for (const book of purchasedBooks) {
    try {

      await connection.query(query, [
        bookOrderId,
        book.quantity,
        book.price,
        book.id,
      ]);
    } catch (error) {
      console.error(`Error adding book order item: ${error.message}`);
      throw error;
    }
  }
};
