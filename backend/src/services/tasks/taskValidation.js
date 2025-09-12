const joi=require('joi');
const {title,description,due_date,assignedTo,status}=require('./schema');
const createTaskSchema=joi.object({
    title,description,due_date,assignedTo,status
});
function validateCreateTask(data){
    return createTaskSchema.validate(data);
};
module.exports=validateCreateTask;