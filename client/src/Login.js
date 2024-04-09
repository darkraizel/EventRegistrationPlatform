import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [name, setName] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
      e.preventDefault();
    
      axios.post('http://localhost:8800/api/auth/login', { name, password })
  .then((response) => {
    const { data } = response;
    if (data && data.user && data.token) {
      const { user, token } = data; // Extract the user and token from the response data
      const { role } = user; // Extract the role from the user object
      const { _id } = user; // Extract the user ID from the user object

      console.log('Role received:', role); // Log the role received from the backend

      localStorage.setItem('token', token); // Store the token in localStorage
      localStorage.setItem('role', role); // Store the user role in localStorage
      localStorage.setItem('_id', _id); // Store the user ID in localStorage

      if (role === 'admin') {
        navigate('/admin/users');
      } else {
        navigate('/home');
      }
    }
  })
  .catch((error) => {
    console.error('Login failed:', error.response ? error.response.data.message : error.message);
    toast.error('Wrong username or password!')
  });
    }
  
    return (
      
      <div className="signup-container d-flex justify-content-center align-items-center vh-100">
        <ToastContainer />
          <div className="w-40 p-5 rounded border text-center">
              <h2>Login</h2>
              <form className="signup-form" onSubmit={handleSubmit}>
                  <div className="mb-3">
                      <label htmlFor="name" className="form-label">Name:</label>
                      <input
                          type="text"
                          className="form-control"
                          id="name"
                          required
                          onChange={(e) => setName(e.target.value)}
                      />
                  </div>
                  <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password:</label>
                      <input
                          type="password"
                          className="form-control"
                          id="password"
                          required
                          onChange={(e) => setPassword(e.target.value)}
                      />
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
              </form>
              <p className="mt-3">
                  Don't have an account? <Link to="/register">Register</Link>
              </p>
          </div>
      </div>
  );
}

export default Login;