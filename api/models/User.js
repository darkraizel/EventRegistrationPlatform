import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
name:{
    type: String,
    required:"Username is required!",
    unique:"true"
},
password:{
    type:String,
    required:"Password is required!"
},
email:{
type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
},
userType:{
    type: String,
    default: "user"
},



});
export default mongoose.model("User", UserSchema)