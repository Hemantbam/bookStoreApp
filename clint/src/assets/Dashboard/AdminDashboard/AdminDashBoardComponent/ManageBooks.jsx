import React from 'react';
import './ManageBooks.css';

function ManageBooks() {
  return (
    <div className="bookManageContainer">
      <h1>Manage Books</h1>

      {/* Book Details Table */}
      <div className="bookTableContainer">
        <h2>Book Details</h2>
        <table className="bookTable">
          <thead>
            <tr className="bookTableHeader">
              <td className='bookHeaderCell'>Book ID</td>
              <td className='bookHeaderCell'>Book Name</td>
              <td className='bookHeaderCell'>Book Category</td>
              <td className='bookHeaderCell'>Book Author</td>
              <td className='bookHeaderCell'>Book Price</td>
              <td className='bookHeaderCell'>Actions</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='bookTableCell'>1</td>
              <td className='bookTableCell'>The Great Gatsby</td>
              <td className='bookTableCell'>Fiction</td>
              <td className='bookTableCell'>F. Scott Fitzgerald</td>
              <td className='bookTableCell'>$10.99</td>
              <td className='bookTableCell'>
                <div className="bookActionButtons">
                  <button className="editButton">Edit</button>
                  <button className="deleteButton">Delete</button>
                </div>
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>


    </div>
  );
}

export default ManageBooks;
