const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        firstname:{
            type: 'String',
            required: true
            

        },
        lastname:{
            type: 'String',
            required: true
        },
        username: {
            type: 'String',
            required: true,
            minlength: 5,
            max: 15,
            unique: true

        },
        email: {
            type: 'String',
            required: true,
            max: 30,
            unique: true
        },
        mobile: {
            type:'Number',
            required: true,
            unique: true
            
        },
        Dob:{
            type: "string",
            required: true,
        },
        gender:{
            type:"string"
        },
        password: {
            type: 'String',
            required: true,
            min: 6
        },
        profilePicture: {
            type: "String",
            default: '',
        },
        coverPicture: {
            type: 'String',
            default: '',
        },
        followers: {
            type: Array,
            default: [],
        },
        following:{
            type: Array,
            default: [],
        },
        isAdmin:{
            type: 'String',
            default: false,
        },
        favourite:{
            type: Array,
            default:[],
        }

    },
    { timestamps: true}
);

module.exports = mongoose.model('User', UserSchema)