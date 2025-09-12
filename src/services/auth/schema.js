const joi=require('joi');
const email=joi.string().email().lowercase().trim().required();
const password=joi.string().min(6).max(30).pattern(
    new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#@!])[A-Za-z\\d#@!]{8,}$')
).required();
const name=joi.string().min(2).max(50).required();
module.exports={email,password,name};
