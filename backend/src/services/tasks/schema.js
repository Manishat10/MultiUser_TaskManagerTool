const joi=require('joi');
const title=joi.string().min(3).max(100).required();
const description=joi.string().max(1000).allow('').optional();
const due_date=joi.date().iso().required();
const assignedTo=joi.number().integer().optional();
const status=joi.string().valid('pending','in_progress','done').optional();
module.exports={title,description,due_date,assignedTo,status};
