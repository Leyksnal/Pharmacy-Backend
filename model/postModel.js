const mongoose = require('mongoose')
const postModel = mongoose.Schema({
    title:{
        type: String
    },
    message:{
        type: String
    },
    avatar:{
        type: String
    },
    avatarID:{
        type: String
    },
    user: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
})

module.exports = mongoose.model("posts", postModel)