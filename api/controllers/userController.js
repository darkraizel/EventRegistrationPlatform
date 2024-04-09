import User from "../models/User.js"

//UPDATE
 export const updatedUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, password, email, userType } = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, {
            name,
            password,
            email,
            userType
        }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
//DELETE
export const deleteUser = async (req,res,next)=>{
    try{
        await User.findByIdAndDelete(req.params._id);
        res.status(200).json("User has been deleted!");
       } catch (err){
    next(err);
}
}

//GET
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}
//GET ALL
export const getUsers = async (req,res,next)=>{
    try{
        const users = await User.find();
        res.status(200).json(users) 
       } catch (err){
    next(err);
}
}
