import {
  addBook,
  getBooks,
  getBookByBookId,
  updateBook,
  deleteBookDetails,
  getTotalBooksCount,
  getBookByBookName,
  getLatestBooks,
  getAuthorDetails,
  searchBook,
} from "../repository/bookRepository.js";
import bookInputValidate from "../validation/bookDetailValidation.js";

//______________________________________________________________________________________________

export const addNewBooktoDb = async (reqBody,bookImage) => {

  if (!bookInputValidate(reqBody)) {
    return {
      success: false,
      status: 400,
      message: "Invalid input. Please fill all fields correctly.",
    };
  }

  const BookDetails = await getBookByBookName(reqBody.bookName);
  if (BookDetails) {
    return { success: false, status: 409, message: "Book already exists." };
  }


  const response = await addBook(reqBody, bookImage);
  console.log(response);

  if (response) {
    return { success: true, status: 201, message: "Book added successfully." };
  }

  return { success: false, status: 400, message: "Failed to add book." };
};


//______________________________________________________________________________________________

export const getAllBooksDetails = async () => {
  const allBooks = await getBooks();
  if (allBooks) {
    return { success: true, status: 200, books: allBooks };
  }
  return { success: false, status: 404, message: "Books not found" };
};

//______________________________________________________________________________________________

export const getBookDetailsById = async (bookId) => {
  const book = await getBookByBookId(bookId);
  if (book == null) {
    return { success: false, status: 404, message: "Book not found" };
  }
  return { success: true, status: 200, bookDetails: book };
};

//______________________________________________________________________________________________

export const deleteBookByBookId = async (bookId) => {
  const book = await getBookByBookId(bookId);

  if (!book) {
    return { success: false, status: 404, message: "Book not found" };
  }
  const response = await deleteBookDetails(bookId);
  if (response) {
    return { success: true, status: 200, message: "Book deleted succeddfully" };
  }
  return { success: false, status: 400, message: "Error while deleting book" };
};

//______________________________________________________________________________________________

export const updateBookByBookId = async (bookId, reqBody, bookImage) => {
  console.log("Received request body:", reqBody);

  // Validate input data
  if (!bookInputValidate(reqBody)) {
      return {
          success: false,
          status: 400,
          message: "Invalid input. Please check all fields.",
      };
  }

  // Check if the book exists
  const existingBook = await getBookByBookId(bookId);
  if (!existingBook) {
      return { success: false, status: 404, message: "Book not found" };
  }

  // Check for duplicate book names
  const duplicateBook = await getBookByBookName(reqBody.bookName);
  if (duplicateBook && duplicateBook.id !== bookId) {
      return {
          success: false,
          status: 409,
          message: "A book with the same name already exists",
      };
  }

  // Prepare data for updating
  const updateData = {
      ...reqBody,
      ...(bookImage && { bookImage }), // Only include bookImage if provided
  };

  // Update the book in the database
  const updateResult = await updateBook(bookId, updateData);
  if (updateResult === 0) {
      return {
          success: false,
          status: 400,
          message: "Book not found or no changes made",
      };
  }

  return { success: true, status: 200, message: "Book updated successfully" };
};


//______________________________________________________________________________________________

export const getTotalBookCount = async () => {
  const totalBooks = await getTotalBooksCount();
  if (totalBooks) {
    return {
      success: true,
      status: 200,
      message: "Data fetched successfully",
      bookCount: totalBooks,
    };
  } else {
    return { success: false, status: 404, message: "No books found" };
  }
};

//______________________________________________________________________________________________

export const getLatestAddedFourBooks = async () => {
  const books = await getLatestBooks();
  if (books && books.length > 0) {
    return {
      success: true,
      status: 200,
      message: "Data fetched successfully",
      bookDetails: books,
    };
  } else {
    return { success: false, status: 404, message: "No books found" };
  }
};

//______________________________________________________________________________________________

export const getAuthorWithMostBooks = async () => {
  const author = await getAuthorDetails();

  console.log(author);
  if (author) {
    console.log("second", author);

    return {
      success: true,
      status: 200,
      message: "Data fetched successfully",
      bookDetails: author,
    };
  }
  return { success: false, status: 404, message: "author not found" };
};

//______________________________________________________________________________________________
export const getBookWith = async () => {
  const author = await getAuthorDetails();

  if (author) {
    return {
      success: true,
      status: 200,
      message: "Data fetched successfully",
      bookDetails: author,
    };
  }
  return { success: false, status: 404, message: "author not found" };
};

//______________________________________________________________________________________________

export const searchBookByKeyWords = async (word) => {
  const response = await searchBook(word);
  if (response) {
    return {
      success: true,
      status: 200,
      message: "Data fetched sucessfully",
      bookdetails: response,
    };
  }
  return { success: false, status: 404, message: "book not found" };
};
