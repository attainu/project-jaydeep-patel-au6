const express = require('express')
const router = express.Router()


//load controllers
const {
    registerController,
    activationController,
    signinController,
    forgotPasswordController
} = require('../controllers/authController.js')


//validation
const {
    validRegister,
    validLogin,
    forgotPasswordValidator,
    resetPasswordValidator
} = require('../helpers/valid.js')


router.post('/register' ,validRegister, registerController)
router.post('/login' ,validLogin, signinController)
router.post('/activation', activationController)
router.put('/forgotpassword', forgotPasswordValidator, forgotPasswordController);
module.exports = router