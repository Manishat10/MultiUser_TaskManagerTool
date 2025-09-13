const Joi = require('joi');
const allowedStatus=['pending','in_progress','done'];
const filterTaskSchema= Joi.object({
    status:Joi.string().valid(...allowedStatus).optional(),
    assigned_to:Joi.number().integer().optional()
});
function validateFilterTask(query){
    return filterTaskSchema.validate(query);
}
module.exports=validateFilterTask;

