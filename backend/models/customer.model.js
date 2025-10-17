const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const customerSchema = new mongoose.Schema({
firstname: { type: String, required: true,minlength:[3,"Minimum length required firstname"] },
lastname: { type: String, required: true ,minlength:[3,"Minimum length required lastname"]},
email: { type: String, required: true ,},
phone: { type:Number,unique:true, required: true },
password: { type: String, required: true ,minlength:[1,"Minimum length required password"]},

}, { timestamps: true });

customerSchema.methods.generateAuthToken = function() {
    const token=    jwt.sign({_id:this._id},process.env.SECRET_KEY,{
        expiresIn:"30d"
    });
    return token;
}
customerSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

customerSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}


const customerModel = mongoose.model('Customer', customerSchema);
module.exports = customerModel;