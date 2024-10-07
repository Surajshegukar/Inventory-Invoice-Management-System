const express = require('express')
const router = express.Router();
const Invoice = require('../models/Invoice');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

// Route 1: Get all the invoices using: GET "/api/invoice/getallinvoices". Login required
router.get('/getallinvoices', fetchuser, async (req, res) => {
    try {
        const invoices = await Invoice.find({ user: req.user.id });
        res.json(invoices);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 2: Add a new invoice using: POST "/api/invoice/addinvoice". Login required
router.post('/addinvoice', fetchuser, [
    body('invoiceNo', 'Enter a valid invoice number').isNumeric(),
    body('customerName', 'Enter a valid date').isLength({ min: 3 }),
    body('customerAddress', 'Enter a valid address').isLength({ min: 3 }),
    body('customerMobile', 'Enter a valid mobile number').isLength({ min: 10 }),
    body('customerEmail', 'Enter a valid email').isEmail(),
    body('sellerName', 'Enter a valid seller name').isLength({ min: 3 }),
    body('sellerAddress', 'Enter a valid address').isLength({ min: 3 }),
    body('sellerMobile', 'Enter a valid mobile number').isLength({ min: 10 }),
    body('sellerEmail', 'Enter a valid email').isEmail(),
    body('sellerPanNo', 'Enter a valid PAN number').isLength({ min: 10 }),
    // body('sellerGstNo', 'Enter a valid GST number').isLength({ min: 15 }),
    // body('orderNo', 'Enter a valid order number').isEmpty(),
    body('items', 'Enter a valid items').isArray(),
    body('orderDate', 'Enter a valid order date').isDate(),
    body('invoiceDate', 'Enter a valid date').isDate(),
    body('status', 'Enter a valid status').isIn(['Pending', 'Paid', 'Cancelled'])
], async (req, res) => {
    try {
        const { invoiceNo,customerEmail,invoiceDate, customerName, customerAddress, customerMobile, items,orderNo, orderDate, status,type,
        sellerName, sellerAddress, sellerMobile, sellerEmail, sellerPanNo, sellerGstNo,shippingAddress,shippingName,shipping
        } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const invoice = new Invoice({
            invoiceNo, customerEmail,invoiceDate,orderNo, customerName, customerAddress, customerMobile, items, orderDate, type,status,sellerName, sellerAddress, sellerMobile, sellerEmail, sellerPanNo,shipping,shippingAddress,shippingName, sellerGstNo ,user: req.user.id
        });
        const savedInvoice = await invoice.save();
        res.json(savedInvoice);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 3: Update an existing invoice using: PUT "/api/invoice/updateinvoice". Login required
router.put('/updateinvoice/:id', fetchuser,async (req, res) => {
    try {
        const { invoiceNo,customerEmail,invoiceDate, customerName, customerAddress, customerMobile, items,orderNo, orderDate, status,type,
            sellerName, sellerAddress, sellerMobile, sellerEmail, sellerPanNo, sellerGstNo,shippingAddress,shippingName,shipping
        } = req.body;
        const newInvoice = { invoiceNo,customerEmail,invoiceDate,orderNo, customerName, customerAddress, customerMobile, items, orderDate, type,status,sellerName, sellerAddress, sellerMobile, sellerEmail, sellerPanNo,shipping,shippingAddress,shippingName, sellerGstNo };
        let invoice = await Invoice.findById(req.params.id);
        if (!invoice) { return res.status(404).send("Not Found"); }
        if (invoice.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed"); }
        invoice = await Invoice.findByIdAndUpdate(req.params.id, { $set: newInvoice }, { new: true });
        res.json({ "Success": "Invoice has been updated", invoice: invoice });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 4: Delete an existing invoice using: DELETE "/api/invoice/deleteinvoice". Login required
router.delete('/deleteinvoice/:id', fetchuser, async (req, res) => {
    try {
        let invoice = await Invoice.findById(req.params.id);
        if (!invoice) { return res.status(404).send("Not Found"); }
        if (invoice.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed"); }
        invoice = await Invoice.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Invoice has been deleted", invoice: invoice });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;