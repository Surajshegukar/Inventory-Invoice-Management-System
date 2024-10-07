const express = require('express');
const router = express.Router();
const Seller = require('../models/Seller');
const {body,validationResult} = require('express-validator');
const fetchUser = require('../middleware/fetchuser');

// Route 1: Add a new seller POST "/api/seller/addseller". Login required
router.post('/addseller',fetchUser,
    [body('name','Name is required').notEmpty(),
    body('mobile','Mobile is required').notEmpty(),
    body('mobile','Mobile should be a number').isNumeric(),
    body('mobile','Mobile should be of 10 digits').isLength({min:10,max:10}),
    body('email','Email is required').notEmpty(),
    body('email','Email is not valid').isEmail(),
    body('address','Address is required').notEmpty(),
    body('panNo','Pan No is required').notEmpty(),
    body('gstNo','GST No is required').notEmpty()],
    
    async(req,res)=>{
    const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        
        try{
            const {name,mobile,email,address,panNo,gstNo} = req.body;
            const user = req.user.id;
            const seller = new Seller({name,mobile,email,address,panNo,gstNo,user});
            await seller.save();
            res.json(seller);
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    })

// Route 2: Get all the sellers GET "/api/seller/getsellers". Login required
router.get('/getsellers',fetchUser,async(req,res)=>{
    
    try{
        
        const sellers = await Seller.find({user:req.user.id});
        res.json(sellers);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
)

// Route 3: Get a seller by id GET "/api/seller/getseller/:id". Login required
router.get('/getseller/:id',fetchUser,async(req,res)=>{
    try{
        const seller = await Seller.findById(req.params.id);
        if(!seller){
            return res.status(404).json({msg:'Seller not found'});
        }
        res.json(seller);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// Route 4: Update an existing seller PUT "/api/seller/updateseller/:id". Login required
router.put('/updateseller/:id',fetchUser,async(req,res)=>{
    try{
        const {name,mobile,email,address,panNo,gstNo} = req.body;
        const sellerFields = {};
        if(name) sellerFields.name = name;
        if(mobile) sellerFields.mobile = mobile;
        if(email) sellerFields.email = email;
        if(address) sellerFields.address = address;
        if(panNo) sellerFields.panNo = panNo;
        if(gstNo) sellerFields.gstNo = gstNo;
        let seller = await Seller.findById(req.params.id);
        if(!seller){
            return res.status(404).json({msg:'Seller not found'});
        }
        seller = await Seller.findByIdAndUpdate(req.params.id,{$set:sellerFields},{new:true});
        res.json(seller);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.delete('/deleteseller/:id',fetchUser,async(req,res)=>{
    try{
        let seller = await Seller.findById(req.params.id);
        if(!seller){
            return res.status(404).json({msg:'Seller not found'});
        }
        if(seller.user.toString() !== req.user.id){
            return res.status(401).json({msg:'Not Authorized'});
        }
        await Seller.findByIdAndDelete(req.params.id);
        res.json({msg:'Seller removed'});
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;


