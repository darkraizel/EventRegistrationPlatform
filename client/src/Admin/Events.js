import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

function Events(){

    const [data, setData] = useState([]);



    useEffect(() => {



        axios.get('https://localhost:8800/api/event')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (_id) => {
        const confirm = window.confirm("Would you like to delete the event?");
        if (confirm) {
            axios.delete(`https://localhost:8800/api/event/${_id}`)
                .then(res => {
                    setData(prevData => prevData.filter(event => event._id !== _id));
                }).catch(err => console.log(err));
        }
    }
    return (
        <div>
          <div className="d-flex">
            <div className='d-flex flex-column justify-content-center align-items-center bg-light flex-grow-1'>
              <h1>List of Events</h1>
              <div className='w-65 rounded bg-white border shadow p-4'>
                <div className='d-flex justify-content-end'>
                  <Link to="/create" className='btn btn-success'>Add +</Link>
                </div>
                <table className='table table-striped'>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Event Name</th>
                      <th>Location</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((d, i) => (
                      <tr key={i}>
                        <td>{d._id}</td>
                        <td>{d.eventName}</td>
                        <td>{d.location}</td>
                        <td>
                          <Link to={`/edit/${d._id}`} className='btn btn-sm btn-primary me-2'>Edit</Link>                   
                            <button onClick={() => handleDelete(d._id)} className='btn btn-sm btn-danger'>Delete</button>
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
export default Events