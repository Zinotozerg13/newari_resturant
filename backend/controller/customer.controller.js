const {validationResult} = require('express-validator');
const customerModel = require('../models/customer.model');
const customerService = require('../services/customer.service');
const blacklistModel = require('../models/blacklist.model');
const bcrypt = require('bcrypt');

module.exports.registerCustomer = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstname, lastname, email, phone, password } = req.body;

  // Hash password
  const hashpassword = await customerModel.hashPassword(password);

  // Create customer
  const customer = await customerService.createCustomer({
    firstname,
    lastname,
    email: email.toLowerCase(),
    phone,
    password: hashpassword
  });

  // Generate token
  const token = customer.generateAuthToken();

  
  res.status(201).json({
    message: "Customer registered successfully",
    customer,
    token
  });
};

module.exports.loginCustomer=async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const phone=req.body.phone;
    const password=req.body.password;
   
    
    // hashed password in DB
const customer = await customerModel.findOne({ phone });
if (!customer) {
  return res.status(404).json({ message: 'Customer not found' });
}

// compare hashed password
const isMatch = await bcrypt.compare(password, customer.password);
if (!isMatch) {
  return res.status(400).json({ message: 'Incorrect password' });
}
const token = customer.generateAuthToken();
res.cookie("token", token, { httpOnly: true });
        res.status(201).json({token,customer,message:"Login successful"});


}

module.exports.getProfile=async(req,res)=>{
    const customer=req.customer;
    res.status(200).json({customer});
}

module.exports.logoutCustomer=async(req,res)=>{
    res.clearCookie("token");
    const token=req.header('Authorization')?.replace('Bearer ', '')||req.cookies.token;
     await blacklistModel.create({token});
    res.status(200).json({message:"Logout successful"});

}