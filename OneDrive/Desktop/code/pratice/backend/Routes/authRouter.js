const Routes = require('express').Router();

const {signup} = require('../Controllers/authController');
const {signupValidation} = require('../Middleware/authValidation');



Routes.post('/signup',signupValidation, signup);

module.exports = Routes;