import Dashboard from '../../Components/UserDashboardComponent/UserHomeDashboard/Dashboard'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function UserDashboard() {
  const [showDashboard, setShowDashboard] = useState(false);

  const navigate = useNavigate()

  const handelDashboard = () => {
    setShowDashboard(true)
  }

  const handelLogOut = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        navigate("/");
      }
    });
  };

  useEffect(() => {
    handelDashboard();
  }, []);

  return (
    <>
      <div className="Container">
        <aside className="sidebar">
          <h2>Basic Panel</h2>
          <section className="authorizedFunction">
            <div className="manage">
              <span className='manageUsersAndBooks' onClick={handelDashboard} >
                <img src="./Images/dashboard.png" alt="" />Dashboard
              </span>
              <span className='manageUsersAndBooks'>
                <img src="./Images/bookStack.png" alt="" />View Books
              </span>
              {/* <span className='manageUsersAndBooks' >
                        <img src="./Images/manageBooks.png" alt="" />Manage Books
                    </span> */}
            </div>
          </section>
          <br />
          <br />
          <h3 className='logOut' onClick={handelLogOut} >Logout</h3>
        </aside>
        {showDashboard && <Dashboard />}
      </div>
    </>
  )
}

export default UserDashboard
