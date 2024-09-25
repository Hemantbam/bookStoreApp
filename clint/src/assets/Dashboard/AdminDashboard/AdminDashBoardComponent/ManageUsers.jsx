import React, { useEffect, useState } from 'react';
import { registerUser } from '../../../../api/authApi';
import { allUserDetails, deleteUser, updateUser } from '../../../../api/userDetails';
import './manageUsers.css';

const ManageUsers = () => {
  const [dbUsers, setDbUser] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [edit, setEdit] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [sucessMessage, setSucessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUserDetails = async () => {
    const users = await allUserDetails();
    setDbUser(users);
  };

  const handleDelete = async (userId) => {
    const result = await deleteUser(userId);
    if (result) {
      handleUserDetails();
      console.log(result);
    }
  };

  const handleEditUser = (user) => {
    const { userId, userEmail } = user;
    setEmail(userEmail);
    setPassword('');
    setEdit(true);
    setSelectedUserId(userId);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setErrorMessage('');
    setSucessMessage('');

    try {
      if (edit) {
        const updatedUser = await updateUser(selectedUserId, email);
        if (updatedUser) {
          handleUserDetails();
          console.log(updateUser.message)
          setSucessMessage(updatedUser.message);

        }
      } else {
        const newUser = await registerUser(email, password);
        if (newUser) {
          handleUserDetails();
          setSucessMessage(newUser.message);
        }
      }

      setEmail('');
      setPassword('');
      setEdit(false);
    } catch (err) {
      console.log(err);

      setErrorMessage('An error occurred.');
    }
  };

  useEffect(() => {
    handleUserDetails();
  }, []);
  setTimeout(() => {
    setSucessMessage('')
  }, 5000);
  return (
    <div className="manageUsersContainer">
      <h1 className="title">Manage Users</h1>
      <h2>Registered Users</h2>
      <div className="tableContainer">
        <table className="usersTable">
          <thead>
            <tr className="tableHeader">
              <th className="headerCell">User ID</th>
              <th className="headerCell">User Email</th>
              <th className="headerCell">User Role</th>
              <th className="headerCell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dbUsers.length > 0 ? (
              dbUsers.map((user) => (
                <tr className="tableRow" key={user.userId}>
                  <td className="tableCell">{user.userId}</td>
                  <td className="tableCell">{user.userEmail}</td>
                  <td className="tableCell">{user.role}</td>
                  <td className="tableCell">
                    <div className="buttonContainer">
                    <button
                      className="deleteButton"
                      onClick={() => handleDelete(user.userId)}
                    >
                      Delete
                    </button>
                    <button
                      className="editButton"
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </button>
                    </div>
                   
                  </td>
                </tr>
              ))
            ) : (
              <tr className="tableRow">
                <td className="noUsersCell">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <h2>{edit ? 'Edit User' : 'Add User'}</h2>
      <div className="addUser">
        {errorMessage && <p className="error">{errorMessage}</p>}
        {sucessMessage && <p className="success">{sucessMessage}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {!edit && (
            <>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </>
          )}
          <button type="submit" className="editButton">
            {edit ? 'Save' : 'Add'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageUsers;
