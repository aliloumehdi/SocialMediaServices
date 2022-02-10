var express = require('express');
var router = express.Router();
var userController=require('../controllers/user.controller')

router.get('/',  userController.getAllUsers);
router.get('/:id',  userController.getUserInfo);
router.put('/update/bio/:id',  userController.updateBio);
router.delete('/delete/:id',  userController.deleteAccount);
router.patch('/follow/:id',userController.follow);
router.patch('/unfollow/:id',userController.unfollow);



module.exports = router;
