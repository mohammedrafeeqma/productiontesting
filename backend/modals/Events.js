const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema(
    {
        ownerId:{
            type:'string',
            
        },
        eventName:{
            type:'string',
            required: true,
        },
        date:{
            type: 'string',
            required:true,
        },
        address:{
            type:'string',
            required: true,
        },
        description:{
            type:'string'
        },
        img:{
            type:'string'
        },
       loc:{
           type:{ type: 'string', default:'Point'},
           coordinates: []
           
       },
       interested:{
           type: Array,
           default:[]
       }
    },
    {timestamps: true}
);
EventSchema.index({loc: '2dsphere'})
module.exports = mongoose.model('event', EventSchema)