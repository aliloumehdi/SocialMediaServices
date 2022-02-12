const UserModel = require("../models/User.model")
const jwt=require('jsonwebtoken')
const maxAge=3*24*60*60*1000
const createToken=(id)=>{
    return jwt.sign({id},process.env.TOKEN_SECRET,{
        expiresIn:maxAge 
         
    })
}


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
exports.signIn=async(req,res)=>{
const{email,password}=req.body
try {
  const user=await  UserModel.login(email,password)
  const token=createToken(user._id)
  res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge})
  res.status(200).json({user:user._id})
} catch (error) {
     console.error(error);
} 
}

exports.logout=async (req,res)=>{
res.cookie('jwt','',{maxAge:1});
res.redirect('/')
}