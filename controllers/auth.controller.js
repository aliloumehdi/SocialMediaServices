const UserModel = require("../models/User.model")



exports.signUp=async (req,res)=>{
const {username,email,password}=req.body
try {
    const user=await UserModel.create({username,email,password});
    res.status(200).json({user:user._id})
} catch (error) {
    console.log(error);
    res.status(401);
}
}