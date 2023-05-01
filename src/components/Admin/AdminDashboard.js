
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const getTokenExpireTime = () => {
  const tokenExpire = localStorage.getItem('tokenExpire');
  return tokenExpire ? parseInt(tokenExpire) : null;
};

const isTokenExpired = () => {
  const expireTime = getTokenExpireTime();
  return expireTime ? expireTime < Date.now() : true;
};

const AdminDashboard = () => {
  const [isTokenValid, setIsTokenValid] = useState(true);

  //show user data state
  const [showData, setShowData] = useState(false);
  // hide user data state
  const [showUserData, setShowUserData] = useState(false);
  //show user data state
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  // hide user data state
  const [showUserWithdrawal, setShowUserWithdrawal] = useState(false);
  
   //for Task management Start
    const [tasks, setTasks] = useState([]);
      const [title, setTitle] = useState('');
      const [videoLink, setVideoLink] = useState('');
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        const newTask = { title, videoLink };
        try {
          const response = await axios.post('https://gspbackend.onrender.com/api/task/tasks', newTask);
          setTasks([...tasks, response.data]);
          setTitle('');
          setVideoLink('');
          alert('Task Added SuccessFully!');
        } catch (error) {
          console.error(error);
        }
      };
    
      const handleDelete = async (taskId) => {
        try {
          await axios.delete(`https://gspbackend.onrender.com/api/task/tasks/${taskId}`);
          setTasks(tasks.filter((task) => task._id !== taskId));
          alert('Task Deleted SuccessFully!');
        } catch (error) {
          console.error(error);
        }
      };
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'title') {
          setTitle(value);
        } else if (name === 'videoLink') {
          setVideoLink(value);
        }
      };
    
      const fetchTasks = async () => {
        try {
          const response = await axios.get('https://gspbackend.onrender.com/api/task/tasks');
          setTasks(response.data);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };
    
   //for Task management Done
  //show user data state
  const [showTask, setShowTask] = useState(false);
  // hide user data state
   const [showUserTask, setShowUserTask] = useState(false);
  useEffect(() => {
    if (isTokenExpired()) {
      setIsTokenValid(false);
      // redirect to homepage
      window.location.href = '/admin-login';
    }
  }, []);
   


    //User Management
    const [users, setUsers] = useState([]);

    // useEffect(() => {
      const getUsers = async () => {
        const response = await axios.get('https://gspbackend.onrender.com/api/admin/api/users');
        setUsers(response.data);
      };
      // getUsers();
    // }, []);
    useEffect(() => {
      getUsers();
    }, []);
  
    const handleDeleteUser = async (id) => {
      await axios.delete(`https://gspbackend.onrender.com/api/admin/api/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    };

      // show the user data function
      const handleShow =()=>{
        setShowData(!showData);
      }
  const handleClick = () => {
    handleShow();
    toggleContentVisibility();
  };
  const toggleContentVisibility = () => {
    setShowUserData(!showUserData);
  };

      // show the user Task function
      const handleTask =()=>{
        setShowTask(!showTask);
      }
  const handleClickTask = () => {
    handleTask();
    toggleContentVisibilityTask();
  };
  const toggleContentVisibilityTask = () => {
    setShowUserTask(!showUserTask);
  };

      // show the user data function
      const handleShowWithdrawal =()=>{
        setShowWithdrawal(!showWithdrawal);
      }
  const handleClickWithdrawal = () => {
    handleShowWithdrawal();
    toggleContentVisibilityWithdrawal();
  };
  const toggleContentVisibilityWithdrawal = () => {
    setShowUserWithdrawal(!showUserWithdrawal);
  };
  //For User Activation
  
  const handleActivate = async (id) => {
    try {
    await axios.patch(`https://gspbackend.onrender.com/api/active/${id}/activate`);
    getUsers();
    alert('User activated.');
    } catch (error) {
    console.error(error);
    }
    };
    
    const handleDeactivate = async (id) => {
    try {
    await axios.patch(`https://gspbackend.onrender.com/api/active/${id}/deactivate`);
    getUsers();
    alert('User deactivated.');
    } catch (error) {
    console.error(error);
    }
    };
  return (
    <div>
      {isTokenValid ? (
        <>
        <div className="container-fluid admin-dashboard">

       
        
        {/* <button onClick={handleLogout}>Logout</button> */}
{/*  */}
<nav className="navbar navbar-expand-lg navbar-light bg-light ">
  <div className="navbar-brand" >GSP</div>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon" />
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav  ms-auto">
    <li className="nav-item">
      <button className="text-center btn btn-primary" onClick={handleClickWithdrawal}>{showUserWithdrawal ? 'Hide WithDrawal' : 'Show Withdrawal'}</button>
        </li>
      <li className="nav-item">
      <button className="text-center btn btn-primary" onClick={handleClickTask}>{showUserTask ? 'Hide Task' : 'Show Task'}</button>
        </li>
      <li className="nav-item">     
      <button className="text-center btn btn-primary" onClick={handleClick}>{showUserData ? 'Hide User' : 'show user'}</button>
      </li>
    </ul>
  </div>
</nav>
{/* <h1>Welcome to the Admin Dashboard!</h1> */}
{/*  */}
        {/*  */}

  {showData &&   <div className="container-fluid">  
        <h1 className='text-center'>User Management</h1>
      <table className="table table-striped table-light">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Sponsor Id</th>
            <th>User Id</th>
            <th>Status</th>
            <th>Action</th>
            <th>Delete User</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{user.sponsorId}</td>
              <td>{user.userId}</td>
              <td>{user.is_active ? 'Active' : 'Deactive'}</td>
              <td>
                {user.is_active ? (
                  <button className='btn btn-dark' onClick={() => handleDeactivate(user._id)}>
                  Deactivate
                  </button>
                  ) : (
                  <button className='btn btn-secondary' onClick={() => handleActivate(user._id)}>
                  Activate
                  </button>
                  )}
              </td>
              <td>
                <button className='btn btn-danger' onClick={() => handleDeleteUser(user._id)}>
                Delete user
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      </div>}
      {/* For Task */}
      </div>
        {/*  */}
        {showTask && 
      //     <div className="container-fluid">  
      //   <h3 className='text-center' style={{fontWeight:"bold", color:"gray"}}>User Task</h3>
      //           <div className="form_container">
      //                 <form>
      //                   <div className="formInput">
      //                     <div className="form_input">
      //                       <label>Task</label>
      //                       <input type="text" />
      //                     </div>
      //                     <div className="form_input">
      //                       <label>Task Description</label>
      //                       <input type="text" />
      //                     </div>
      //                     <button className='form_button'>Add Task</button>
      //                   </div>
      //                 </form>
      //           </div>
      // </div>
      <>
      <h1>Admin Page</h1>
      <div className="form_container">

      <form onSubmit={handleSubmit}>
        <div className="formInput">

        <div className='form_input'>
          <label htmlFor="title">Title:</label>
          <input type="text" name="title" value={title} onChange={handleInputChange} required />
        </div>
        <div className='form_input'>
          <label htmlFor="videoLink">Video URL:</label>
          <input type="text" name="videoLink" value={videoLink} onChange={handleInputChange} required />
        </div>
        <button type="submit" className='form_button' >Add Task</button>
        </div>
      </form>
      </div>
      <h2>Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <div>{task.title}</div>
              <div>{task.videoLink}</div>
              <button type="button" onClick={() => handleDelete(task._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      <button type="button" onClick={fetchTasks}>
        Refresh
      </button>
    </>
      }
        {/* For Withdrawal */}
        {showWithdrawal && 
          <div className="container-fluid">  
        <h3 className='text-center' style={{fontWeight:"bold", color:"gray"}}>WithDrawal History</h3>
                <div className="form_container">
                      <form>
                        <div className="formInput">
                          <div className="form_input">
                            <label>Account Number</label>
                            <input type="text" />
                          </div>
                          <div className="form_input">
                            <label>IFSC Code</label>
                            <input type="text" />
                          </div>
                          <div className="form_input">
                            <label>User ID</label>
                            <input type="text" />
                          </div>
                          <div className="form_input">
                            <label>Transaction Id</label>
                            <input type="text" />
                          </div>
                          <button className='form_button'>WithDraw</button>
                        </div>
                      </form>
                </div>
      </div>}
        </>
        
      ) : (
        <h1>Your session has expired. Please log in again.</h1>
      )}
    </div>
  );
};

export default AdminDashboard;

