const mongoose = require('mongoose')
const itemModel = mongoose.Schema({
    name:{
        type: String
    },
    type:{
        type: String
    },
    price:{
        type: Number
    },
    ava:{
        type: String
    },
    avaID:{
        type: String
    },
    user: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}]
})

module.exports = mongoose.model("items", itemModel)