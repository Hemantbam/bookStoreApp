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
  const [bookDescription, setBookDescription] = useState("");
  const [bookImage, setBookImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [updateBookImage, setUpdateBookImage] = useState(null);
  const [updateBookId, setUpdateBookId] = useState(null);
  const [updateBookDescription, setUpdateBookDescription] = useState("");
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

  const validateImageFile = (file) => {
    if (!file) return true; 
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setErrorMessage("Please upload a valid image file (JPEG, PNG, GIF, WEBP).");
      return false;
    }
    setErrorMessage(""); 
    return true;
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
        setSuccessMessage("Book deleted successfully!");
        setErrorMessage("");
      } catch (err) {
        setErrorMessage("Failed to delete book.");
        console.log(err);
      }
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();

    const newBook = new FormData(); 
    newBook.append("bookName", bookName.trim());
    newBook.append("bookCategory", bookCategory.trim());
    newBook.append("bookAuthor", bookAuthor.trim());
    newBook.append("bookPrice", bookPrice.trim());
    newBook.append("bookDescription", bookDescription.trim());
    newBook.append("bookImage", bookImage);

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
    setBookDescription("");
    setBookImage(null); 
  };

  const clearEditForm = () => {
    setUpdateBookName("");
    setUpdateBookCategory("");
    setUpdateBookAuthor("");
    setUpdateBookPrice("");
    setUpdateBookDescription("");
    setUpdateBookImage(null); 
  };

  const handleEditBook = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("bookName", updateBookName.trim());
    formData.append("bookCategory", updateBookCategory.trim());
    formData.append("bookAuthor", updateBookAuthor.trim());
    formData.append("bookPrice", updateBookPrice.trim());
    formData.append("bookDescription", updateBookDescription.trim());
    formData.append("updateImage", updateBookImage);

    try {
      const result = await updateBook(bookId, formData);


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
    setUpdateBookDescription(book.bookDescription);
    setUpdateBookImage(book.bookImage); 
  };

  useEffect(() => {
    handleBookDetails();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
      setUpdateErrorMessage('');
      setUpdateSuccessMessage('');

    }, 7000);
    return () => clearTimeout(timer);
  }, [successMessage, errorMessage, updateErrorMessage, updateSuccessMessage]);


  const serverURL = "http://localhost:8080";



  return (
    <div className="manageBooksContainer">
      <h1 className="title">Manage Books</h1>
      <h2>Registered Books</h2>
      <div className="tableContainer">
        <table className="booksTable">
          <thead>
            <tr className="tableHeader">
              <th className="headerCell">Book image</th>
              <th className="headerCell">Book Name</th>
              <th className="headerCell">Category</th>
              <th className="headerCell">Author</th>
              <th className="headerCell">Price</th>
              <th className="headerCell">Description</th>
              <th className="headerCell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dbBooks.length > 0 ? (
              dbBooks.map((book) => (
                <tr className="tableRow" key={book.id}>
                  <td className="tableCell"><img src={book.bookImage ? `${serverURL}/${(book.bookImage).replace(/\\/g, '/')}`: "./Images/defaultBook.png"} alt={bookName} className='bookImageInTable' /></td>
                  <td className="tableCell">{book.bookName}</td>
                  <td className="tableCell">{book.bookCategory}</td>
                  <td className="tableCell">{book.bookAuthor}</td>
                  <td className="tableCell">{book.bookPrice}</td>
                  <td className="tableCell">{book.bookDescription}</td>
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
                <td className="noBooksCell" colSpan="6">No books found</td>
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

          <form onSubmit={handleAddBook} className='bookForm' method="post" encType="multipart/form-data">

            <label htmlFor="bookName">Book Name</label>
            <input
              type="text"
              id="bookName"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              required
            />
            <label htmlFor="bookCategory">Book Category</label>
            <input
              type="text"
              id="bookCategory"
              value={bookCategory}
              onChange={(e) => setBookCategory(e.target.value)}
              required
            />
            <label htmlFor="bookAuthor">Book Author</label>
            <input
              type="text"
              id="bookAuthor"
              value={bookAuthor}
              onChange={(e) => setBookAuthor(e.target.value)}
              required
            />
            <label htmlFor="bookPrice">Book Price</label>
            <input
              type="number"
              id="bookPrice"
              value={bookPrice}
              onChange={(e) => setBookPrice(e.target.value)}
              required
            />
            <label htmlFor="bookDescription">Book Description</label>
            <textarea
              id="bookDescription"
              value={bookDescription}
              onChange={(e) => setBookDescription(e.target.value)}
              required
            />
            <label htmlFor="bookImage">Book Image</label>
            <input
              type="file"
              id="bookImage"
              name="bookImage"
              onChange={(e) => setBookImage(e.target.files[0])}
              required
            />
            <button type="submit" className="submitButton">Add Book</button>
          </form>
        </div>









        <div className="editBook">
          <h2>Edit Book</h2>
          {updateErrorMessage && <p className="error">{updateErrorMessage}</p>}
          {updateSuccessMessage && <p className="success">{updateSuccessMessage}</p>}

          <form onSubmit={handleEditBook} className='bookForm' method="post" encType="multipart/form-data">

            <label htmlFor="updateBookName">Book Name</label>
            <input
              type="text"
              id="updateBookName"
              value={updateBookName}
              onChange={(e) => setUpdateBookName(e.target.value)}
              required
            />
            <label htmlFor="updateBookCategory">Book Category</label>
            <input
              type="text"
              id="updateBookCategory"
              value={updateBookCategory}
              onChange={(e) => setUpdateBookCategory(e.target.value)}
              required
            />
            <label htmlFor="updateBookAuthor">Book Author</label>
            <input
              type="text"
              id="updateBookAuthor"
              value={updateBookAuthor}
              onChange={(e) => setUpdateBookAuthor(e.target.value)}
              required
            />
            <label htmlFor="updateBookPrice">Book Price</label>
            <input
              type="number"
              id="updateBookPrice"
              value={updateBookPrice}
              onChange={(e) => setUpdateBookPrice(e.target.value)}
              required
            />
            <label htmlFor="updateBookDescription">Book Description</label>
            <textarea
              id="updateBookDescription"
              value={updateBookDescription}
              onChange={(e) => setUpdateBookDescription(e.target.value)}
              required
            />
            <label htmlFor="updateImage">Book Image</label>
            <input
              type="file"
              id="updateImage"
              name="updateImage"
              onChange={(e) => setUpdateBookImage(e.target.files[0])}
  
            />
            <button type="submit" className="submitButton">Update Book</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ManageBooks;
