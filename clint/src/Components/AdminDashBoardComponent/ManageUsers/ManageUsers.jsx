import { useEffect, useState } from 'react';
import { registerUser } from '../../../api/authApi';
import { allUserDetails, deleteUser, updateUser } from '../../../api/userDetails';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './manageUsers.css';

const ManageUsers = () => {
  const [dbUsers, setDbUser] = useState([]);
  const [email, setEmail] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [editSuccessMessage, setEditSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [editErrorMessage, setEditErrorMessage] = useState("");

  const MySwal = withReactContent(Swal);

  const handleUserDetails = async () => {
    const users = await allUserDetails();
    setDbUser(users);
  };

  const handleDelete = async (userId) => {
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
      await deleteUser(userId);
      handleUserDetails();
      MySwal.fire(
        'Deleted!',
        'User has been deleted.',
        'success'
      );
    }
  };

  const handleEditUser = (user) => {
    const { userId, userEmail } = user;
    setUpdateEmail(userEmail);
    setSelectedUserId(userId);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const newUser = await registerUser(email, password);
      if (newUser) {
        handleUserDetails();
        setSuccessMessage("User added successfully!");
      }

      setEmail('');
      setPassword('');
    } catch (err) {
      console.log(err);
      setErrorMessage('An error occurred.');
    }
  };

  
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditErrorMessage('');
    setEditSuccessMessage('');

    try {
      const updatedUser = await updateUser(selectedUserId, updateEmail);
      if (updatedUser) {
        handleUserDetails();
        setUpdateEmail('');
        setSelectedUserId(null);
        setEditSuccessMessage("User updated successfully!");
      }
    } catch (err) {
      console.log(err);
      setEditErrorMessage('An error occurred.');
    }
  };

  useEffect(() => {
    handleUserDetails();
  }, []);

  setTimeout(() => {
    setSuccessMessage('');
    setEditErrorMessage('');
    setEditSuccessMessage('');
  }, 9000);

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
                <td className="noUsersCell" colSpan="4">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h2>Add User</h2>
      <div className="addUser">
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <form onSubmit={handleAddSubmit}>
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
          <button type="submit" className="editButton">
            Add
          </button>
        </form>
      </div>

      <h2>Edit User</h2>
      <div className="editUser">
        {editErrorMessage && <p className="error">{editErrorMessage}</p>}
        {editSuccessMessage && <p className="success">{editSuccessMessage}</p>}
        <form onSubmit={handleEditSubmit}>
          <label htmlFor="updateEmail">Email</label>
          <input
            type="email"
            id="updateEmail"
            name="updateEmail"
            placeholder="email"
            value={updateEmail}
            onChange={(e) => setUpdateEmail(e.target.value)}
            required
          />
          <button type="submit" className="editButton">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageUsers;
