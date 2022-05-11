const express = require('express')
const route = express.Router()
const cloudinary = require('../utils/cloudinary')
const { itemimage } = require('../utils/multer')
const userModel = require('../model/userModel')
const itemModel = require('../model/itemModel')
const verify = require('../utils/auth')


route.post('/:id/pharmacypost', verify, itemimage, async (req, res) =>{
    try {

        if(req.user.pharmacy === true){
            const {name, type, price}  = req.body
            const cloud = await cloudinary.uploader.upload(req.file.path)
            const getUser = await userModel.findById(req.params.id)
            const drug = new itemModel({
                name,
                type,
                price,
                ava: cloud.secure_url,
                avaID: cloud.public_id
            })

            drug.user = getUser
            drug.save()

            getUser.item.push(drug)
            getUser.save()

            res.status(201).json({
                status: `posted`,
                data: drug
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


route.get('/:id/allpharmacypost', async (req, res) =>{
    try {
            const userPost = await userModel.findById(req.params.id).populate('item')

            res.status(201).json({
                status: `All items`,
                data: userPost
            })
        
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})



route.get('/:id/pharmacypost/:itemId', async (req, res) =>{
    try {
            const users = await itemModel.findById(req.params.itemId).populate('pharmacy')

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


route.patch('/:id/pharmacypost/:itemId/updateitem', verify, itemimage, async (req, res) =>{
    try {

        if(req.user.pharmacy === true){

            const check = await itemModel.findById(req.params.itemId)

            if(!check){
                res.status(404).json({
                    message: `Not eligible`
                })
            } else{
                const {name, type, price}  = req.body
                await cloudinary.uploader.destroy(check.avaID)
                const cloud = await cloudinary.uploader.upload(req.file.path)
                const getItem = await itemModel.findByIdAndUpdate(req.params.itemId, {
                    name,
                    type,
                    price,
                    ava: cloud.secure_url,
                    avaID: cloud.public_id
                }, {new:true})

                res.status(201).json({
                    status: `updated`,
                    data: getItem
                })
            }
            
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


route.delete('/:id/specialistpost/:itemId', async (req, res) =>{
    try {
        if(req.user.specialist === true){
            const poster = await userModel.findById(req.params.id)
            const deleteItem = await itemModel.findByIdAndDelete(req.params.itemId)

            poster.item.pull(deleteItem)
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