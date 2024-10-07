// user model schema for the database

const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        default:"ProfilePic.jpg"
    }
})

const User = mongoose.model('user',userSchema);
User.createIndexes();
module.exports = User;