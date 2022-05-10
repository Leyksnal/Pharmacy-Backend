const mongoose = require('mongoose')
const reviewModel = mongoose.Schema({
    message:{
        type: String
    },
    user: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}]
})

module.exports = mongoose.model("reviews", reviewModel)