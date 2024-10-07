const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

const { validationResult, body } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

// Route 1: Get all the customers using: GET "/api/customers/getallcustomers". Login required
router.get('/getallcustomers', fetchuser, async (req, res) => {
    try {
        const customers = await Customer.find({ user: req.user.id });
        res.json(customers);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 2: Add a new customer using: POST "/api/customers/addcustomer". Login required
router.post('/addcustomer', fetchuser, [
    body('customerName', 'Enter a valid name').isLength({ min: 3 }),
    body('customerAddress', 'Enter a valid address').isLength({ min: 3 }),
    body('customerMobile', 'Enter a valid mobile number').isLength({ min: 10 }),
    body('customerEmail', 'Enter a valid email').isEmail(),

], async (req, res) => {
    try {
        const { customerName, customerAddress, customerMobile, customerEmail } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const customer = new Customer({
            customerName, customerAddress, customerMobile, customerEmail, user: req.user.id
        });
        const savedCustomer = await customer.save();
        res.json(savedCustomer);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 3: Update an existing customer using: PUT "/api/customers/updatecustomer". Login required.

router.put('/updatecustomer/:id', fetchuser, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    // Destructuring the customer from req.body
    const { customerName, customerAddress, customerMobile, customerEmail } = req.body;
    // Create a customer object
    const newCustomer = {};
    if (customerName) { newCustomer.customerName = customerName };
    if (customerAddress) { newCustomer.customerAddress = customerAddress };
    if (customerMobile) { newCustomer.customerMobile = customerMobile };
    if (customerEmail) { newCustomer.customerEmail = customerEmail };
    try {
        // Find the customer to be updated and update it
        let customer = await Customer.findById(req.params.id);
        if (!customer) { return res.status(404).send("Not Found") }

        if (customer.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        customer = await Customer.findByIdAndUpdate(req.params.id, { $set: newCustomer }, { new: true });
        res.json({ customer });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 4: Delete an existing customer using: DELETE "/api/customers/deletecustomer". Login required.

router.delete('/deletecustomer/:id', fetchuser, async (req, res) => {
    try {
        // Find the customer to be deleted and delete it
        let customer = await Customer.findById(req.params.id);
        if (!customer) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this customer
        if (customer.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        customer = await Customer.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Customer has been deleted", customer: customer });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;