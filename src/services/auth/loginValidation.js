const joi= require('joi');
const {email,password}=require('./schema');
const loginSchema=joi.object({email,password});
function validateLogin(data){
    return loginSchema.validate(data);
}
module.exports=validateLogin;
