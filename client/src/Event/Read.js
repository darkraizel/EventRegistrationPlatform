import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../navbar";

function Read() {
    
    const [data, setData] = useState([]);
    const { _id } = useParams();
    const {eventId} = useParams();
    const navigate = useNavigate();
   

    useEffect(() => {
        axios.get(`http://localhost:8800/api/event/` + _id)
            .then(res => setData(res.data));
    }, [_id]);

    
    const handleAttendEvent = async (eventId) => {
      try {
        const token = localStorage.getItem('token'); 
        if (!token) {
          console.error('Error attending event: Token not found in local storage');
          return;
        }
    
        const response = await axios.post(`http://localhost:8800/api/event/${_id}/register`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data);
        navigate("/home")
        
      } catch (error) {
        console.error('Error attending event:', error.response ? error.response.data.message : error.message);
      }
    };

    return (
      <div>
      <Navbar />
        <div className='d-flex w-60 vh-100 justify-content-center align-items-center bg-light'>
            <div className='w-40 border bg-white shadow px-5 pt-3 pb-5 rounded'>
                <h3>Event Details</h3>
                <div className='mb-2'>
                    <strong>Event Name: {data.eventName}</strong>
                </div>
                <div className='mb-2'>
                    <strong>Description: {data.description}</strong>
                </div>
                <div className='mb-2'>
                    <strong>Date: {data.date}</strong>
                </div>
                <div className='mb-2'>
                    <strong>Location: {data.location}</strong>
                </div>
                <div className='mb-2'>
                    <strong>Organizer: {data.organizer} </strong>
                </div>
                <Link to={'/home'} className='btn btn-primary ms-3'>Back</Link>
                <button onClick={() => handleAttendEvent(eventId)} className='btn btn-success ms-3'>Attend</button>
        </div>
        </div>
        </div>
    );
}

export default Read;