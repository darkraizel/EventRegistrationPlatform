import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../navbar";

function Edit() {
    const { _id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({
        eventName: '',
        description: '',
        location: '',
        date: '',
        organizer: ''
    });
    const [values, setValues] = useState({
        eventName: '',
        description: '',
        location: '',
        date: ''
    });
    const [loading, setLoading] = useState(true); 
    const [authorized, setAuthorized] = useState(false); 

    useEffect(() => {
        axios.get(`http://localhost:8800/api/event/${_id}`)
            .then(res => {
                setData(res.data);
                setValues(res.data);
                setLoading(false); // Set loading to false when data is fetched

                const isOrganizer = res.data.organizer === localStorage.getItem('_id'); 
                const isAdmin = localStorage.getItem('role') === 'admin';

                if (isOrganizer || isAdmin) {
                    setAuthorized(true); 
                }
            })
            .catch(err => {
                console.log(err);
                setLoading(false); 
            });
    }, [_id]);

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8800/api/event/${_id}`, values)
            .then(res => {
                console.log(res);
                navigate('/home');
            })
            .catch(err => console.log(err));
    };
    

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!authorized) {
        return <div>You are not authorized to access this page.</div>;
    }

    return (
        <div>
        <Navbar />
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
            <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
                <h1>Edit Event</h1>
                <form onSubmit={handleUpdate}>
                    <div className='mb-2'>
                        <label htmlFor="eventName">Event Name</label>
                        <input
                            type="text"
                            name="eventName"
                            id="eventName"
                            className='form-control'
                            value={values.eventName}
                            onChange={e => setValues({ ...values, eventName: e.target.value })}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            className='form-control'
                            value={values.description}
                            onChange={e => setValues({ ...values, description: e.target.value })}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="location">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            className='form-control'
                            value={values.location}
                            onChange={e => setValues({ ...values, location: e.target.value })}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            className='form-control'
                            value={formatDate(values.date)}
                            onChange={e => setValues({ ...values, date: e.target.value })}
                        />
                    </div>
                    <button className='btn btn-success'>Update</button>
                    <Link to={'/home'} className='btn btn-primary ms-3'>Back</Link>
                </form>
            </div>
        </div>
        </div>
    );
}

export default Edit;