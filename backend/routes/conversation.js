const express = require('express')
const Conversation = require('../modals/Conversation')
const User = require('../modals/User')
const router = express.Router()

//new conversation
router.post('/', async(req,res)=>{
    
    const conv = await Conversation.find({members:[req.body.senderId,req.body.recieverId]})
    if(conv.length>0)
    {
        res.json('already in conversation')
    }
    else
    {
    
        const newConversation = new Conversation({
        members:[req.body.senderId, req.body.recieverId]
    })
    try {
        const savedConversation = await newConversation.save()
        res.status(200).json(savedConversation)
    } catch (error) {
        res.status(500).json(error)
    }
    }
    
})

// delete conversation
router.get('/',async(req,res)=>{
   
        console.log(req.body);
        console.log(111);
        const conv = await Conversation.findOneAndDelete({members:[req.body.senderId,req.body.recieverId]})
        console.log(conv); 
    // await conv.deleteOne() 
    console.log(4555);
    res.status(200).json(conv)
    
})

//get conversation of a user
router.get('/:userId', async(req,res)=>{
    try {
        const conversation = await Conversation.find({
            members:{$in:[req.params.userId]}
        })
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router