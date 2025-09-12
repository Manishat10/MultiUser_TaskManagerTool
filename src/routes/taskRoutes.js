const express =require("express");
const {createTask,getTask,updateTask,deleteTask,getFilteredTasks}=require("../controllers/taskController");
const auth =require("../middlewares/auth");
const validate=require('../middlewares/validate');
const validateCreateTask=require('../services/tasks/taskValidation');
const validateFilterTask=require('../services/tasks/filterValidation');
const {checkTaskViewAccess,checkTaskOwnerAccess}=require("../middlewares/taskAccess");

const router =express.Router();

router.post("/",auth,validate(validateCreateTask),createTask);
router.get("/:id",auth,checkTaskViewAccess,getTask);
router.put("/:id",auth,checkTaskOwnerAccess,updateTask);
router.delete("/:id",auth,checkTaskOwnerAccess,deleteTask);
router.get("/",auth,validate(validateFilterTask),getFilteredTasks);
module.exports=router;