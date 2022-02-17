const PostModel = require("../models/Post.model")
const UserModel = require("../models/User.model")
const ObjectId = require('mongoose').Types.ObjectId

exports.readPost = (req, res) => {
    PostModel.find().then(docs => {
        res.send(docs)
    }).catch(err => {
        console.log({ 'ERR': err });
        res.send(err)

    })
}
exports.createPost = async (req, res) => {

    const post = new PostModel({
        posterId: res.locals.user._id,
        message: req.body.message,
        video: req.body.video,
        likers: [],
        comment: []
    })
    try {
        const createdPost = await PostModel.create(post)
        return res.status(201).json(createdPost)
    } catch (error) {
        console.log(error);
        return res.status(400).send(error)

    }

}
exports.updatePost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
    const resp = await PostModel.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            message: req.body.message,
            video: req.body.video
        }

    }, { new: true, upsert: true, setDefaultsOnInsert: true }
    )
    res.status(200).json(resp)

}
exports.deletePost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
    try {
        await PostModel.deleteOne({ _id: req.params.id })

        res.status(200).json({ message: "Deleted" })
    } catch (error) {
        res.status(400).json(error)

    }

}
exports.unlikePost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
    try {
        await PostModel.findByIdAndUpdate({ _id: req.params.id }, {
            $pull: { likers: res.locals.user._id }
        }, { new: true, upsert: true, setDefaultsOnInsert: true }).then(doc => {
            console.log(doc);
            res.status(200).json({ message: "unliked !" })

        })
        await UserModel.findByIdAndUpdate(
            req.body.id,
            {
              $pull: { likes: req.params.id },
            },
            { new: true } 
          );

    } catch (error) {
        console.log(error);
        res.status(400).json(error)

    }
}
exports.likePost = async (req, res) => {

    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);
    try {
        await PostModel.findByIdAndUpdate({ _id: req.params.id }, {
            $addToSet: { likers: res.locals.user._id }
        }, { new: true, upsert: true, setDefaultsOnInsert: true }).then(doc => {
            
            res.status(200).json({ message: "Liked !" })

        })
        await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { likes: req.params.id },
            },
            { new: true } 
          );

    } catch (error) {
        console.log(error);
        res.status(400).json(error)

    }
}