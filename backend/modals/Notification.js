const mongoose = require('mongoose')
const notificationSchema = new mongoose.Schema(
    {
        userId:{
            type:'String',
            required:true
        },
        friendName:{
            type:'String'
        },
        img:{
            type:'String'
        },
        postId:{
            type:'String'
        },
        action:{
            type:'String'
        }
    },
    {timestamps:true}
)

module.exports = mongoose.model('notification', notificationSchema)