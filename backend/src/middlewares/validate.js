module.exports=function validateRequest(validator,property='body'){
    return (req,res,next)=>{
        const {error}=validator(req[property]);
        if(error){
            const errorMessage=error.details[0].message;
            return res.status(400).json({message:errorMessage});
        }
        next();
    };
};