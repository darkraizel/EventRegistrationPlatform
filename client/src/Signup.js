import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:8800/api/auth/register', {name, email, password})
        .then(result => {
            console.log(result)
            navigate('/login')
        })
        .catch(err => console.log(err))
    }
    return (
      <div className="container mt-5 ">
          <div className="row justify-content-center">
              <div className="col-md-4">
                  <div className="card">
                      <div className="card-header text-center">
                          <h2>Register</h2>
                      </div>
                      <div className="card-body">
                          <form className="signup-form" onSubmit={handleSubmit}>
                              <div className="mb-2">
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
                                  <label htmlFor="email" className="form-label">Email:</label>
                                  <input
                                      type="email"
                                      className="form-control"
                                      id="email"
                                      name="email"
                                      onChange={(e) => setEmail(e.target.value)}
                                  />
                              </div>
                              <div className="mb-3">
                                  <label htmlFor="password" className="form-label">Password:</label>
                                  <input
                                      type="password"
                                      className="form-control"
                                      id="password"
                                      name="password"
                                      onChange={(e) => setPassword(e.target.value)}
                                  />
                              </div>
                              <div className="text-center">
                                  <button type="submit" className="btn btn-primary">Submit</button>
                              </div>
                          </form>
                          <p className="mt-3 text-center">
                              Already have an Account? <Link to="/login">Login</Link>
                          </p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );

}

export default Signup;