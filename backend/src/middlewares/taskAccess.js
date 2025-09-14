const TaskRepository = require('../repositories/TaskRepository'); // Assuming this is the correct path
const checkTaskViewAccess= async(req,res,next)=>{
    const {id}=req.params;
    const user_id=req.user.id;
    try{
        const taskResult= await TaskRepository.findTaskById(id);
        if(!taskResult){
            return res.status(404).json({message:"task not found"});
        }
    // console.log("user_id from JWT:", user_id);
    // console.log("DB row created_by:", task.created_by);
    // console.log("DB row assigned_to:", task.assigned_to);
    // console.log("Params id:", id);
        if(String(taskResult.created_by.id)!=String(user_id) && String(taskResult.assigned_to.id)!=String(user_id)){
            return res.status(403).json({message:"forbidden"});
        }
        req.taskResult=taskResult;
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
        const taskResult= await TaskRepository.findTaskById(id);
        if(!taskResult){
            return res.status(404).json({message:"task not found"});
        }
        if(String(taskResult.created_by.id)!=String(user_id)){
            return res.status(403).json({message:"forbidden"});
        }
        req.taskResult=taskResult;
        next();
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send("server error");
        
    }
}

module.exports={checkTaskViewAccess, checkTaskOwnerAccess};