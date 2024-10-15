import { useEffect, useState } from 'react';
import { getBooks, deleteBook, addBook, updateBook } from '../../../api/bookDetails';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './manageBooks.css';

const ManageBooks = () => {
  const [dbBooks, setDbBooks] = useState([]);
  const [bookId, setBookId] = useState(null);
  const [bookName, setBookName] = useState("");
  const [bookCategory, setBookCategory] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookPrice, setBookPrice] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [updateBookId, setUpdateBookId] = useState(null);
  const [updateBookName, setUpdateBookName] = useState("");
  const [updateBookCategory, setUpdateBookCategory] = useState("");
  const [updateBookAuthor, setUpdateBookAuthor] = useState("");
  const [updateBookPrice, setUpdateBookPrice] = useState("");
  const [updateSuccessMessage, setUpdateSuccessMessage] = useState("");
  const [updateErrorMessage, setUpdateErrorMessage] = useState("");

  const MySwal = withReactContent(Swal);

  const handleBookDetails = async () => {
    const books = await getBooks();
    setDbBooks(books);
  };

  const handleDeleteBook = async (id) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await deleteBook(id);
        handleBookDetails();
        setDeleteSuccessMessage("Book deleted successfully!");
        setDeleteErrorMessage("");
      } catch (err) {
        setDeleteErrorMessage("Failed to delete book.");
        console.log(err);
      }
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();

    const newBook = {
      bookName: bookName.trim(),
      bookCategory: bookCategory.trim(),
      bookAuthor: bookAuthor.trim(),
      bookPrice: bookPrice.trim(),
    };

    try {
      const result = await addBook(newBook);

      if (result === "unauthorized") {
        setErrorMessage("You are not authorized to add books.");
        return;
      }

      if (result.status === 400) {
        setErrorMessage(result.message || "Invalid input. Please fill all fields.");
        setSuccessMessage("");
        return;
      }

      if (result.status === 409) {
        setErrorMessage("Book name already exists.");
        setSuccessMessage("");
        return;
      }

      setSuccessMessage("Book added successfully!");
      setErrorMessage("");

      handleBookDetails();
      clearAddForm();

    } catch (error) {
      setErrorMessage("Failed to add book. Please try again.");
      console.error("Error adding book:", error);
    }
  };



  const clearAddForm = () => {
    setBookName("");
    setBookCategory("");
    setBookAuthor("");
    setBookPrice("");
  };

  const clearEditForm = () => {
    setUpdateBookName("");
    setUpdateBookCategory("");
    setUpdateBookAuthor("");
    setUpdateBookPrice("");
  };


  const handleEditBook = async (e) => {
    e.preventDefault();

    const updatedBook = {
      bookName: updateBookName.trim(),
      bookCategory: updateBookCategory.trim(),
      bookAuthor: updateBookAuthor.trim(),
      bookPrice: updateBookPrice.trim(),
    };

    try {
      const result = await updateBook(bookId, updatedBook);

      if (result === "unauthorized") {
        setUpdateErrorMessage("You are not authorized to update books.");
        setUpdateSuccessMessage("");
        return;
      }

      if (result.status === 400) {
        setUpdateErrorMessage("Invalid input. Please fill all fields correctly.");
        setUpdateSuccessMessage("");
        return;
      }

      if (result.status === 409) {
        setUpdateErrorMessage("A book with the same name already exists.");
        setUpdateSuccessMessage("");
        return;
      }

      if (result.status === 404) {
        setUpdateErrorMessage("Book not found or no changes made.");
        setUpdateSuccessMessage("");
        return;
      }

      setUpdateSuccessMessage("Book updated successfully!");
      setUpdateErrorMessage("");

      handleBookDetails();

      clearEditForm();

      setBookId(null);
      
    } catch (error) {
      setUpdateErrorMessage("Failed to update book. Please try again.");
      console.error("Error updating book:", error);
    }
  };



  const handleEditButtonClick = (book) => {
    setBookId(book.id);
    setUpdateBookName(book.bookName);
    setUpdateBookCategory(book.bookCategory);
    setUpdateBookAuthor(book.bookAuthor);
    setUpdateBookPrice(book.bookPrice);
  };

  useEffect(() => {
    handleBookDetails();
  }, []);


  setTimeout(() => {
    setSuccessMessage('');
    setErrorMessage('')
    setUpdateErrorMessage('')
    setUpdateSuccessMessage('')
  }, 7000);


  return (
    <div className="manageBooksContainer">
      <h1 className="title">Manage Books</h1>
      <h2>Registered Books</h2>
      <div className="tableContainer">
        <table className="booksTable">
          <thead>
            <tr className="tableHeader">
              <th className="headerCell">Book Name</th>
              <th className="headerCell">Category</th>
              <th className="headerCell">Author</th>
              <th className="headerCell">Price</th>
              <th className="headerCell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dbBooks.length > 0 ? (
              dbBooks.map((book) => (
                <tr className="tableRow" key={book.id}>
                  <td className="tableCell">{book.bookName}</td>
                  <td className="tableCell">{book.bookCategory}</td>
                  <td className="tableCell">{book.bookAuthor}</td>
                  <td className="tableCell">{book.bookPrice}</td>
                  <td className="tableCell">
                    <div className="buttonContainer">
                      <button
                        className="deleteButton"
                        onClick={() => handleDeleteBook(book.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="editButton"
                        onClick={() => handleEditButtonClick(book)}
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="tableRow">
                <td className="noBooksCell" colSpan="5">No books found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <section className="addEditBox">


        <div className="addBook">
          <h2>Add Book</h2>
          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
          <form onSubmit={handleAddBook} className='bookForm'>
            <label htmlFor="bookName">Name</label>
            <input
              type="text"
              id="bookName"
              name="bookName"
              placeholder="Book Name"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              required
            />
            <label htmlFor="bookCategory">Category</label>
            <input
              type="text"
              id="bookCategory"
              name="bookCategory"
              placeholder="Book Category"
              value={bookCategory}
              onChange={(e) => setBookCategory(e.target.value)}
              required
            />
            <label htmlFor="bookAuthor">Author</label>
            <input
              type="text"
              id="bookAuthor"
              name="bookAuthor"
              placeholder="Book Author"
              value={bookAuthor}
              onChange={(e) => setBookAuthor(e.target.value)}
              required
            />
            <label htmlFor="bookPrice">Price</label>
            <input
              type="number"
              id="bookPrice"
              name="bookPrice"
              step="0.1"
              min="1"
              placeholder="Book Price"
              value={bookPrice}
              onChange={(e) => setBookPrice(e.target.value)}
              required
            />
            <button type="submit" className="editButton">
              Add
            </button>
          </form>
        </div>

        <div className="addBook">
          <h2>Edit Book</h2>
          {updateErrorMessage && <p className="error">{updateErrorMessage}</p>}
          {updateSuccessMessage && <p className="success">{updateSuccessMessage}</p>}
          <form onSubmit={handleEditBook}>
            <label htmlFor="updateBookName">Name</label>
            <input
              type="text"
              id="updateBookName"
              name="updateBookName"
              placeholder="Book Name"
              value={updateBookName}
              onChange={(e) => setUpdateBookName(e.target.value)}
              required
            />
            <label htmlFor="updateBookCategory">Category</label>
            <input
              type="text"
              id="updateBookCategory"
              name="updateBookCategory"
              placeholder="Book Category"
              value={updateBookCategory}
              onChange={(e) => setUpdateBookCategory(e.target.value)}
              required
            />
            <label htmlFor="updateBookAuthor">Author</label>
            <input
              type="text"
              id="updateBookAuthor"
              name="updateBookAuthor"
              placeholder="Book Author"
              value={updateBookAuthor}
              onChange={(e) => setUpdateBookAuthor(e.target.value)}
              required
            />
            <label htmlFor="updateBookPrice">Price</label>
            <input
              type="number"
              id="updateBookPrice"
              name="updateBookPrice"
              placeholder="Book Price"
              step="0.1"
          
              value={updateBookPrice}
              onChange={(e) => setUpdateBookPrice(e.target.value)}
              required
            />
            <button type="submit" className="editButton">
              Update
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ManageBooks;
