const express = require('express')
const router = express.Router()
const Notification = require('../modals/Notification')

//creat notification
router.post('/',async(req,res)=>{
    
        const newNotification = await new Notification(req.body)
    try{
        const savedNotification = await newNotification.save()
        res.status(200).json(savedNotification)

    } catch (error) {
        
    }
})

//get notification

router.get('/:userId',async(req,res)=>{
    try {
        const notification = await Notification.find({userId:req.params.userId}).sort({createdAt:'-1'})
        res.status(200).json(notification)
    } catch (error) {
        
    }
})

module.exports = router