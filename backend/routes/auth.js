const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const JWT_Secret = "ThisSecure";
var fetchuser = require('../middleware/fetchuser');



//create user
router.post('/register',[
    body('name',"Enter the vaild name").isLength({min:3}),
    body('email',"Enter the vaild email").isEmail(),
    body('password',"Enter the vaild password").isLength({min:5})
],async (req,res)=>{
    //if there is error,return bad request and the error
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try{
      //check wheater the user with this email exists already
      let user = await User.findOne({email: req.body.email});
      if(user){
        return res.status(400).json({success, error: "the user is exist"})
    
      }
      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password,salt);
      user = await User.create({
          name:req.body.name,
          password:secPass,
          email:req.body.email,
        
        })
        const data = {
          user:{
            id:user.id
          }
        }
        const authtoken = jwt.sign(data,JWT_Secret);
        success = true;
        res.json({success,authtoken});
    }catch(error){
      console.log(error.message);
      res.status(500).send("Some Error Occuried!");
    }
      
    
})

//login user
router.post('/login',[
  body('email',"Enter the vaild email").isEmail(),
  body('password',"Enter the vaild password").exists()

], async (req,res)=>{
    //if there is error,return bad request and the error
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      //return bad request and the error
      return res.status(400).json({success, errors: errors.array() });
    }
    const {email,password} =req.body;
    try{
      let user = await User.findOne({email});
      if(!user){
        // return bad request and the error when user is not found
        return res.status(400).json({success,error:"Please try to login with correct creditions"});
      }
      const passwordCompare = await bcrypt.compare(password,user.password);
      if(!passwordCompare){
        // return bad request and the error when password is not correct
        return res.status(400).json({success,error:"Please try to login with correct creditions"});

      }
      // return the jwt token when user is logged in successfully.
      const data = {   
        user:{
          id: user.id
        }
      }
      // create a token
      const authtoken = jwt.sign(data,JWT_Secret);
      success = true;
      res.json({success,authtoken});

    }catch(errors){
      // return the error when some error occured
      console.log(errors.message);
      res.status(500).send("Internal Server Error");
    }
  });

//get user details
router.post('/getUser',fetchuser, async (req,res)=>{
  try{
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  }catch(error){
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
}
);

//get all user details for admin purpose only
router.get('/getAlluser', async (req,res)=>{
  try{
    const user = await User.find();
    res.send(user);
  
  }catch(error){
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//update user details

router.put('/updateuser/:id', async (req,res)=>{
  try{
    const userId = req.params.id;
    const user = await User.findByIdAndUpdate(userId,{$set:req.body},{new:true});
    res.send(user);
  }catch(error){
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
}
);


module.exports = router;