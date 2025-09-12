const express =require("express");
const {createTask,getTask,updateTask,deleteTask,getFilteredTasks}=require("../controllers/taskController");
const auth =require("../middlewares/auth");
const {checkTaskViewAccess,checkTaskOwnerAccess}=require("../middlewares/taskAccess")
const router =express.Router();
router.post("/",auth,createTask);
router.get("/:id",auth,checkTaskViewAccess,getTask);
router.put("/:id",auth,checkTaskOwnerAccess,updateTask);
router.delete("/:id",auth,checkTaskOwnerAccess,deleteTask);
router.get("/",auth,getFilteredTasks);
module.exports=router;