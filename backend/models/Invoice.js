// invoice schema for the database


const mongoose = require('mongoose');
const {Schema} = mongoose;

const invoiceSchema = new Schema({
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    invoiceNo:{
        type:String,
        required:true,
        unique:true
    },
    invoiceDate:{
        type:Date,
        default:Date.now,
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
    },
    sellerName:{
        type:String,
        required:true
    },
    sellerAddress:{
        type:String,
        required:true
    },
    sellerMobile:{
        type:Number,
        required:true
    },
    sellerEmail:{
        type:String,
        required:true
    },
    sellerPanNo:{
        type:String,
        required:true
    },
    sellerGstNo:{
        type:String,
        required:true
    },
    shippingName:{
        type:String, 
    },

    shippingAddress:{
        type:String,
        
    },
    shipping:{
        type:Boolean,
        default:false
    },
    type:{
        type:String,
        required:true
    },
    items:[{
        name:{
            type:String,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        shippingCharges:{
            type:Number,
            default:0
        },
        cgst:{
            type:Number,
            default:0
            
        },
        sgst:{
            type:Number,
            default:0
        },
        code:{
            type:String,
            required:true
        }
    }],
    orderDate: { 
        type: Date, 
        required: true 
    },
    orderNo: {
        type: String, 
        required: true 
    }
    ,
    status: { 
        type: String, 
        enum: ['Pending', 'Paid', 'Cancelled'], 
        default: 'Pending' },
    
})

module.exports = mongoose.model('Invoice',invoiceSchema);