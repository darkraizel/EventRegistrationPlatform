import express from "express";
import {eventRegister , eventDeregister, getEventAttendees, deleteAttendee } from "../controllers/eventController.js";
import verifyToken from '../authMiddleware/authJWT.js';

const router = express.Router();

//attendee create
router.post("/:eventId/register", verifyToken, eventRegister )

//attendee get all
router.get("/",  getEventAttendees);

router.delete("/:attendeeId", deleteAttendee)


export default router