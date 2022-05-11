const userModel = require('../model/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const logInUser = async (req, res) =>{
    try {

        const {email, password} = req.body
        const findUser = await userModel.findOne({email})

        if(!findUser){
            res.json({
                status: `This user does not exist`
            })
        }else{
            const passCheck = await bcrypt.compare(password, findUser.password)
            if(!passCheck){
                res.status(500).json({
                    status: `Incorrect password or email`,
                    message: error.message
                })
            }else{
                const token = jwt.sign({
                    _id: findUser._id,
                    email: findUser.email,
                    username: findUser.username,
                    member: findUser.member,
                    pharmacy: findUser.pharmacy,
                    specialist: findUser.specialist,
                    image: findUser.image,
                }, "thisNaTh3B3stPhARmaCyInTh3wHole0A7", {expiresIn: "1d"})

                const {password, ...info} = findUser._doc
                res.status(201).json({
                    status: `Welcome ${findUser.username}`,
                    data: {token, ...info}
                })
            }
        }
        
    } catch (error) {
        res.status(500).json({
            status: `failed to login`,
            message: error.message
        })
    }
}


const getUsers = async (req, res) =>{
    try {

        const user = await userModel.find()
        res.status(200).json({
            status: `All users`,
            data: user
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const getUser = async (req, res) =>{
    try {

        const user = await userModel.findById(req.params.id)
        res.status(200).json({
            status: `one user`,
            data: user
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const deleteUser = async (req, res) =>{
    try {

        await userModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: `Deleted`
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    logInUser,
    getUser,
    getUsers,
    deleteUser
}