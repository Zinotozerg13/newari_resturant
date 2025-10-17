const orderModel = require('../models/order.model');
const customerModel = require('../models/customer.model');

module.exports.createBill = async ({ customerId, items, address, deliveryNotes, totalAmount, deliveryFee, paymentMethod }) => {
    // Validation
    if (!customerId || !items || items.length === 0 || !totalAmount || !address || !paymentMethod) {
        throw new Error("CustomerId, items, address, totalAmount, and paymentMethod are required");
    }

    // Validate paymentMethod
    const validPaymentMethods = ['cash', 'esewa'];
    if (!validPaymentMethods.includes(paymentMethod)) {
        throw new Error("Invalid payment method. Must be 'cash', 'esewa'");
    }

    const order = new orderModel({
        customerId,
        items,
        address,
        deliveryNotes: deliveryNotes || '', // Optional field
        totalAmount,
        
        paymentMethod,
        // paymentStatus defaults to 'pending'
        // orderStatus defaults to 'placed'
    });

    await order.save();
    return order;
};