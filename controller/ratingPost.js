const express = require('express')
const route = express.Router()
const userModel = require('../model/userModel')
const ratingModel = require('../model/ratingModel')
const verify = require('../utils/auth')


route.post('/:pharmacyId/rate', verify, async (req, res) =>{
    try {

        if(req.user.pharmacy === true){
            const pharm = await userModel.findById(req.params.pharmacyId)
            const rateData = new ratingModel({count})

            rateData.user = pharm
            rateData.save()

            pharm.rating.push(rateData)
            pharm.save()

            res.status(201).json({
                status: `rated`,
                data: rateData
            })
        } else{
                res.json({
                message: `Not allowed`
            })
        }
        
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})