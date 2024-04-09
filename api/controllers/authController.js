
import User from "../models/User.js";
import jwt from "jsonwebtoken";




export const register = async (req,res,next)=>{
    try{
        
        const newUser = new User({
            name:req.body.name,
            password: req.body.password,
            email:req.body.email,
            
        });
        await newUser.save();
        res.status(201).send("User has been created.");

    }catch(err){
        next(err);
}
};


export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ name: req.body.name, password: req.body.password });
        if (!user) {
            return res.status(403).json({
                error: "Invalid login",
            });
        }

        let role = '';
        if (user.userType === 'admin') {
            role = 'admin';
        } else {
            role = 'user';
        }
        
        const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET);
        res.status(200).json({ user: { _id: user._id, name: user.name, role }, token });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
