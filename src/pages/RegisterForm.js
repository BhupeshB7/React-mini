import React, { useState } from 'react';
import axios from 'axios';
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import ReCAPTCHA from 'react-google-recaptcha';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    sponsorId: ''
  });
  const [userId, setUserId] = useState('');
  // const [emailId, setEmailId] = useState('');
  const [errors, setErrors] = useState('');
  //show password
  const [showPassword, setShowPassword] = useState(false);
  const [verified, setVerified] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
//captcha verification
function onChange(value) {
  // console.log("Captcha value:", value);
  setVerified(true);
}
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('https://gspbackend.onrender.com/api/users/register', formData);
      setUserId(res.data.userId);
      setFormData({
        name: '',
        email: '',
        password: '',
        mobile: '',
        sponsorId: ''
      });
      // setErrors({});
      console.log(res.data);
      toast.success("User Registered SucceccFully!");
    } 
    // catch (err) {
    //   setErrors(err.res.data);
    //   console.log(err.res.data);
    //   setErrors( 'Email Id already registered.');
    //   setErrors(err.res.data.message || 'An error occurred');
    // }
    catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error('Email or mobile number already in use.');
      } else {
        setErrors('An error occurred. Please try again later.');
      }
    }

  };

  return (
    <div className="Registration-form-container">    
      <form onSubmit={handleSubmit} className='registration-form'>
      <h1>Register</h1>
        <div className=" input-group">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`form-input ${errors.name ? 'is-invalid' : ''}`}
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>
        <div className=" input-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-input ${errors.email ? 'is-invalid' : ''}`}
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors && <div className="form-error">{errors}</div>}
        </div>
        <div className=" input-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className='input-container'>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password "
            name="password"
            className={`form-input input-field ${errors.password ? 'is-invalid' : ''}`}
            value={formData.password}
            onChange={handleChange}
            minLength="6"
            required
          />
          <button className='password-button' onClick={togglePasswordVisibility}>
        {showPassword ? <AiFillEyeInvisible/> :<AiFillEye/>  } 
      </button>
          </div>
          
          {errors.password && <span className="form-error">{errors.password}</span>}
        </div>
        <div className=" input-group">
          <label htmlFor="mobile" className="form-label">
            Mobile
          </label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            className={`form-input ${errors.mobile ? 'is-invalid' : ''}`}
            value={formData.mobile}
            onChange={handleChange}
            pattern="[0-9]{1}[0-9]{9}"
            required
          />
          {errors.mobile && <div className="form-error">{errors.mobile}</div>}
        </div>
        <div className=" input-group">
          <label htmlFor="sponsorId" className="form-label">
            Sponsor ID
          </label>
          <input
            type="text"
            id="sponsorId"
            name="sponsorId"
            className={`form-input ${errors.sponsorId ? 'is-invalid' : ''}`}
            value={formData.sponsorId}
            onChange={handleChange}
          />
          {errors.sponsorId && <div className="form-error">{errors.sponsorId}</div>}
        </div>
        <div className="captcha">

        <ReCAPTCHA  sitekey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' onChange={onChange}/>
        </div>
                    
        <button type="submit"  disabled={!verified} className="btn btn-primary register-button">
          Register
        </button>
      </form>
      {userId && (
        <div className="user-display">
          <h2>User ID: {userId}</h2>
          {/* <h3>Email Id: {emailId}</h3> */}
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
