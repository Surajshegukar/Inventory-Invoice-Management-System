// seller model schema for the database

const mongoose = require('mongoose');
const {Schema} = mongoose;

const sellerSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    },
    panNo:{
        type:String,
        required:true
    },
    gstNo:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }

})

module.exports = mongoose.model('Seller',sellerSchema);