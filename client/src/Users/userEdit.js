import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function UserEdit() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: '', // Default value for name
        password: '', // Default value for password
        email: '', // Default value for email
        userType: '', // Default value for userType
    });


    useEffect(() => {
        axios.get(`http://localhost:8800/api/user/${userId}`)
            .then(res => {
                if (res.data) {
                    setValues(res.data); // Update values state with fetched data
                } else {
                    console.log("User data not found");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, [userId]);
    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8800/api/user/${userId}`, values)
            .then(res => {
                console.log(res);
                setTimeout(() => {
                    navigate('/admin/users');
                }, 1500); 
                toast.success("User updated Successfully!");
            })
            .catch(err => console.log(err));
    };
    
    return (
        
        <div className='vh-150 d-flex justify-content-center align-items-center'>
            <ToastContainer/>
    <div className='w-100 w-md-75 border bg-white shadow px-5 py-4 rounded'>
        <h1 className="mb-4">Edit User</h1>
        <form onSubmit={handleUpdate}>
            <div className='mb-3'>
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className='form-control'
                    autoComplete="name"
                    value={values.name}
                    onChange={e => setValues({ ...values, name: e.target.value })}
                />
            </div>
            <div className='mb-3'>
                <label htmlFor="password" className="form-label">Password</label>
                <textarea
                    name="password"
                    id="password"
                    className='form-control'
                    autoComplete="password"
                    value={values.password}
                    onChange={e => setValues({ ...values, password: e.target.value })}
                />
            </div>
            <div className='mb-3'>
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    autoComplete="email"
                    className='form-control'
                    value={values.email}
                    onChange={e => setValues({ ...values, email: e.target.value })}
                />
            </div>
            <div className='mb-3'>
                <label htmlFor="userType" className="form-label">User Type</label>
                <select
                    id="userType"
                    name="userType"
                    className='form-control'
                    value={values.userType}
                    onChange={e => setValues({ ...values, userType: e.target.value })}
                >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
</select>
            </div>
            <div className='d-flex justify-content-between'>
                <button className='btn btn-success'>Update</button>
                <Link to={'/admin/users'} className='btn btn-primary'>Back</Link>
            </div>
        </form>
    </div>
</div>
    );
};


export default UserEdit;