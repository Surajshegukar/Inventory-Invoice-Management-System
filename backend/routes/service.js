const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const Service = require('../models/Service');
const fetchUser = require('../middleware/fetchuser');

// Route 1: Add a new service POST "/api/service/addservice". Login required
router.post("/addservice",fetchUser,[
    body("name", "Enter the vaild Name").isLength({ min: 3 }),
    body("price", "Enter the valid Price").isNumeric(),
    body("category", "Enter the valid Category").isLength({ min: 3 }),
    // body("code", "Enter the valid Service Code").isEmpty(),
    body("cgst", "Enter the valid CGST").isNumeric(),
    body("sgst", "Enter the valid SGST").isNumeric(),
  ], async (req, res) => {
    try {
      const { name,price,category,code,cgst,sgst } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const service = new Service({
        name,
        price,
        category,code,cgst,sgst,
        user: req.user.id,
      });
      const saveService = await service.save();
      res.json(saveService);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error Occuried!");
    }
  }
);
// Route 2: Get all the services GET "/api/service/getservices". Login required
router.get('/getservices',fetchUser,async(req,res)=>{
    try{
        
        const services = await Service.find({ user: req.user.id });
        res.json(services);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
});

// Route 3: Update an existing service PUT "/api/service/updateservice". Login required
router.put('/updateservice/:id',fetchUser,async(req,res)=>{
    try{
        
        let service = await Service.findById(req.params.id);
        if (service.user.toString() !== req.user.id) {

            return res.status(401).json({msg:"Not Authorized"});
        }
        if(!service){
            return res.status(404).json({msg:"service not found"});
        }
        service = await Service.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.json(service);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
}
);

// Route 4: Delete an existing service DELETE "/api/service/deleteservice". Login required
router.delete('/deleteservice/:id',fetchUser,async(req,res)=>{
    try{
        
        let service = await Service.findById(req.params.id);
        if (service.user.toString() !== req.user.id) {

            return res.status(401).json({msg:"Not Authorized"});
        }
        if(!service){
            return res.status(404).json({msg:"service not found"});
        }
        await Service.findByIdAndDelete(req.params.id);
        res.json({msg:"service deleted"});
    }catch(err){
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
}
);

module.exports = router;