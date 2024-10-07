// customer model schema for the database

const mongoose = require('mongoose');
const {Schema} = mongoose;

const customerSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    customerName:{
        type:String,
        required:true
    },
    customerAddress:{
        type:String,
        required:true
    },
    customerMobile:{
        type:Number,
        required:true
    },
    customerEmail:{
        type:String,
        required:true
    
    }
});

module.exports = mongoose.model('Customer',customerSchema);