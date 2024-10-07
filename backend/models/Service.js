// service model schema for the database

const mongoose = require('mongoose');
const {Schema} = mongoose;

const serviceSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true,
        default:'General'
    },
    code:{
        type:String,
        default:"",
    },
    cgst:{
        type:Number,
        default:0,
    },
    sgst:{
        type:Number,
        default:0,
    }
})

module.exports = mongoose.model('Service',serviceSchema);