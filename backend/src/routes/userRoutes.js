const express=require('express');
const{registerUser,loginUser,logoutUser,checkAuthUser,getAllUsers,getAllTasks,getAllComments}=require('../controllers/userController');
const validate=require('../middlewares/validate');
const validateLogin= require('../services/auth/loginValidation');
const validateRegister=require('../services/auth/registerValidation');
const auth=require('../middlewares/auth');
const adminMiddleware = require('../middlewares/admin');
const router=express.Router();
router.post('/register',validate(validateRegister),registerUser);
router.post('/login',validate(validateLogin),loginUser);
router.post('/logout',auth,logoutUser);
router.get('/checkAuth',auth,checkAuthUser);
router.get('/all', auth, getAllUsers);

// Admin routes
router.get('/admin/tasks', auth, adminMiddleware, getAllTasks);
router.get('/admin/comments', auth, adminMiddleware, getAllComments);

module.exports=router;