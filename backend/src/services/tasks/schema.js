const joi=require('joi');
const title=joi.string().min(3).max(100).required().pattern(new RegExp('^[a-zA-Z ]+$')).required().messages({
        'string.pattern.base': 'Name must contain only letters and spaces.',
        'string.min': 'Name must be at least {#limit} characters long.',
        'string.max': 'Name must be at most {#limit} characters long.'
    });
const description=joi.string().max(1000).required();
const due_date=joi.date().iso().required();
const assigned_to=joi.number().integer().optional();
const status=joi.string().valid('pending','in_progress','done').optional();
module.exports={title,description,due_date,assigned_to,status};
