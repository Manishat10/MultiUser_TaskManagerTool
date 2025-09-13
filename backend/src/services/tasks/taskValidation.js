const joi=require('joi');
const {title,description,due_date,assigned_to,status}=require('./schema');
const createTaskSchema=joi.object({
    title,
    description,
    due_date,
    assigned_to:assigned_to.optional(),
    status
});
function validateCreateTask(data){
    return createTaskSchema.validate(data);
};
module.exports=validateCreateTask;