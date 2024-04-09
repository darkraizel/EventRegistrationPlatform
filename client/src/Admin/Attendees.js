import React, { useEffect, useState } from "react";
import axios from 'axios';

function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        
        axios.get('http://localhost:8800/api/attendee')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (_id) => {
        const confirm = window.confirm("Would you like to delete the attendee?");
        if (confirm) {
            axios.delete(`http://localhost:8800/api/attendee/${_id}`)
                .then(res => {
                    setData(prevData => prevData.filter(attendee => attendee._id !== _id));
                }).catch(err => console.log(err));
        }
    }

    return (
        <div>
          <div className="d-flex">
            <div className='d-flex flex-column justify-content-center align-items-center bg-light flex-grow-1'>
              <h1>Attendees</h1>
              <div className='w-65 rounded bg-white border shadow p-4'>
                <div className='d-flex justify-content-end'>
                </div>
                <table className='table table-striped'>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>User Id</th>
                      <th>Event Id</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((d, i) => (
                      <tr key={i}>
                        <td>{d._id}</td>
                        <td>{d.attendee}</td>
                        <td>{d.event}</td>
                        <td>
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

export default Home;