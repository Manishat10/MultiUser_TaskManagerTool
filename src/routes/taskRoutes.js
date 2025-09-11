const express =require("express");
const {createTask,getTask,updateTask,deleteTask}=require("../controllers/taskController");
const auth =require("../middlewares/auth");
const router =express.Router();
router.post("/",auth,createTask);
router.get("/:id",auth,getTask);
router.put("/:id",auth,updateTask);
router.delete("/:id",auth,deleteTask);
module.exports=router;