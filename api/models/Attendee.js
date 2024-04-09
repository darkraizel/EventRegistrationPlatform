import mongoose from 'mongoose';

const AttendeeSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    eventName: String,
    
    attendee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    attendeeName:String
});
export default mongoose.model("Attendee", AttendeeSchema)