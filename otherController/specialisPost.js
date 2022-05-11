const express = require('express')
const route = express.Router()
const cloudinary = require('../utils/cloudinary')
const { postImage } = require('../utils/multer')
const userModel = require('../model/userModel')
const postModel = require('../model/postModel')
const verify = require('../utils/auth')


route.post('/:id/specialistpost', verify, postImage, async (req, res) =>{
    try {

        if(req.user.specialist === true){
            const {title, message}  = req.body
            const cloud = await cloudinary.uploader.upload(req.file.path)
            const getUser = await userModel.findById(req.params.id)
            const post = new postModel({
                title,
                message,
                avatar: cloud.secure_url,
                avatarID: public_id
            })

            post.user = getUser
            post.save()

            getUser.post.push(post)
            getUser.save()

            res.status(201).json({
                status: `posted`,
                data: post
            })
        } else{
            res.status(404).json({
                message: `Not eligible to post`
            })
        }
        
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})


route.get('/:id/allspecialistpost', async (req, res) =>{
    try {
            const userPost = await userModel.findById(req.params.id).populate('post')

            res.status(201).json({
                status: `All post`,
                data: userPost
            })
        
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})



route.get('/:id/specialistpost/:postId', async (req, res) =>{
    try {
            const users = await postModel.findById(req.params.postId).populate('user')

            res.status(201).json({
                status: `users`,
                data: users
            })
        
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})


route.patch('/:id/specialistpost/:postId/updatepost', verify, postImage, async (req, res) =>{
    try {

        if(req.user.specialist === true){

            const check = await postModel.findById(req.params.postId)

            if(!check){
                res.status(404).json({
                    message: `Not eligible`
                })
            } else{
                const {title, message}  = req.body
                await cloudinary.uploader.destroy(check.avatarID)
                const cloud = await cloudinary.uploader.upload(req.file.path)
                const getUser = await postModel.findByIdAndUpdate(req.params.postId, {
                    title,
                    message,
                    avatar: cloud.secure_url,
                    avatarID: public_id
                }, {new:true})

                res.status(201).json({
                    status: `updated`,
                    data: getUser
                })
            }

            post.user = getUser
            post.save()

            getUser.post.push(post)
            getUser.save()

            
        } else{
            res.json({
                message: error.message
            })
        }
        
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})


route.delete('/:id/specialistpost/:postId', async (req, res) =>{
    try {
        if(req.user.specialist === true){
            const poster = await userModel.findById(req.params.id)
            const deletePost = await userModel.findByIdAndDelete(req.params.postId)

            poster.post.pull(deletePost)
            poster.save()

            res.status(201).json({
                status: `deleted`,
                data: poster
            })
        } else{
            res.status(404).json({
                message: `Not eligible to delete`
            })
        }
        
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

module.exports = route