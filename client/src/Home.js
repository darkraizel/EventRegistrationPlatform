import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from "./navbar";
import Sidebar from "./Admin/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function Home() {
    const [data, setData] = useState([]);
    const [userId, setUserId] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const id = localStorage.getItem('_id');
        const role = localStorage.getItem('role');
        setUserId(id);

        // Check if user is admin
        setIsAdmin(role === 'admin');

        axios.get('http://localhost:8800/api/event')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
           
    }, []);

    const handleDelete = (_id) => {
        const confirm = window.confirm("Would you like to delete the event?");
        if (confirm) {
            axios.delete(`http://localhost:8800/api/event/${_id}`)
                .then(res => {
                    setData(prevData => prevData.filter(event => event._id !== _id));
                }).catch(err => console.log(err));
                toast.info("Event deleted successfully!")

        }
    }

    return (
        <div>
          <ToastContainer />
          <Navbar />
          <div className="d-flex">
            {isAdmin && <Sidebar />} 
            <div className='d-flex flex-column justify-content-center align-items-center bg-light flex-grow-1'>
              <h1>List of Events</h1>
              <div className='w-65 rounded bg-white border shadow p-4'>
                <div className='d-flex justify-content-end'>
                  <Link to="/create" className='btn btn-success'>Add +</Link>
                </div>
                <table className='table table-striped'>
                  <thead>
                    <tr>
                      <th>Event Name</th>
                      <th>Location</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((d, i) => (
                      <tr key={i}>
                        <td>{d.eventName}</td>
                        <td>{d.location}</td>
                        <td>
                          <Link to={`/read/${d._id}`} className='btn btn-sm btn-info me-2'>View Details</Link>
                          {(isAdmin || userId === d.organizer) &&
                            <Link to={`/edit/${d._id}`} className='btn btn-sm btn-primary me-2'>Edit</Link>
                          }
                          {(isAdmin || userId === d.organizer) &&
                            <button onClick={() => handleDelete(d._id)} className='btn btn-sm btn-danger'>Delete</button>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
  }

export default Home;