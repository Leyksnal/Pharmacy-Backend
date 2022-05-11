const express = require('express')
const route = express.Router()
const cloudinary = require('../utils/cloudinary')
const { userImage } = require('../utils/multer')
const bcrypt = require('bcrypt')
const userModel = require('../model/userModel')


route.post('/register', userImage, async(req, res) =>{
    try {
        
        const {email, password, username, phone} = req.body
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)
        const cloud = await cloudinary.uploader.upload(req.file.path)

        const createUser = await userModel.create({
            email,
            password: hashed,
            username,
            phone,
            image: cloud.secure_url,
            imageID: cloud.public_id,
            member: true,
            specialist: false,
            pharmacy: false
        })

        res.status(201).json({
            status: `Member Created successfully`,
            data: createUser
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})



route.post('/register_pharmacy', userImage, async(req, res) =>{
    try {
        
        const {email, password, username, phone, address, landMark} = req.body
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)
        const cloud = await cloudinary.uploader.upload(req.file.path)

        const createUser = await userModel.create({
            email,
            password: hashed,
            username,
            phone,
            address,
            landMark,
            image: cloud.secure_url,
            imageID: cloud.public_id,
            member: false,
            specialist: false,
            pharmacy: true
        })

        res.status(201).json({
            status: `pharmacy Created successfully`,
            data: createUser
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})




route.post('/register_specialist', userImage, async(req, res) =>{
    try {
        
        const {email, password, username, phone, specialize, address} = req.body
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)
        const cloud = await cloudinary.uploader.upload(req.file.path)

        const createUser = await userModel.create({
            email,
            password: hashed,
            username,
            phone,
            address,
            specialize,
            image: cloud.secure_url,
            imageID: cloud.public_id,
            member: false,
            specialist: true,
            pharmacy: false
        })
        res.status(201).json({
            status: `Specialist Created successfully`,
            data: createUser
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})


route.patch('/:id/update', userImage, async(req, res) =>{
    try {
        
        const {email, username, phone, specialize, address, landMark} = req.body
        const cloud = await cloudinary.uploader.upload(req.file.path)

        const updateUser = await userModel.create({
            email,
            username,
            landMark,
            phone,
            address,
            specialize,
            image: cloud.secure_url,
            imageID: cloud.public_id
        }, {new : true})

        res.status(200).json({
            status: `Updated successfully`,
            data: updateUser
        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

module.exports = route