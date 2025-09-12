const express =require("express");
const{createComment, getComments}=require('../controllers/commentsController');
const auth= require('../middlewares/auth');
const { checkTaskViewAccess, checkTaskOwnerAccess }=require('../middlewares/taskAccess')
const router= express.Router({mergeParams:true});
router.post('/',auth,checkTaskViewAccess,createComment);
router.get('/',auth,checkTaskViewAccess,getComments);
module.exports=router;