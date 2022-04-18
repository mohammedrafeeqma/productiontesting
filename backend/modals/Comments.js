const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
    {
        userId:{
            type:'String'
        },
        postId:{
            type:'String'
        },
        comment:{
            type:'String'
        },
        likes:{
            type:Array,
            default:[],
        }
    },
    {timestamps:true}
);

module.exports = mongoose.model('comment', commentSchema)