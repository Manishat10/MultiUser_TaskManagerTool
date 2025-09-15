const joi=require('joi');
const email=joi.string().email().lowercase().trim().required();
const password=joi.string().min(6).max(30).pattern(
    new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#@!])[A-Za-z\\d#@!]{6,}$')
).required().messages({
    'string.min':'Password must be atleast {#limit} characters long',
    'string.max':'password must be at most {#limit} characters long',
    'string.pattern.base':'please enter a valid password'

});
const name=joi.string().min(2).max(50).pattern(new RegExp('^[a-zA-Z ]+$')).required().messages({
        'string.pattern.base': 'Name must contain only letters and spaces.',
        'string.min': 'Name must be at least {#limit} characters long.',
        'string.max': 'Name must be at most {#limit} characters long.'
    });
module.exports={email,password,name};

