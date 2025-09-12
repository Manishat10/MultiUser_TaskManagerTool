module.exports=function validateRequest(validator,property='body'){
    return (req,res,next)=>{
        const {error}=validator(req[property]);
        if(error){
            return res.status(400).json({message:error.details.message});
        }
        next();
    };
};