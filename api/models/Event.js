import mongoose from 'mongoose';
const EventSchema = new mongoose.Schema({
    eventName:{
        type: String,
        required:"Event Name is required!"
    },
    description:{
        type:String,
        required:"Description information is required!"
    },
    date:{
        type: Date,
        required:"Please choose the event date!"
    },
    location:{
        type: String,
        required:"Please put the event location!"
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        
    }

   
   
    
    
    
    });
    export default mongoose.model("Event", EventSchema)