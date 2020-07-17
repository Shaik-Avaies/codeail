const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    confirm_password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
},
    {
         //Created at and Updated at
        timestamps: true
    }
);

const user = mongoose.model('user',userSchema);
module.exports = user;