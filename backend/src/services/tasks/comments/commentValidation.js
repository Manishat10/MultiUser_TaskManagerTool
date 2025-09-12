const joi=require('joi');
const {text}=require('./schema');
const commentSchema=joi.object({text});
function validateComment(data){
    return commentSchema.validate(data);
}
module.exports=validateComment;