const mongoose = require('mongoose');
const newUserSchema = new mongoose.Schema({
    name :String,

    email:{
        type:String,
        unique:true,
        required:true},
    password:{
        type:String,
        required:true
    },
})

const User = new mongoose.model("newUser",newUserSchema)

module.exports = User;