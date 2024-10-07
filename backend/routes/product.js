const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const Product = require('../models/Product');
const fetchUser = require('../middleware/fetchuser');

// Route 1: Add a new product POST "/api/product/addproduct". Login required
router.post("/addproduct",fetchUser,[
    body("name", "Enter the vaild Name").isLength({ min: 3 }),
    body("price", "Enter the valid Price").isNumeric(),
    body("category", "Enter the valid Category").isLength({ min: 3 }),
    body('code','Enter the valid Product / HSN Code').isLength({min:3}),
    body('cgst','Enter the valid GST').isNumeric(),
    body('sgst','Enter the valid GST').isNumeric(),
    body('shippingCharges','Enter the valid Shipping Charges').isNumeric(),

  ], async (req, res) => {
    try {
      const {name,price,category,code,cgst,sgst,shippingCharges} = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const product = new Product({
        name,
        price,
        category,
        code,
        cgst,
        sgst,
        shippingCharges,
        user: req.user.id,
      });
      const saveProduct = await product.save();
      res.json(saveProduct);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error Occuried!");
    }
  }
);

// Route 2: Get all the products GET "/api/product/getproducts". Login required

router.get('/getproducts',fetchUser,async(req,res)=>{
    try{
        
        const products = await Product.find({ user: req.user.id });
        res.json(products);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
});

// Route 3: Update an existing product PUT "/api/product/updateproduct". Login required
router.put('/updateproduct/:id',fetchUser,async(req,res)=>{
    try{
        
        let product = await Product.findById(req.params.id);
        if (product.user.toString() !== req.user.id) {

            return res.status(401).json({msg:"Not Authorized"});
        }
        if(!product){
            return res.status(404).json({msg:"Product not found"});
        }
        product = await Product.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.json(product);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
}
);

// Route 4: Delete an existing product DELETE "/api/product/deleteproduct". Login required
router.delete('/deleteproduct/:id',fetchUser,async(req,res)=>{
    try{
        
        let product = await Product.findById(req.params.id);
        if (product.user.toString() !== req.user.id) {

            return res.status(401).json({msg:"Not Authorized"});
        }
        if(!product){
            return res.status(404).json({msg:"Product not found"});
        }
        await Product.findByIdAndDelete(req.params.id);
        res.json({msg:"Product deleted"});
    }catch(err){
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
}
);

module.exports = router;