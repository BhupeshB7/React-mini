import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BsWhatsapp} from 'react-icons/bs'
import Modal from 'react-modal';
import './Dashboard.css'
import logo from '../assets/logo-2.png'
import { MdOutlineTransferWithinAStation } from 'react-icons/md'
// import { HiOutlineArrowUpTray } from 'react-icons/hi2'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const getTokenExpireTime = () => {
  const tokenExpire = localStorage.getItem('tokenExpire');
  return tokenExpire ? parseInt(tokenExpire) : null;
};

const isTokenExpired = () => {
  const expireTime = getTokenExpireTime();
  return expireTime ? expireTime < Date.now() : true;
};

const Dashboard = () => {
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('token');
  const [level, setLevel] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false);
  //for Direct
  const [isDirectModelOpen, setIsDirectModelOpen]= useState(false);
// For deposit...
const [isModalOpen, setIsModalOpen] = useState(false);
const [userData, setUserData] = useState({
  name: '',
  transactionId: '',
  userID: '',
  image: null
});

// for fetch direct sponsorID
const [sponsors, setSponsors] = useState([]);

// for fetch direct sponsorID - End
//for Withdrawal
const [isWithdrawalModelOpen, setIsWithdrawalModelOpen]= useState(false);
       
const [withdrawalAmount, setWithdrawalAmount] = useState('');

const handleWithdrawalSubmit = (e) => {
  e.preventDefault();
  const amount = Number(withdrawalAmount); // convert string to number
  fetch(`https://gspbackend.onrender.com/api/withdraw/${data.userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount,
      GPay: data.GPay,
      IfscCode: data.IfscCode,
      accountNo: data.accountNo,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // display success message or update user balance
        toast.success("Withdrawal successful");
      } else {
        // display error message
        toast.error(`Withdrawal failed: ${data.error}`);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      toast.error(`Withdrawal failed: ${error.message}`);
    });
};


const handleChange = (event) => {
  const { name, value, files } = event.target;
  setUserData(prevState => ({
    ...prevState,
    [name]: files ? files[0] : value
  }));
};

const handleSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData();
  formData.append('name', userData.name);
  formData.append('transactionId', userData.transactionId);
  formData.append('userID', userData.userID);
  formData.append('image', userData.image);
  fetch('https://gspbackend.onrender.com/api/deposit/upload', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
};

const customModalStyles = {
  content: {
    width: '360px', // Set the width of the modal here
    height:"700px",
    position:"absolute",
    left:"10px",
    right:"0px",
    // display:"flex",
    // justifyContent:"center"
  },
};
//for deposit sectio End...
  const navigate = useNavigate();
//For User LogOut
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.href = '/login';
  };
//For User LogOut
const handleLogin = () => {
  window.location.href = '/login';
};
  useEffect(() => {
    if (isTokenExpired()) {
      setIsTokenValid(false);
      // redirect to homepage
      window.location.href = '/login';
    }
  }, []);
    
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch('https://gspbackend.onrender.com/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();       
        const userLevel = getUserLevel(result.level);
        setLevel(userLevel);
        setData(result);
        setIsLoading(false);
      };
      fetchData();
    }, [token]);

    // 
  //  for direct userID
  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await axios.get(`https://gspbackend.onrender.com/api/direct/${data.userId}`);
        setSponsors(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchSponsors();
  }, [data.userId]);
  
  // for fetch direct userId -End
  //for level
  const getUserLevel = (level) => {
    switch (level) {
      case 0:
        return 'starter';
      case 1:
        return 'Beginner';
      case 2:
        return 'Bronze';
      default:
        return 'Unknown';
    }
  };
    if (isLoading) {
      return <div>Loading...</div>;
    }
    //Handle Navigate to task
    const handleTask = () =>{
      navigate('/task');
    }
    // referral link
    const referralLink = `https://globalsuccesspoint.netlify.app/register?ref=${data.userId}`;
  return (
    <div>
      {isTokenValid ? (
        <>
           {/* Dashboard-Navbar */}

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid ms-3">
          <a className="navbar-brand" href="/dashboard" style={{ color: "GRAY", fontWeight: "bolder" }}>GSP</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/profile">Profile</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/profile-update">ProfileUpdate</a>
              </li>
              {/*  */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/dashboard" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Member
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><div className="dropdown-item">
                    <h6 onClick={() =>setIsDirectModelOpen(true)}>Direct</h6>
                  <Modal isOpen={isDirectModelOpen} style={customModalStyles}>
                  <h4 style={{color:"red", fontWeight:"bold", position:"absolute", cursor:"pointer", right:"20px"}} onClick={() => setIsDirectModelOpen(false)}>X</h4>
                     <h6>All Direct team</h6>
                     <div>
                      <ul>
                        {sponsors.map((sponsor, index) => (
                          <li key={sponsor._id}>
                            <div>{`${index + 1} - Name: ${sponsor.name}`}</div>
                            <div>{`Email: ${sponsor.email}`}</div>
                            <div>{`UserId: ${sponsor.userId}`}</div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Modal>
                  </div></li> <hr />
                  <li><div className="dropdown-item">Team</div></li>
                </ul>
              </li>
              {/*  */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/dashboard" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Level
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><div className="dropdown-item">{data.level}</div></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/password-reset">ForgotPassword</a>
              </li>
              <li className="nav-item">
                {isLoggedIn ?(<button className='btn btn-secondary' onClick={handleLogout}>LogOut</button>
              ):(<> <button className='btn btn-secondary' onClick={handleLogin}>Login</button></>)}
                </li>
            </ul>
          </div>
        </div>
      </nav>

      {/*  */}
      <div className="container-fluid dashboard">
        <h2 className='text-center mt-3 '>DashBoard</h2>
        <div className="company-logo">
          <img src={logo} height="150px" width="130px" alt="logo" />
        </div>
        {token ? ( <div className="dashboard-profile-center">
          
          <div className="dashboard-profile ">
          <h6 className="text-center d-flex text-secondary" style={{justifyContent:"center"}}>Hi, {data.name}</h6>
            <h5 className='text-center text-secondary'>userId: {data.userId}</h5>
            <h6 className='text-center text-secondary'>Email: {data.email}</h6>
            <h6 className='text-center text-secondary'>Sponser Id: {data.sponsorId}</h6>
          </div>
        </div>):(
          <h2 className='text-center'>Data is Loading...</h2>
        )}

      
        <div className="id-status">
          <h6 className='text-secondary ms-5'>Id Status: {data.is_active ? 'Active' : 'Inactive'}</h6>
        </div>
        <div className="dashboard-rank">
          <h6 className='text-secondary ms-5' style={{ fontWeight: "bold" }}>Rank: {level}</h6>
        </div>
        <div className="dashboard-earning">
          Daily Income Achieved: 30Rs
        </div>
        <div className="dashboard-Task mt-3">
          <button className='text-center text-light  btn btn-primary' onClick={handleTask} userID={data.userId}>Today's Task</button>
        </div>
        {/* Withdrawal */}
        <div className="row dashboard-box">
          <div className="box-row">
            <div className="box-col">
              <div className="box-col-icon">

                < AiOutlinePlusCircle className='dashboard-icon'onClick={() => setIsModalOpen(true)} />
              </div>
              <h6 className='mt-2 text-success' onClick={() => setIsModalOpen(true)}>Deposit</h6>
              {/* <button onClick={() => setIsModalOpen(true)}>Open Modal</button> */}
      <Modal isOpen={isModalOpen} style={customModalStyles}>
            <div className="content_container">
                <span style={{color:"gray", textDecoration:"underline", fontWeight:"bold"}}>Deposit</span>
            <h4 style={{color:"red", fontWeight:"bold", position:"absolute", cursor:"pointer", right:"15px"}} onClick={() => setIsModalOpen(false)}>X</h4>
                <h6>Recharge Amount</h6>
                  <h6>Rs. 799/-</h6>
                <div className="image" style={{display:"flex", justifyContent:"center"}}>
                    <img src='https://www.qrcode-monkey.com/img/default-preview-qr.svg' height="200px" width="200px" alt=""style={{display:"flex", alignItems:"center", border:"1px solid black"}} />
                </div>
                    <hr />
                <div className="account" style={{display:"flex", justifyContent:"center"}}>                      
                    <table class="table table-bordered">
                    <thead>
                        <tr>
                        <th scope="col">IFSC CODE</th>
                        <th scope="col">Account Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td scope="row">FINO0000001</td>
                        <td>20256919058</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                <div className="account" style={{display:"flex", justifyContent:"center"}}>                      
                    <table class="table table-bordered">
                    <thead>
                        <tr>
                        <th scope="col">Google Pay</th>
                        <td scope="row">7050421916</td>
                        </tr>
                    </thead>
                    </table>
                </div>
            </div>
            <div className="form_container">

            <form onSubmit={handleSubmit}>
                <div className="formInput">
     
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={userData.name}
        onChange={handleChange}
        />
      <label htmlFor="transactionId">Transaction Id:</label>
      <input
        type="text"
        id="transactionId"
        name="transactionId"
        value={userData.transactionId}
        onChange={handleChange}
        />
      <label htmlFor="userID">User ID:</label>
      <input
        type="text"
        id="userID"
        name="userID"
        value={userData.userID}
        onChange={handleChange}
        />
      <label htmlFor="image">Image:</label>
      <input
        type="file"
        id="image"
        name="image"
        accept="image/png, image/jpeg"
        onChange={handleChange}
        />
      <button className='form_button' type="submit">Submit</button>
      </div>
      
    </form>
    
        </div>
        
      </Modal>
            </div>
            <div className="box-col">
              {/* <div className="box-col-icon">

                <HiOutlineArrowUpTray className='dashboard-icon1' />
              </div> */}
              {/* <h6 className='mt-2 ' style={{ color: '#30ABE2' }}>TopUp</h6> */}
            </div>
            <div className="box-col">
              <div className="box-col-icon">

                <MdOutlineTransferWithinAStation className='dashboard-icon2 ' onClick={() => setIsWithdrawalModelOpen(true)} />
              </div>
              <h6 className='mt-2 ' style={{ color: "palevioletred" }} onClick={() => setIsWithdrawalModelOpen(true)} >Withdrawal</h6>
              <Modal isOpen={isWithdrawalModelOpen} style={customModalStyles}>
              {/* <h4 style={{color:"red", fontWeight:"bold", position:"absolute", right:"15px", cursor:"pointer", top:"-2px"}} onClick={() => setIsWithdrawalModelOpen(false)}>X</h4> */}
              
              {/* <h6 style={{color:"red", fontWeight:"bold"}} onClick={() => setIsWithdrawalModelOpen(false)}>X</h6> */}
               
                {/* <h6>Account No:</h6>
                <h6>{data.accountNo}</h6>
                <h6>IFSC CODE:</h6>
                <h6>{data.ifscCode}</h6>
                <h6>Google Pay:</h6>
                <h6>{data.GPay}</h6> */}
                <div className="form_container" style={{position:"absolute", top:"-30px", left:"-5px", right:"5px"}}>
                
                  <form onSubmit={handleWithdrawalSubmit}>
                  <h4 style={{color:"red", fontWeight:"bold", position:"absolute", cursor:"pointer", right:"20px"}} onClick={() => setIsWithdrawalModelOpen(false)}>X</h4>
              
                    <div className="formInput" style={{marginTop:"50px"}}>
                 <label style={{fontSize:"17px"}}>Account No:</label>
                {/* <input>value={data.accountNo}</input> */}
                <input type="text" value={data.accountNo}  disabled/>
                <label style={{fontSize:"17px"}}>IFSC CODE:</label>
              {/* <input>value={data.ifscCode}</input> */}
              <input type="text"value={data.ifscCode} disabled />
                <label style={{fontSize:"17px"}}>Google Pay:</label>
                {/* <input>value={data.GPay}</input> */}
                <input type="text" value={data.GPay}  disabled/>
                <label>Withdraw Amount</label>
                <input
              type="number"
              value={withdrawalAmount}
              onChange={(e) => setWithdrawalAmount(e.target.value)}
            />
                <button className="form_button">Withdraw</button>

                    </div>
                  </form>
                  <ToastContainer/>
                </div>
              </Modal>
            </div>
          </div>

        </div>
        {/*Withdrawal section end  */}
        {/* Balance Section */}
        <div className="row mt-5 rowBalanceCard">
          <div className="col-11 col-sm-9 col md-6 col-lg-5 balanceCard">
            <p style={{ paddingLeft: "10px", color: 'palevioletred' }}>TOTAL BALANCE</p>
            <h4>{data.balance} Rs</h4>
          </div>
          <div className="col-11 col-sm-9 col md-6 col-lg-5 balanceCard">
            <p style={{ paddingLeft: "10px", color: '#1976d2' }}>INCOME WALLET</p>
            <h4>{data.income} Rs</h4>
          </div>
          <div className="col-11 col-sm-9 col md-6 col-lg-5 balanceCard">
            <p style={{ paddingLeft: "10px", color: 'green' }}>WITHDRAWAL WALLET</p>
            <h4>{data.withdrawal} Rs</h4>
          </div>
        </div>
        {/* Balance section End */}
        <div className="row rowBalanceCard ">
          <div className="col-11 col-sm-9 col-md-5 col lg-4 ">
            <div className="card incomeCard">
              <div className="card-heading text-primary" style={{marginLeft:"20px", fontWeight:"bold", marginTop:"10px"}}>INCOME</div>
              <div className="card-text text-secondary" style={{marginLeft:"15px"}}>Your Total Income: {data.income} Rs</div>
              <div className="col">
                <div class="d-flex flex-row">
                  <div class="p-2">
                    <div class="d-flex flex-column income-border">
                      <div class="p-2 text-secondary">Self Income</div>
                      <div class="p-2" style={{color: "#1976d2"}}>{data.selfIncome} Rs</div>
                    </div>
                  </div>
                  <div class="p-2">
                  <div class="d-flex flex-column income-border">
                      <div class="p-2 text-secondary">Team income</div>
                      <div class="p-2" style={{color: "#1976d2"}}>{data.teamIncome} Rs</div>
                    </div>
                  </div>
                  <div class="p-2">
                  <div class="d-flex flex-column">
                      <div class="p-2 text-secondary">Reward</div>
                      <div class="p-2" style={{color: "#1976d2"}}>0</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        {/* Balance section End */}
        {/* Referral Section */}
        <div className="row rowBalanceCard">
          <div className="col-12 col-sm-9 col-md-5 col-lg-4 ">
            <div className="card mb-3 referralCard">
              <div className="card-heading text-secondary">Referral Link</div>
              <div>
              <div className='form_input'>
                <input type="text" value={referralLink} readOnly  style={{color:"#aaa"}}/>
             </div>
      <button className='btn btn-outline-secondary' onClick={() => navigator.clipboard.writeText(referralLink)}>
        <h6 className='text-dark' style={{paddingTop:"5px"}}>COPY LINK</h6>
      </button>
      <div style={{marginLeft:"20px", display:"inline"}}>

      <a className='text-success'  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(referralLink)}`} target="_blank">
        <BsWhatsapp style={{height:"28px", width:"28px"}}/>
      </a>
      </div>
    </div>
              {/*  */}
            </div>
          </div>
        </div>
        {/* Referal section End */}
      </div>
      {/*  */}
        </>
        
      ) : (
        <h1>Your session has expired. Please log in again.</h1>
      )}
    </div>
  );
};

export default Dashboard;

