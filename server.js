require('./utils/config/db.')
const express = require('express')
const cors = require('cors')
port = 6666
const app = express()
app.use(express.json())
app.use(cors())

app.use('/user', require('./route/userRoute'))
app.use('/user', require('./otherController/userPost'))
app.use('/specialist', require('./otherController/specialisPost'))

app.get('/', (req, res)=>{
    res.json({
        message: `This is pharmacy API endpoint`
    })
})

app.listen(port, () =>{
    console.log(`running on ${port}`)
})