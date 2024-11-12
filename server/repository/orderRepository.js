import dbConn from "../config/dbConn.js";

export const addBookOrder = async (reqBody, userId) => {
  const connection = await dbConn.getConnection();
  try {
    await connection.beginTransaction();

    const query = `
      INSERT INTO bookOrder (userId, orderPrice, address, paymentMode, orderStatus, paymentStatus, created_at, contactNumber) 
      VALUES (?, ?, ?, ?, ?, ?,NOW(),?)
    `;

    const result = await connection.query(query, [
      userId,
      reqBody.orderPrice,
      reqBody.address,
      reqBody.paymentMode,
      reqBody.orderStatus || "pending",
      reqBody.paymentStatus || "pending",
      reqBody.contactNumber,
    ]);

    const orderId = result[0].insertId;

    await addOrderItems(connection, orderId, reqBody.purchasedBooks);
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
        book.price * book.quantity,
        book.id,
      ]);
    } catch (error) {
      console.error(`Error adding book order item: ${error.message}`);
      throw error;
    }
  }
};

export const getPendingOrderCountNumber = async () => {
  const query =
    "SELECT COUNT(*) as count FROM bookOrder where orderStatus='pending';";
  const [response] = await dbConn.query(query);
  console.log(response);
  if (response !== null) {
    return response[0].count;
  }
  return null;
};

export const getPendingOrderDetails = async () => {
  const query = `SELECT
    bookOrder.id AS orderId,
    bookOrder.userId,
    bookOrder.orderPrice,
    bookOrder.paymentMode,
    bookOrder.contactNumber,
    bookOrder.paymentStatus,
     bookOrder.address,
    bookOrder.created_at,
    bookOrder.orderStatus,
    GROUP_CONCAT(bookdetails.bookName ORDER BY bookdetails.id ASC SEPARATOR ',') AS bookNames,
    GROUP_CONCAT(bookOrderDetails.quantity ORDER BY bookdetails.id ASC SEPARATOR ' , ') AS quantities,
    GROUP_CONCAT(bookOrderDetails.price ORDER BY bookdetails.id ASC SEPARATOR ' / ') AS prices
FROM
    bookdatabase.bookOrder
INNER JOIN
    bookdatabase.bookOrderDetails ON bookOrder.id = bookOrderDetails.bookOrderId
INNER JOIN
    bookdatabase.bookdetails ON bookOrderDetails.bookId = bookdetails.id
WHERE
   bookOrder.orderStatus = 'pending'
GROUP BY
    bookOrder.id`;

  const [response] = await dbConn.query(query);
  console.log("response", response);
  if (response.length > 0) {
    return response;
  }
  return null;
};

export const getCompletedOrderCountNumber = async () => {
  const query =
    "SELECT COUNT(*) as count FROM bookOrder where orderStatus='delivered';";
  const [response] = await dbConn.query(query);

  if (response !== null) {
    return response[0].count;
  }
  return null;
};

export const getCompletedOrderDetails = async () => {
  const query = `SELECT
    bookOrder.id AS orderId,
    bookOrder.userId,
    bookOrder.orderPrice,
    bookOrder.paymentMode,
       bookOrder.contactNumber,
    bookOrder.paymentStatus,
     bookOrder.address,
    bookOrder.created_at,
    bookOrder.orderStatus,
    GROUP_CONCAT(bookdetails.bookName ORDER BY bookdetails.id ASC SEPARATOR ',') AS bookNames,
    GROUP_CONCAT(bookOrderDetails.quantity ORDER BY bookdetails.id ASC SEPARATOR ' , ') AS quantities,
    GROUP_CONCAT(bookOrderDetails.price ORDER BY bookdetails.id ASC SEPARATOR ' / ') AS prices
FROM
    bookdatabase.bookOrder
INNER JOIN
    bookdatabase.bookOrderDetails ON bookOrder.id = bookOrderDetails.bookOrderId
INNER JOIN
    bookdatabase.bookdetails ON bookOrderDetails.bookId = bookdetails.id
WHERE
   bookOrder.orderStatus = 'delivered'
GROUP BY
    bookOrder.id
    
ORDER BY
    bookOrder.id DESC;`;

  const [response] = await dbConn.query(query);
  if (response.length > 0) {
    return response;
  }
  return null;
};

export const editOrderStatus = async (orderId) => {
  const query =
    "update bookOrder set orderStatus='delivered', paymentStatus='paid' where id=?";
  const [response] = await dbConn.query(query, [orderId]);

  if (response.affectedRows > 0) {
    return true;
  }
  return false;
};

export const getOrderDetailsById = async (orderId) => {
  const query = "select * from bookOrder where id=?";
  const [response] = await dbConn.query(query, [orderId]);
  if (response.length > 0) {
    return response;
  }
  return null;
};

export const cancelOrder = async (orderId) => {
  const connection = await dbConn.getConnection();

  try {
    await connection.beginTransaction();

    const orderDetails = await getOrderDetailsById(orderId);

    if (!orderDetails) {
      return { error: "Order not found" };
    }

    let query;
    if (orderDetails.paymentMode === "COD") {
      query =
        "UPDATE bookOrder SET orderStatus='cancelled', paymentStatus='failed' WHERE id=?";
    } else {
      query =
        "UPDATE bookOrder SET orderStatus='cancelled', paymentStatus='refunded' WHERE id=?";
    }

    const [response] = await connection.query(query, [orderId]);

    if (response.affectedRows === 0) {
      throw new Error("Failed to update order status");
    }

    await connection.commit();

    return true;
  } catch (error) {
    await connection.rollback();
    console.error("Error canceling order:", error);
    return { error: error.message };
  } finally {
    connection.release();
  }
};

export const getDeliveredOrderCountByUserId = async (userId) => {
  const query =
    "SELECT COUNT(*) AS count FROM bookOrder WHERE userId = ? AND orderStatus = 'delivered'";
  try {
    const [response] = await dbConn.query(query, [userId]);
    if (response.length > 0) {
      return response[0].count;
    }
    return null;
  } catch (error) {
    console.error("Error fetching delivered order count:", error);
    throw error;
  }
};

export const getPendingOrderCountByUserId = async (userId) => {
  const query =
    "SELECT COUNT(*) AS count FROM bookOrder WHERE userId = ? AND orderStatus = 'pending'";
  try {
    const [response] = await dbConn.query(query, [userId]);
    if (response.length > 0) {
      return response[0].count;
    }
    return null;
  } catch (error) {
    console.error("Error fetching delivered order count:", error);
    throw error;
  }
};

export const getCancelledOrderCountByUserId = async (userId) => {
  const query =
    "SELECT COUNT(*) AS count FROM bookOrder WHERE userId = ? AND orderStatus = 'cancelled'";
  try {
    const [response] = await dbConn.query(query, [userId]);
    if (response.length > 0) {
      return response[0].count;
    }
    return null;
  } catch (error) {
    console.error("Error fetching delivered order count:", error);
    throw error;
  }
};

export const getUserALLOrderDetails = async (userId) => {
  const query = `SELECT
    bookOrder.id AS orderId,
    bookOrder.userId,
    bookOrder.orderPrice,
    bookOrder.paymentMode,
       bookOrder.contactNumber,
    bookOrder.paymentStatus,
     bookOrder.address,
    bookOrder.created_at,
    bookOrder.orderStatus,
    GROUP_CONCAT(bookdetails.bookName ORDER BY bookdetails.id ASC SEPARATOR ',') AS bookNames,
    GROUP_CONCAT(bookOrderDetails.quantity ORDER BY bookdetails.id ASC SEPARATOR ' , ') AS quantities,
    GROUP_CONCAT(bookOrderDetails.price ORDER BY bookdetails.id ASC SEPARATOR ' / ') AS prices
FROM
    bookdatabase.bookOrder
INNER JOIN
    bookdatabase.bookOrderDetails ON bookOrder.id = bookOrderDetails.bookOrderId
INNER JOIN
    bookdatabase.bookdetails ON bookOrderDetails.bookId = bookdetails.id
WHERE
   bookOrder.userId =?
GROUP BY
    bookOrder.id
ORDER BY
    bookOrder.id DESC;`;

  const [response] = await dbConn.query(query, [userId]);
  if (response.length > 0) {
    return response;
  }
  return null;
};

export const getCompletedOrderDetailsById = async (userId) => {
  const query = `SELECT
    bookOrder.id AS orderId,
    bookOrder.userId,
    bookOrder.orderPrice,
    bookOrder.paymentMode,
       bookOrder.contactNumber,
    bookOrder.paymentStatus,
     bookOrder.address,
    bookOrder.created_at,
    bookOrder.orderStatus,
    GROUP_CONCAT(bookdetails.bookName ORDER BY bookdetails.id ASC SEPARATOR ',') AS bookNames,
    GROUP_CONCAT(bookOrderDetails.quantity ORDER BY bookdetails.id ASC SEPARATOR ' , ') AS quantities,
    GROUP_CONCAT(bookOrderDetails.price ORDER BY bookdetails.id ASC SEPARATOR ' / ') AS prices
FROM
    bookdatabase.bookOrder
INNER JOIN
    bookdatabase.bookOrderDetails ON bookOrder.id = bookOrderDetails.bookOrderId
INNER JOIN
    bookdatabase.bookdetails ON bookOrderDetails.bookId = bookdetails.id
WHERE
   bookOrder.orderStatus = 'delivered' and userId=?
GROUP BY
    bookOrder.id
    
ORDER BY
    bookOrder.id DESC;`;

  const [response] = await dbConn.query(query, [userId]);
  if (response.length > 0) {
    return response;
  }
  return null;
};

export const getPendingOrderDetailsById = async (userId) => {
  const query = `SELECT
    bookOrder.id AS orderId,
    bookOrder.userId,
    bookOrder.orderPrice,
    bookOrder.paymentMode,
       bookOrder.contactNumber,
    bookOrder.paymentStatus,
     bookOrder.address,
    bookOrder.created_at,
    bookOrder.orderStatus,
    GROUP_CONCAT(bookdetails.bookName ORDER BY bookdetails.id ASC SEPARATOR ',') AS bookNames,
    GROUP_CONCAT(bookOrderDetails.quantity ORDER BY bookdetails.id ASC SEPARATOR ' , ') AS quantities,
    GROUP_CONCAT(bookOrderDetails.price ORDER BY bookdetails.id ASC SEPARATOR ' / ') AS prices
FROM
    bookdatabase.bookOrder
INNER JOIN
    bookdatabase.bookOrderDetails ON bookOrder.id = bookOrderDetails.bookOrderId
INNER JOIN
    bookdatabase.bookdetails ON bookOrderDetails.bookId = bookdetails.id
WHERE
   bookOrder.orderStatus = 'pending' and userId=?
GROUP BY
    bookOrder.id
    
ORDER BY
    bookOrder.id DESC;`;

  const [response] = await dbConn.query(query, [userId]);
  if (response.length > 0) {
    return response;
  }
  return null;
};

export const getCancelledOrderDetailsById = async (userId) => {
  const query = `SELECT
    bookOrder.id AS orderId,
    bookOrder.userId,
    bookOrder.orderPrice,
    bookOrder.paymentMode,
       bookOrder.contactNumber,
    bookOrder.paymentStatus,
     bookOrder.address,
    bookOrder.created_at,
    bookOrder.orderStatus,
    GROUP_CONCAT(bookdetails.bookName ORDER BY bookdetails.id ASC SEPARATOR ',') AS bookNames,
    GROUP_CONCAT(bookOrderDetails.quantity ORDER BY bookdetails.id ASC SEPARATOR ' , ') AS quantities,
    GROUP_CONCAT(bookOrderDetails.price ORDER BY bookdetails.id ASC SEPARATOR ' / ') AS prices
FROM
    bookdatabase.bookOrder
INNER JOIN
    bookdatabase.bookOrderDetails ON bookOrder.id = bookOrderDetails.bookOrderId
INNER JOIN
    bookdatabase.bookdetails ON bookOrderDetails.bookId = bookdetails.id
WHERE
   bookOrder.orderStatus = 'cancelled' and userId=?
GROUP BY
    bookOrder.id
    
ORDER BY
    bookOrder.id DESC;`;

  const [response] = await dbConn.query(query, [userId]);
  if (response.length > 0) {
    return response;
  }
  return null;
};

export const getAllCancelledOrderDetails = async () => {
  const query = `
    SELECT
      bookOrder.id AS orderId,
      bookOrder.userId,
      bookOrder.orderPrice,
      bookOrder.paymentMode,
      bookOrder.contactNumber,
      bookOrder.paymentStatus,
      bookOrder.address,
      bookOrder.created_at,
      bookOrder.orderStatus,
      GROUP_CONCAT(bookdetails.bookName ORDER BY bookdetails.id ASC SEPARATOR ', ') AS bookNames,
      GROUP_CONCAT(bookOrderDetails.quantity ORDER BY bookdetails.id ASC SEPARATOR ', ') AS quantities,
      GROUP_CONCAT(bookOrderDetails.price ORDER BY bookdetails.id ASC SEPARATOR ', ') AS prices
    FROM
      bookdatabase.bookOrder
    INNER JOIN
      bookdatabase.bookOrderDetails ON bookOrder.id = bookOrderDetails.bookOrderId
    INNER JOIN
      bookdatabase.bookdetails ON bookOrderDetails.bookId = bookdetails.id
      WHERE
   bookOrder.orderStatus = 'cancelled'
    GROUP BY
      bookOrder.id;
  `;

  try {
    const [response] = await dbConn.query(query);
    if (response.length > 0) {
      return response;
    } else {
      return { message: "No orders found." };
    }
  } catch (error) {
    console.error("Database query error:", error);
    throw new Error("Failed to retrieve order details.");
  }
};
