const jwt = require('jsonwebtoken')

const verification = (req, res, next) =>{
    try {
        const checkAuth = req.headers.authorization
        if(checkAuth){
            const token = checkAuth.split(" ")[1]
            if(token){
                jwt.verify(token, "thisNaTh3B3stPhARmaCyInTh3wHole0A7", (err, payload)=>{
                    if(err){
                        res.status(500).json({
                            message: err.message
                        })
                    } else {
                        req.user = payload
                        next()
                    }
                })
            } else {
                res.status(500).json({
                    message: `Token is not valid`
                })
            }
        } else{
            res.status(500).json({
                message: `Access cannot be granted`
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports = verification