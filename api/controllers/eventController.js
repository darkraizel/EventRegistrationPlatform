import Event from '../models/Event.js';
import Attendee from  '../models/Attendee.js'

// Create a new event
const createEvent = async (req, res) => {
    try {
        const { eventName, description, date, location } = req.body;
        const organizerId = req.userId; // Access organizer's ID from the token
        const event = new Event({
            eventName,
            description,
            date,
            location,
            organizer: organizerId // Associate the organizer's ID with the event
        });
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update an existing event
const updateEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { eventName, description, location, date } = req.body;
        const updatedEvent = await Event.findByIdAndUpdate(eventId, {
            eventName,
            description,
            location,
            date
        }, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(updatedEvent);
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete an event
const deleteEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const deletedEvent = await Event.findByIdAndDelete(eventId);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get an event by ID
const getEventById = async (req, res) => {
    try {
        const { eventId } = req.params;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        console.error('Error getting event by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all events
const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        console.error('Error getting all events:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


//register for an event
const eventRegister = async (req, res) => {
  try {
    const { eventId } = req.params; 
    const userId = req.userId; 
    console.log("User ID:", userId); // Log user ID for troubleshooting
    
    const existingAttendee = await Attendee.findOne({ event: eventId, attendee: userId });
    if (existingAttendee)
      return res.status(400).json({ message: "You are already registered for this event." });

    // Create a new attendance record
    await Attendee.create({ event: eventId, attendee: userId });

    return res.status(201).json({ message: "Registration successful." });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//Get attendees for each event
const getEachAttendee = async (req, res) => {
    const eventId = req.params.eventId; // Assuming eventId is the parameter name in your route
    try {
        // Find attendees based on the event ID
        const attendees = await Attendee.find({ event: eventId }).populate('attendee');
        res.json(attendees);
    } catch (error) {
        console.error('Error getting event attendees:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
//Deregister for an event

const eventDeregister = async(req,res) =>{
    try {
        const { eventId } = req.params; 
        const userId = req.userId; 
        console.log("User ID:", userId); // Log user ID for troubleshooting
        
        const existingAttendee = await Attendee.findOne({ event: eventId, attendee: userId });
    
        if (existingAttendee) {
          // Attendee is already registered, so remove the attendance record
          await Attendee.findOneAndDelete({ event: eventId, attendee: userId });
          return res.status(200).json({ message: "Deregistration successful." });
        }
    }catch (err) {
        return res.status(500).json({ message: err.message });
      }
    };

//Get attendees for all events
const getEventAttendees = async (req, res) => {
    try {
        const attendees = await Attendee.find()
            .populate('attendee', 'name') // Populate attendee field with name from User collection
            .populate('event', 'eventName'); // Populate event field with eventName from Event collection
        res.json(attendees);
    } catch (error) {
        console.error('Error getting event attendees:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteAttendee = async (req, res) => {
    try {
        const { attendeeId } = req.params;
        const deletedAttendee = await Attendee.findByIdAndDelete(attendeeId);
        if (!deletedAttendee) {
            return res.status(404).json({ message: 'Attendee not found' });
        }
        res.json({ message: 'Attendee deleted successfully' });
    } catch (error) {
        console.error('Error deleting Attendee:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};






export { createEvent, updateEvent, deleteEvent, getEventById, getAllEvents, eventRegister, eventDeregister, getEventAttendees,deleteAttendee, getEachAttendee };