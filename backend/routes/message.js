const express = require('express')
var router = express.Router()
const Message = require('../modals/Message')
//add
router.post('/', async(req,res)=>{
    const newMessage = new Message(req.body)
    try {
        const saveMessage = await newMessage.save()
        res.status(200).json(saveMessage)        
    } catch (error) {
        res.status(500).json(error)
    }
})

//get

router.get('/:conversationId', async(req,res)=>{
    try {
        const messages = await Message.find({
            conversationId:req.params.conversationId
        })
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json(error)
    }
})

//total messages

router.get('/',async(req,res)=>{
    try {
        const total = await Message.find()
        res.status(200).json(total.length)
    } catch (error) {
        
    }
})


module.exports = router