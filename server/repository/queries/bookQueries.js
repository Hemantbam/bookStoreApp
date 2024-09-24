
const bookQueries = {
    addNewBook: "INSERT INTO bookdetails (bookName, bookCategory, bookAuthor, bookPrice) VALUES (?, ?, ?, ?)",
    getAllBooks: "SELECT * FROM bookdetails",
    getLatestAddedBooks: "SELECT * FROM bookdetails ORDER BY id DESC LIMIT 1", 
    getBookByName: "SELECT * FROM bookdetails WHERE bookName = ?",
    getBookByAuthor: "SELECT * FROM bookdetails WHERE bookAuthor = ?",
    getBookByCategory: "SELECT * FROM bookdetails WHERE bookCategory = ?",
    getBookById:"select * from bookdetails where id=?",
    deleteBook: "DELETE FROM bookdetails WHERE id = ?",
    updateBookDetails: "UPDATE bookdetails SET bookName = ?, bookCategory = ?, bookAuthor = ?, bookPrice = ? WHERE id = ?",
    getTotalNumber:"SELECT COUNT(id) AS totalBooks FROM bookdetails"
  };
  
  export default bookQueries;
  

  