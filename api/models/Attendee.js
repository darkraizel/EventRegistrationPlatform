import mongoose from 'mongoose';

const AttendeeSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    
    attendee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});
export default mongoose.model("Attendee", AttendeeSchema)