
import express from "express";
import {createEvent, updateEvent, deleteEvent, getEventById, getAllEvents, eventRegister , eventDeregister,  getEachAttendee, deleteAttendee } from "../controllers/eventController.js";
import verifyToken from '../authMiddleware/authJWT.js';


const router = express.Router();

//Create
router.post("/", verifyToken, createEvent);


//Edit
router.put("/:eventId",  updateEvent);

//Delete
router.delete("/:eventId", deleteEvent);

//GET
router.get("/:eventId", getEventById);

//Get All
router.get("/", getAllEvents);

//attendee
router.post("/:eventId/register", verifyToken , eventRegister )

//attendees for event
router.get('/:eventId/attendees', getEachAttendee);

//deregister/unsubscribe from an event
router.delete('/:eventId/deregister', verifyToken,  eventDeregister)

//oganizer who can delete attendees for each event
router.delete('/:eventId/attendees/:attendeeId', deleteAttendee);



export default router;


