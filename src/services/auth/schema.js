const joi=require('joi');
const email=joi.string().required();
const password=joi.string.min(6).required();
const name=joi.string.min(2).max(50).required();
module.exports={email,password,name};
