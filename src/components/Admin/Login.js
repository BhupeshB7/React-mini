// import { useState } from 'react';

// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
// const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('https://gspbackend.onrender.com/api/admin/login', { email, password });

//       localStorage.setItem('token', response.data.token);

//       navigate('/admin/dashboard');
//     } catch (error) {
//       setError(error.response.data.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//         {error && <div>{error}</div>}
//   <div>
//     <label htmlFor="email">Email</label>
//     <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//   </div>
//   <div>
//     <label htmlFor="password">Password</label>
//     <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//   </div>
//   <button type="submit">Login</button>
// </form>
// );
// };

// export default Login;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Login({ onLogin }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('https://gspbackend.onrender.com/api/admin/login', { email, password });
//       localStorage.setItem('token', response.data.token);
//       navigate('/admin/dashboard');
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;








// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from './useAuth';

// const Login = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: '', password: '' });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const { email, password } = formData;
//     await login(email, password);
//     navigate('/');
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Email:
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             required
//           />
//         </label>
//         <br />
//         <label>
//           Password:
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleInputChange}
//             required
//           />
//         </label>
//         <br />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;








import React, { useState } from 'react';
import logo from '../../assets/logo-2.png'
const Login = () => {
  const [email, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://gspbackend.onrender.com/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid userId or password');
      }

      const { token } = await response.json();
      
      localStorage.setItem('token', token);
      // token will expire in 24 hours
      localStorage.setItem('tokenExpire', Date.now() + 8600000 ); //86400000

      setError(null);
      // redirect to dashboard page
      window.location.href = '/admin/dashboard';
    } catch (error) {
      setError(error.message);
      alert(error.message)
    }
  };
  

  return (
    <div className="form_container">  
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <div className="formInput">
      <div className="form_section" style={{marginTop:"15px"}}>
            <div className="img"><img src={logo} height={"110px"} width={"80px"} alt="Logo" /></div>
            <div className="content">
               <div className="heading" style={{fontSize:"20px",fontWeight:"bold", marginTop:"16px", marginBottom:"-15px",color:"gray"}}>Welcome</div> <hr />
               <div className="body" style={{fontSize:"17px", marginTop:"-15px"}}>Login to continue</div>
            </div>
        </div>
        <div className="form_input">
        <label> emailId: </label>
        <input type="text" value={email} onChange={(e) => setEmailId(e.target.value)} />
         </div>
         <div className="form_input">
         <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
         </div>
            <button type="submit" className='form_button'>Login</button>
      </div>
      
    </form>
    </div>
  );
};

export default Login;