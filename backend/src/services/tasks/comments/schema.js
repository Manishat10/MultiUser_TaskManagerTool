const joi=require('joi');
const text=joi.string().min(1).max(500).required();
module.exports={text};