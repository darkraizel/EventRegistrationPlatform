import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function Users() {
    const [data, setData] = useState([]);

    useEffect(() => {
        
        axios.get('https://localhost:8800/api/user')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);
    const handleDelete = (_id) => {
        const confirm = window.confirm("Would you like to delete the User?");
        if (confirm) {
            axios.delete(`https://localhost:8800/api/user/${_id}`)
                .then(res => {
                    setData(prevData => prevData.filter(user => user._id !== _id));
                }).catch(err => console.log(err));
                toast.info('User deleted successfully!')
        }
    }
    return (
      
      <div className='d-flex flex-column justify-content-center align-items-center bg-light flex-grow-1 mt-4'>
        <ToastContainer/>
      <h1>List of Users</h1>
      <div className='w-65 rounded bg-white border shadow p-4' style={{ margin: '0 auto', marginBottom: '20px' }}>
        <div className='d-flex justify-content-end'>
        </div>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Password</th>
              <th>Email</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td>{d._id}</td>
                <td>{d.name}</td>
                <td>{d.password}</td>
                <td>{d.email}</td>
                <td>{d.userType}</td>
                <td>
                  <Link to={`userEdit/${d._id}`} className='btn btn-sm btn-primary me-2'>Edit</Link>
                  <button onClick={() => handleDelete(d._id)} className='btn btn-sm btn-danger'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
       
      );
  }
  export default Users;