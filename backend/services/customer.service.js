const customerModel = require('../models/customer.model');

module.exports.createCustomer=async({firstname,lastname,email,password,phone})=>{
    if (!firstname || !lastname || !email || !password|| !phone) {
      throw new Error("All fields are required");
    }
    const customer=customerModel({
        firstname,
        lastname,
        email,
        phone,
        password
    });
    await customer.save();
    return customer;

}
