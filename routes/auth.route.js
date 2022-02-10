const express=require('express')
const router=express.Router()
const authController = require('../controllers/auth.controller');
/* User register */
router.post("/register", authController.signUp);


module.exports = router;