const mongoose = require('mongoose')
const userModel = mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String
    },
    specialize:{
        type: String
    },
    address:{
        type: String
    },
    phone:{
        type: Number,
        unique: true
    },
    landMark:{
        type: String
    },
    image:{
        type: String
    },
    imageID:{
        type: String
    },
    member:{
        type: Boolean
    },
    pharmacy:{
        type: Boolean
    },
    specialist:{
        type: Boolean
    },
    item: [{type: mongoose.Schema.Types.ObjectId, ref: 'items'}],
    post: [{type: mongoose.Schema.Types.ObjectId, ref: 'posts'}],
    review: [{type: mongoose.Schema.Types.ObjectId, ref: 'reviews'}],
    rating: [{type: mongoose.Schema.Types.ObjectId, ref: 'ratings'}]
}, {timestamp: true})

module.exports = mongoose.model("users", userModel)