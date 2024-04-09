import React,  { useState } from   "react";
import { Link , useNavigate } from 'react-router-dom'
import axios from 'axios';
import Navbar from "../navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





function Create() {
    const [values, setValues] = useState({
        eventName: '',
        description: '',
        location: '',
        date: ''
    });
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8800/api/event', values, {
            headers: {
                'Authorization': `Bearer ${token}` 
            } 
        })
        .then(res => {
            console.log(res.data);
            setTimeout(() => {
                navigate('/home');
            }, 1500); 
            toast.success("Event created Successfully!");
        })
        .catch(err => {
            console.error("Error creating event:", err);
            toast.error("Error creating event. Please fill out the form!");
        });
    };

    return(
        <div>
            <ToastContainer/>
            <Navbar />
        
          
     <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
        <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
            <h1>Create Event</h1>
       
        <form onSubmit={handleSubmit}>
            <div className='mb-2'>
                <label htmlFor="eventName">Event Name</label>
                <input type="text" name="eventName" className='form-control'
                onChange={e => setValues({...values, eventName: e.target.value})}></input>
                
            </div>
            <div className='mb-2'>
                <label htmlFor="description">Description</label>
                <textarea type="textarea" name="description" className='form-control'
                onChange={e => setValues({...values, description: e.target.value})}></textarea>
            </div>
            <div className='mb-2'>
                <label htmlFor="location">Location</label>
                <input type="text" name="location" className='form-control'
                onChange={e => setValues({...values, location: e.target.value})}></input>
            </div>
            <div className='mb-2'>
                <label htmlFor="date">Date</label>
                <input type="date" name="date" className='form-control'
                onChange={e => setValues({...values, date: e.target.value})}></input>
            </div>
            <button className='btn btn-success'>Create</button>
            <Link to="/home" className="btn btn-primary ms-3">Back</Link>
        </form>
        </div>

     </div>
        
     </div>
    
    );

}
export default Create;