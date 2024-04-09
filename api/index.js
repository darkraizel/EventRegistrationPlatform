import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import eventRoute from "./routes/event.js";
import attendeeRoute from "./routes/attendee.js"



dotenv.config()

const app= express()


//connection to database
const connect = async()=>{
try{
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.")
} catch (error){
    throw error
}
}

//connection to backend server
app.listen(8800, ()=>{
    connect()
    console.log("Connected to Backend")
})


//midlewares
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        secure : 'auto',
        
    }
}))
app.use("/api/auth", authRoute,);
app.use("/api/user", userRoute);
app.use("/api/event",  eventRoute);
app.use("/api/attendee", attendeeRoute)









