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
                res.locals.user=user;
               
                next()
            }
        })
    }
    else {
        res.locals.user = null;
        // throw Error('Authorized')
        next()
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