const joi= require('joi');
const {email,password,name}=require('./schema');
const registerSchema=joi.object({name,email,password});
function validateRegister(data){
    return registerSchema.validate(data);
}
module.exports=validateRegister;