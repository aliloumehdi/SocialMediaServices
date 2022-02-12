const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')
const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 55,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: [isEmail],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        minlength: 6
    },
    picture: {
        type: String,
        default: "./uploads/profil/random-user.png"
    },
    bio: {
        type: String,
        max: 1024,
    },
    followers: {
        type: [String]
    },
    following: {
        type: [String]
    },
    likes: {
        type: [String]
    }
},
    {
        timestamps: true,
    })
// Trigger before save
schema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})
schema.statics.login = async function (email, pw) {
    const salt = await bcrypt.genSalt();
    // const pass=await bcrypt.hash()
    const u = await this.findOne({ email: email })
    if (u) {
        if (bcrypt.compareSync(pw, u.password)) {
            return u
        }
        throw Error('Invalid Password')
    }
    throw Error('Invalid Email')

    // console.log("Compaaaaaaaaare"+bcrypt.compareSync(pw,u.password));
    // this.password=await bcrypt.hash(this.password,salt);
    // next();
}
const UserModel = mongoose.model("user", schema);
schema.set('toJSON', {
    transform: function (doc, ret, options) {
        delete ret.password;
        return ret;
    }
});

module.exports = UserModel;