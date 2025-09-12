const {addComment,getCommentByTaskId}=require('../models/commentModel')
exports.createComment=async (req, res)=>{
    const {id}= req.params;
    const {text}= req.body;
    const user_id=req.user.id;
    if(!text){
        return res.status(400).json({message:"Comment text is required"});
    }
    try{
        
        const newComment =await addComment(id,user_id,text);
        res.status(201).json(newComment.rows[0]);
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send("server error");  
    }

};

exports.getComments= async(req,res)=>{
    const {id}=req.params;
    try{
        
        const comments= await getCommentByTaskId(id);
        res.json(comments.rows);
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("server error");  
    }
}