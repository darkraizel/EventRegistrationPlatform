import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../navbar";

function Read() {
    const [data, setData] = useState({});
    const [attendees, setAttendees] = useState([]);
    const [organizerName, setOrganizerName] = useState('');
    const [organizerId, setOrganizerId] = useState('');
    const { _id } = useParams();
    const loggedInUserId = localStorage.getItem('_id');
    const [isAdmin, setIsAdmin] = useState(false);
    //effect for admin role and organizer
    useEffect(() => {
        if (data.organizer) {
            setOrganizerId(data.organizer);
        }
        const role = localStorage.getItem('role');
        setIsAdmin(role === 'admin');

    }, [data.organizer]);

    useEffect(() => {
        axios.get(`http://localhost:8800/api/event/` + _id)
            .then(res => setData(res.data))
            .catch(error => console.error('Error fetching event details:', error));

        axios.get(`http://localhost:8800/api/event/${_id}/attendees`)
            .then(res => setAttendees(res.data))
            .catch(error => console.error('Error fetching attendees:', error));
    }, [_id]);

    useEffect(() => {
        if (data.organizer) {
            axios.get(`http://localhost:8800/api/user/` + data.organizer)
                .then(res => setOrganizerName(res.data.name))
                .catch(error => console.error('Error fetching organizer details:', error));
        }
    }, [data.organizer]);

    const handleAttendEvent = async () => {
        try {
            const token = localStorage.getItem('token'); 
            if (!token) {
                console.error('Error attending event: Token not found in local storage');
                return;
            }
        
            await axios.post(`http://localhost:8800/api/event/${_id}/register`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            toast.success("Registered successfully!");

            axios.get(`http://localhost:8800/api/event/${_id}/attendees`)
                .then(res => setAttendees(res.data))
                .catch(error => console.error('Error refreshing attendees:', error));
        } catch (error) {
            console.error('Error attending event:', error.response ? error.response.data.message : error.message);
            toast.error("You have already been registered to this event!");
        }
    };
      
    const handleUnsubscribe = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Error unsubscribing: Token not found in local storage');
                return;
            }

            await axios.delete(`http://localhost:8800/api/event/${_id}/deregister`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            toast.info("Unsubscribed successfully!");
            
            axios.get(`http://localhost:8800/api/event/${_id}/attendees`)
                .then(res => setAttendees(res.data))
                .catch(error => console.error('Error refreshing attendees:', error));
        } catch (error) {
            console.error('Error unsubscribing:', error.response ? error.response.data.message : error.message);
        }
    };
    const formattedDate = new Date(data.date).toLocaleDateString();

    const handleDeleteAttendee = async (attendeeId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Error deleting attendee: Token not found in local storage');
                return;
            }
    
            await axios.delete(`http://localhost:8800/api/event/${_id}/attendees/${attendeeId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            toast.info("Attendee deleted successfully!");
    
            axios.get(`http://localhost:8800/api/event/${_id}/attendees`)
                .then(res => setAttendees(res.data))
                .catch(error => console.error('Error refreshing attendees:', error));
        } catch (error) {
            console.error('Error deleting attendee:', error.response ? error.response.data.message : error.message);
            toast.error("Failed to delete attendee!");
        }
    };

    return (
        <div>
            <ToastContainer />
            <Navbar />
            <div className='d-flex w-60 vh-100 justify-content-center align-items-center bg-light'>
                <div  className='w-40 border bg-white shadow px-5 pt-3 pb-5 rounded'>
                    <h3>Event Details</h3>
                    <div className='mb-2'>
                        <strong>Event Name: {data.eventName}</strong>
                    </div>
                    <div className='mb-2'>
                        <strong>Description: {data.description}</strong>
                    </div>
                    <div className='mb-2'>
                        <strong>Date: {formattedDate}</strong>
                    </div>
                    <div className='mb-2'>
                        <strong>Location: {data.location}</strong>
                    </div>
                    <div className='mb-2'>
                        <strong>Organizer: {organizerName}</strong>
                    </div>
                    <Link to={'/home'} className='btn btn-primary ms-3'>Back</Link>
                    <button onClick={handleAttendEvent} className='btn btn-success ms-3'>Attend</button>
                    <button onClick={handleUnsubscribe} className='btn btn-sm btn-danger ms-3'>Unsubscribe</button>
                </div>
                {(isAdmin || organizerId === loggedInUserId) && attendees.length > 0 && (
                    <div className='w-40 border bg-white shadow px-5 pt-3 pb-5 rounded ms-5'>
                        <h3>Attendees</h3>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendees.map((attendee, index) => (
                                    <tr key={index}>
                                        <td>{attendee.attendee.name}</td>
                                        <td>
                                        <button onClick={() => handleDeleteAttendee(attendee._id)} className='btn btn-sm btn-danger'>Delete</button>              
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Read;
