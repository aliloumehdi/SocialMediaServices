const UserModel = require("../models/User.model")
const ObjectId = require('mongoose').Types.ObjectId


exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find()
        console.log(users);
        res.status(200).json(users)
    } catch (error) {
        res.status(400)
    }
}
exports.getUserInfo = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`Id unknown : ${req.params.id}`)
    // const user = await
    UserModel.findById(req.params.id).then((docs)=>{
        console.log(docs);
        if(docs)
return res.status(200).json(docs)

return res.status(404).send({message: 'Not found'})

    }).catch((err)=>{
        res.status(500).json(err)
    })
   
}
exports.updateBio = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true } 
     
    ).then((docs)=>{
        return res.send(docs);
       
    }).catch((err)=>{
        return res.status(500).send({ messages: err })
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
exports.deleteAccount=async (req,res)=>{
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
    try {
        await UserModel.deleteOne({_id:req.params.id}) 
        
        res.status(200).json({message:"Deleted"})
    } catch (error) {
        res.status(500).json({message:error})
        
    }
}

exports.follow=async (req,res)=>{
    if (!ObjectId.isValid(req.params.id) ||
    !ObjectId.isValid(req.body.idToFollow))
    return res.status(400).send("ID unknown : " + req.params.id);
    try {
        // ADD to current user following list
        await UserModel.findByIdAndUpdate(req.params.id,{ $addToSet: { following: req.body.idToFollow } }).then((doc)=>{
              res.status(200).json(doc);
        }).catch(error=>{
            
            res.status(500).json({message:error})
        
          })
          // ADD to current user followers list
    await UserModel.findByIdAndUpdate(req.body.idToFollow,{ $addToSet: { followers: req.params.id } }).then((doc)=>{
        // res.status(200).json(docs);
  }).catch(error=>{
    res.status(404).json({message:error})

  })
    } catch (error) {
        res.status(401).json({message:error})
        
    }
}

exports.unfollow=async (req,res)=>{
    if (!ObjectId.isValid(req.params.id) ||
    !ObjectId.isValid(req.body.idToUnfollow))
    return res.status(400).send("ID unknown : " + req.params.id);
    try {
    //    remove from following
    await UserModel.findByIdAndUpdate(req.params.id,{
        $pull:{following:req.body.idToUnfollow}
    }).then((doc)=>{
        console.log("removed from following list")
        res.status(200).json(doc);
    }).catch(error=>{
        console.error(error);
    })
     //    remove from followers
    await UserModel.findByIdAndUpdate(req.body.idToUnfollow,{
        $pull:{followers:req.params.id}
    }).then(doc=>{
        console.log("removed from following list")
    }).catch(error=>{
        console.error(error);
    })
    } catch (error) {
        res.status(500).json({message:error})
        
    }
}
























// module.exports.deleteUser = async (req, res) => {
//   if (!ObjectId.isValid(req.params.id))
//     return res.status(400).send("ID unknown : " + req.params.id);

//   try {
//     await UserModel.remove({ _id: req.params.id }).exec();
//     res.status(200).json({ message: "Successfully deleted. " });
//   } catch (err) {
//     return res.status(500).json({ message: err });
//   }
// };