const jwt = require('jsonwebtoken');;
const customerModel = require('../models/customer.model');
const bcrypt = require('bcrypt');
const blackListModel = require('../models/blacklist.model');

module.exports.authenticateCustomer=async(req,res,next)=>{
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const blacklisted = await blackListModel.findOne({ token });
if (blacklisted) {
  return res.status(401).json({ message: "Token has been invalidated" });
}

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
    const customer = await customerModel.findById(decoded._id);
    try
    {
        if (!customer) {
        return res.status(404).json({ message: 'Customer not found.' });
    }
    req.customer = customer; // Attach customer to request object
    next();
    }
    catch(err)
    {
        res.status(500).json({message:"Unauthorized access"});
    }

}