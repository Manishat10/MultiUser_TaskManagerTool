const pool= require('../config/db');

const findUserByEmail=async(email)=>{
    return pool.query('SELECT *FROM users WHERE email=$1',[email]);
}

const createUser=async (name,email,hashedPassword)=>{
    return pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
        [name, email, hashedPassword]
    );
};
module.exports={findUserByEmail,createUser};