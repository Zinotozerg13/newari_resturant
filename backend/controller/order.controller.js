const { validationResult } = require('express-validator');
const orderModel = require('../models/order.model');
const orderService = require('../services/order.service');
const customerModel = require('../models/customer.model');

module.exports.placeOrder = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const customerId = req.customer._id;
    if (!customerId) {
        return res.status(401).json({ message: "Unauthorized: Customer not logged in" });
    }

    const { items, address, deliveryNotes, totalAmount,  paymentMethod } = req.body;

    // Additional validation (though express-validator should handle this)
    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "Items are required and should be a non-empty array" });
    }

    if (!address) {
        return res.status(400).json({ message: "Delivery address is required" });
    }

    if (!paymentMethod) {
        return res.status(400).json({ message: "Payment method is required" });
    }

    if(!totalAmount || totalAmount <= 0) {
        return res.status(400).json({ message: "Total amount must be a valid positive number" });
    }


        

        const order = await orderService.createBill({
            customerId,
            items,
            address,
            deliveryNotes,
            totalAmount,
            paymentMethod
        });
        await order.populate('customerId', 'name phone');


        res.status(201).json({
            message: "Order placed successfully",
            order: {
                _id: order._id,
                items: order.items,
                address: order.address,
                totalAmount: order.totalAmount,
                
                paymentMethod: order.paymentMethod,
                paymentStatus: order.paymentStatus,
                orderStatus: order.orderStatus,
                createdAt: order.createdAt
            }
        });
    
};
module.exports.getOrderHistory = async (req, res) => {
    
    try {
       const orders = await orderModel
  .find()
  .populate('customerId', 'firstname lastname phone') 
  .sort({ createdAt: -1 });
  
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
       
};