const express=require('express');
const{registerUser,loginUser}=require('../controllers/userController');
const validate=require('../middlewares/validate');
const validateLogin= require('../services/auth/loginValidation');
const validateRegister=require('../services/auth/registerValidation');
const router=express.Router();
router.post('/register',validate(validateRegister),registerUser);
router.post('/login',validate(validateLogin),loginUser);

module.exports=router;