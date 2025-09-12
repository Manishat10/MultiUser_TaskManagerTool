const express =require("express");
const{createComment, getComments}=require('../controllers/commentsController');
const auth= require('../middlewares/auth');
const validate=require('../middlewares/validate');
const validateComment=require('../services/tasks/comments/commentValidation');
const { checkTaskViewAccess }=require('../middlewares/taskAccess');

const router= express.Router({mergeParams:true});

router.post('/',auth,checkTaskViewAccess,validate(validateComment),createComment);
router.get('/',auth,checkTaskViewAccess,getComments);
module.exports=router;