const express = require('express')
const route = express.Router()
const userModel = require('../model/userModel')
const reviewModel = require('../model/reviewModel')
const verify = require('../utils/auth')


route.post('/:id/review/:specialistId', verify, async (req, res) =>{
    try {

        if(req.user.specialist === true){
            const {message}  = req.body
            const getUser = await userModel.findById(req.params.specialistId)
            const reviews = new reviewModel({
                message
            })

            reviews.user = getUser
            reviews.save()

            getUser.review.push(reviews)
            getUser.save()

            res.status(201).json({
                status: `posted`,
                data: reviews
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


route.get('/:id/review/:specialistId/allreview', async (req, res) =>{
    try {
            const rev = await userModel.findById(req.params.specialistId).populate('review')

            res.status(201).json({
                status: `All reviews`,
                data: rev
            })
        
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})



route.get('/:id/review', async (req, res) =>{
    try {
            const users = await reviewModel.findById(req.params.itemId).populate('users')

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


module.exports = route