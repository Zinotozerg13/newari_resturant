
const { body } = require('express-validator');
const express = require('express');
const router = express.Router();
const orderController = require('../controller/order.controller');
const authMiddleware = require('../middlware/auth.middleware');

router.post('/place', authMiddleware.authenticateCustomer, [
    body("items")
        .isArray({ min: 1 })
        .withMessage("Items are required and must be a non-empty array"),
    
   
    body("address")
        .notEmpty()
        .trim()
        .withMessage("Delivery address is required"),
    
    body("deliveryNotes")
        .optional()
        .trim(),
    
    body("totalAmount")
        .isFloat({ min: 0 })
        .withMessage("Total amount must be a valid positive number"),
    
    body("paymentMethod")
        .isIn(['cash', 'esewa',])
        .withMessage("Payment method must be 'cash', 'esewa', ")
], orderController.placeOrder);
router.get('/history',orderController.getOrderHistory);



module.exports = router;