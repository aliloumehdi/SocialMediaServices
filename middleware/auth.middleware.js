const jwt = require('jsonwebtoken')
const UserModel = require('../models/User.model')


exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) { 
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            console.log(err)
            if (err) {
 

                res.locals.user = null;
                res.cookies('jwt', '', { maxAge: 1 })
                next()
            }
            
            else {
                console.log(res.locals)
                let user = await UserModel.findById(decodedToken.id);
                // console.log(decodedToken.id)
                res.locals.user=user;
               console.log("heeeeeeeeeere",res.locals.user);
                next()
            }
        })
    } 
    else {
        res.locals.user = null; 
        res.status(401).send({message:"You must be logged in"})

        //  next()
    }
}
exports.requireAuth=(req,res,next)=>{
    
    const token = req.cookies.jwt
    if (token) {

        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            
            if (err) {
                console.log(err)
            }
            else {
                console.log(decodedToken.id)
                next();
            }
        })
    }
    else{
        console.log("No auth")
        
    }
}