
import express from "express";
import {createEvent, updateEvent, deleteEvent, getEventById, getAllEvents, eventRegister , eventDeregister,  getEachAttendee } from "../controllers/eventController.js";
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

router.delete('/:eventId/deregister', verifyToken,  eventDeregister)



export default router;


