const { findTaskById } = require("../models/commentModel");
const checkTaskViewAccess= async(req,res,next)=>{
    const {id}=req.params;
    const user_id=req.user.id;
    

    try{
        const taskResult= await findTaskById(id);
        if(taskResult.rows.length===0){
            return res.status(404).json({message:"task not found"});
        }
        const task=taskResult.rows[0];
    // console.log("user_id from JWT:", user_id);
    // console.log("DB row created_by:", task.created_by);
    // console.log("DB row assigned_to:", task.assigned_to);
    // console.log("Params id:", id);
        if(String(task.created_by)!=String(user_id) && String(task.assigned_to)!=String(user_id)){
            return res.status(403).json({message:"forbidden"});
        }
        next();
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send("server error");
        
    }
};
const checkTaskOwnerAccess=async(req,res,next)=>{
    const {id}=req.params;
    const user_id=req.user.id;

    try{
        const taskResult= await findTaskById(id);
        if(taskResult.rows.length===0){
            return res.status(404).json({message:"task not found"});
        }
        const task=taskResult.rows[0];
        if(String(task.created_by)!=String(user_id)){
            return res.status(403).json({message:"forbidden"});
        }
        next();
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send("server error");
        
    }
}

module.exports={checkTaskViewAccess, checkTaskOwnerAccess};