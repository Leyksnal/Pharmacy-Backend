const mongoose = require('mongoose')
const url = "mongodb://localhost/pharmacy"

mongoose.connect(url).then(()=>{
    console.log(`Success`);
}).catch((error)=>{
    console.log(`failed`, error.message)
})