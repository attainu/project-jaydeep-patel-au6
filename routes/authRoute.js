const express = require('express')
const router = express.Router()


//load controllers
const {
    registerController,
    activationController
} = require('../controllers/authController.js')


//validation
const {
    validRegister,
    validLogin,
    forgotPasswordValidator,
    resetPasswordValidator
} = require('../helpers/valid.js')


router.post('/register' ,validRegister, registerController)
router.post('/activation', activationController)

module.exports = router