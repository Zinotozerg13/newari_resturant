const {body} = require('express-validator');
const express = require('express');
const router = express.Router();
const customerController = require('../controller/customer.controller');
const  authMiddleware  = require('../middlware/auth.middleware');

router.post('/register',[
    body('firstname').isLength({min:3}).withMessage('First name must be at least 3 characters long'),
    body('lastname').isLength({min:3}).withMessage('Last name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('phone').isLength({min:10,max:10}).withMessage('Phone number must be 10 digits long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
],customerController.registerCustomer);

router.post('/login',
    body('phone').isLength({min:10,max:10}).withMessage('Phone number must be 10 digits long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    customerController.loginCustomer);

router.get('/profile',authMiddleware.authenticateCustomer,customerController.getProfile);
router.get('/logout',authMiddleware.authenticateCustomer,customerController.logoutCustomer);
    module.exports = router;