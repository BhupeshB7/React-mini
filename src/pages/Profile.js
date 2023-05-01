// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// const getTokenExpireTime = () => {
//     const tokenExpire = localStorage.getItem('tokenExpire');
//     return tokenExpire ? parseInt(tokenExpire) : null;
//   };
  
//   const isTokenExpired = () => {
//     const expireTime = getTokenExpireTime();
//     return expireTime ? expireTime < Date.now() : true;
//   };
// const Profile = ({id}) => {

//       const [isTokenValid, setIsTokenValid] = useState(true);
//       const [profile, setProfile] = useState({});
//       const [name, setName] = useState("");
//       const [email, setEmail] = useState("");
//       const [bio, setBio] = useState("");
//       const [image, setImage] = useState(null);
//       const [loading, setLoading] = useState(false);
    
//       useEffect(() => {
//         const fetchProfile = async () => {
//           setLoading(true);
//           try {
//             const res = await axios.get(`http://localhost:500/api/profile/${id}`);
//             setProfile(res.data);
//             setName(res.data.name);
//             setEmail(res.data.email);
//             setBio(res.data.bio);
//           } catch (error) {
//             console.log(error);
//           } finally {
//             setLoading(false);
//           }
//         };
//         fetchProfile();
//       }, [id]);
//       useEffect(() => {
//         if (isTokenExpired()) {
//           setIsTokenValid(false);
//           // redirect to homepage
//           window.location.href = '/login';
//         }
//       }, []);
//       const handleImageChange = (e) => {
//         setImage(e.target.files[0]);
//       };
    
//       const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         const formData = new FormData();
//         formData.append("name", name);
//         formData.append("email", email);
//         formData.append("bio", bio);
//         if (image) {
//           formData.append("image", image);
//         }
//         try {
//           await axios.put(`/api/profile/`, formData, {
//             headers: { "Content-Type": "multipart/form-data" },
//           });
//         } catch (error) {
//           console.log(error);
//         } finally {
//           setLoading(false);
//         }
//       };
    
//       if (loading) {
//         return <p>Loading...</p>;
//       }
      
//   return (
//     <>
//    {isTokenValid ? (
//     <>
//     <h3 className="profile text-center">Profile Page</h3>
//      <div className='container'>
//  <div>
//       <h1>{profile.name}'s Profile</h1>
//       <img src={`/uploads/${profile.image}`} alt="Profile" />
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="bio">Bio:</label>
//           <textarea
//             name="bio"
//             value={bio}
//             onChange={(e) => setBio(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="image">Image:</label>
//           <input type="file" name="image" onChange={handleImageChange} />
//         </div>
//         <button type="submit">Update Profile</button>
//       </form>
//     </div>
//     </div>
    
//     </>
//    ):
//    (<>
//    <h2>Your session has expired , login to continue...</h2>
//    </>
//    )}
//    </>
//   )

// }

// export default Profile










// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// // import LoginPage from './LoginPage';

//  //
//  const getTokenExpireTime = () => {
//   const tokenExpire = localStorage.getItem('tokenExpire');
//   return tokenExpire ? parseInt(tokenExpire) : null;
// };

// const isTokenExpired = () => {
//   const expireTime = getTokenExpireTime();
//   return expireTime ? expireTime < Date.now() : true;
// };
// // export default ProfilePage;
// function ProfilePage({token}) {
//   const [userData, setUserData] = useState(null);
//   const [formData, setFormData] = useState({ name: '', email: '', bio: '', mobile:'', sponsorId:'', userId:'', address:'', createdAt:'' });
//   // const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isTokenValid, setIsTokenValid] = useState(true);

//   useEffect(() => {
//     if (isTokenExpired()) {
//       setIsTokenValid(false);
//       // redirect to homepage
//       window.location.href = '/login';
//       // <LoginPage/>
//     }
//   }, []);
//   useEffect(() => {
//     const fetchUserData = async () => {
      
//       try {
//         const response = await axios.get('https://gspbackend.onrender.com/api/users/profile', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         const data = response.data;
//         setUserData(data);
//         setFormData({ name: data.name, email: data.email, bio: data.bio || '', mobile: data.mobile, sponsorId: data.sponsorId, userId: data.userId, address: data.address, createdAt: data.createdAt  });
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//         console.log(error);
//       }
//     };

//     fetchUserData();
//   }, [token]);

//   // const handleInputChange = (event) => {
//   //   const { name, value } = event.target;
//   //   setFormData((prevFormData) => ({
//   //     ...prevFormData,
//   //     [name]: value,
//   //   }));
//   // };


//   // const handleSubmit = async (event) => {
//   //   event.preventDefault();
//   //   setIsSubmitting(true);

//   //   const formDataToSubmit = new FormData();
//   //   Object.entries(formData).forEach(([key, value]) => {
//   //     formDataToSubmit.append(key, value);
//   //     console.log(formData)
//   //   });

//   //   try {
//   //     const response = await axios.post('https://gspbackend.onrender.com/api/users/profileUpdate', formDataToSubmit, {
//   //       headers: {
//   //         Authorization: `Bearer ${token}`
//   //       }
//   //     });
    
//   //     if (!response.data) {
//   //       throw new Error('Error updating profile');
//   //     }
//   //     if (response.data) {
//   //      alert(response.data.message);
//   //     }
//   //     // if(response.status === 200){
//   //     //   alert('data successfully updated!')
//   //     // }
//   //     setUserData(response.data);
//   //     setIsSubmitting(false);
//   //     // alert('Profile updated!');
//   //   } catch (error) {
//   //     if(error.response && error.response.status === 400){
//   //       alert('already exists');
//   //     }
//   //     else if(error.response && error.response.status === 500){
//   //       alert('server error');
//   //     }
//   //     console.error('Error updating profile:', error);
//   //     setIsSubmitting(false);
//   //   }
    
//   // };

//   return (
//     <div>
//       {userData || isTokenValid? (
//         <>
//       {/*  */}
//       <div className="coontainer">
//         <h2>Welcome, {formData.name}</h2>
//           <table className="table table-bordered">
//   <thead>
//     <tr>
//       <th scope="col">Name</th>
//       <th scope="col">{formData.name}</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <td>Email:</td>
//       <td>{formData.email}</td>
//     </tr>
//     <tr>
//       <td>Mobile:</td>
//       <td>{formData.mobile}</td>
//     </tr>
//     <tr>
//       <td>SponsorId:</td>
//       <td>{formData.sponsorId}</td>
//     </tr>
//     <tr>
//       <td>UserId:</td>
//       <td>{formData.userId}</td>
//     </tr>
//     <tr>
//       <td>Bio:</td>
//       <td>{formData.bio}</td>
//     </tr>
//     <tr>
//       <td>Address:</td>
//       <td>{formData.address}</td>
//     </tr>
//     <tr>
//       <td>Profile Created:</td>
//       <td>{formData.createdAt}</td>
//     </tr>
//   </tbody>
// </table>

//       </div>
//         {/*  */}
//         {/* <form onSubmit={handleSubmit}>
//           <label>
//             Name:
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//             />
//           </label>
//           <label>
//             Email:
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//             />
//           </label>
//           <label>
//             Bio:
//             <textarea
//               name="bio"
//               value={formData.bio}
//               onChange={handleInputChange}
//             />
//           </label>
//           <button type="submit" disabled={isSubmitting}>
//             {isSubmitting ? 'Updating...' : 'Update'}
//           </button>
//         </form>    */}
        
//           </>
//       ) : (
//         <p>Loading user data...</p>
//       )}
//     </div>
//   );
// }
// export default ProfilePage


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('token');
//for navigate user
const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://gspbackend.onrender.com/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      console.log(result); // check the response data
      setData(result);
      setIsLoading(false);
    };
    fetchData();
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
//for user go to dashboard
const handleDashBoard = ()=>{
  navigate('/dashboard');
}
// for user go to profile Update
const handleProfile = () =>{
  navigate('/profile-update');
}
  return (
    <div>
      {token ? ( <div className="dashboard-profile-center">
          <div className="user-profile">
          <div className="container" style={{marginTop:"20px"}}>
        <h5 className='text-center text-secondary'>Welcome, {data.name}</h5>
          <table className="table table-bordered">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">{data.name}</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Email:</td>
      <td>{data.email}</td>
    </tr>
    <tr>
      <td>Mobile:</td>
      <td>{data.mobile}</td>
    </tr>
    <tr>
      <td>SponsorId:</td>
      <td>{data.sponsorId}</td>
    </tr>
    <tr>
      <td>UserId:</td>
      <td>{data.userId}</td>
    </tr>
    <tr>
      <td>Bio:</td>
      <td>{data.bio}</td>
    </tr>
    <tr>
      <td>Address:</td>
      <td>{data.address}</td>
    </tr>
    <tr>
      <td>Account No:</td>
      <td>{data.accountNo}</td>
    </tr>
    <tr>
      <td>IFSC CODE:</td>
      <td>{data.ifscCode}</td>
    </tr>
    <tr>
      <td>Google Pay:</td>
      <td>{data.GPay}</td>
    </tr>
    <tr>
      <td>Profile Created:</td>
      <td>{data.createdAt}</td>
    </tr>
  </tbody>
</table>
<div className="container ">
  <button className='form_button' onClick={handleDashBoard}>DashBoard</button>
  <button className='form_button' onClick={handleProfile}>ProfileUpdate</button>
</div>
      </div>

          </div>
        </div>):(
          <h3>Data is Loading...</h3>
        )}
    </div>
  );
}

export default Profile;
