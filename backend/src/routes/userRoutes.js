const express=require('express');
const{registerUser,loginUser,logoutUser}=require('../controllers/userController');
const validate=require('../middlewares/validate');
const validateLogin= require('../services/auth/loginValidation');
const validateRegister=require('../services/auth/registerValidation');
const auth=require('../middlewares/auth');
const router=express.Router();
router.post('/register',validate(validateRegister),registerUser);
router.post('/login',validate(validateLogin),loginUser);
router.post('/logout',auth,logoutUser);

module.exports=router;