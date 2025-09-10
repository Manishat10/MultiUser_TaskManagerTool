// const express = require('express');
// const { Pool } = require('pg');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const app = express();
// app.use(express.json());

// // console.log('DB_USER:', process.env.DB_USER);
// // console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? process.env.DB_PASSWORD : 'Not set');
// // console.log('DB_HOST:', process.env.DB_HOST);
// // console.log('DB_NAME:', process.env.DB_NAME);
// // console.log('DB_PORT:', process.env.DB_PORT);

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });

// // Register endpoint
// app.post('/register', async (req, res) => {
//   const { name, email, password } = req.body;
//   if (!name || !email || !password) {
//     return res.status(400).json({ message: 'Please enter all fields' });
//   }

//   try {
//     const userExist = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
//     if (userExist.rows.length > 0) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = await pool.query(
//       'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
//       [name, email, hashedPassword]
//     );

//     res.status(201).json({ user: newUser.rows[0] });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// // Login endpoint
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).json({ message: 'Please enter all fields' });
//   }

//   try {
//     const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
//     if (userResult.rows.length === 0) {
//       return res.status(400).json({ message: 'Invalid Credentials' });
//     }

//     const user = userResult.rows[0];
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid Credentials' });
//     }

//     const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });
const express =require('express')
const { Pool }=require('pg');
const bcrypt =require('bcrypt');
const jwt =require('jsonwebtoken');
require('dotenv').config();

const app=express();
app.use(express.json());
// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASSWORD);
const pool= new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password:process.env.DB_PASSWORD,
  port:process.env.DB_PORT,
});

//register
app.post('/register',async(req, res)=>{
  const {name, email,password}=req.body;
  if(!name|| !email ||!password){
    return res.status(400).json({message:'please enter all fields'});
  }
  try{
    const userExist= await pool.query('SELECT * FROM users WHERE email=$1',[email]);
      if(userExist.rows.length>0){
        return res.status(400).json({message:'user already exists'});
      }
      const salt= await bcrypt.genSalt(10);
      const hanshedPassword= await bcrypt.hash(password,salt);
      const newUser =await pool.query(
        'INSERT INTO users(name,email,password) values($1,$2,$3) RETURNING id ,name,email',
        [name,email,hanshedPassword]
      );
    res.status(200).json({user:newUser.rows[0]});
  }
  catch(err){
    console.log(err.message);
    res.status(500).send('server error'); 
  }
});

//login
app.post('/login',async(req,res)=>{
  const {email,password}=req.body;
  if(!email ||!password){
    return res.status(400).json('please enter all fields');
  }
  try{
    const userResult = await pool.query('SELECT * FROM users WHERE email =$1',[email]);
    if(userResult.rows.length===0){
      return res.status(400).json({message:'Invalid Credentials'});
    }
    const user =userResult.rows[0];
    const isMatch= await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(400).json({message:'Invalid Credentials'});
    }
    const token= jwt.sign({userId:user.id}, process.env.JWT_SECRET, {expiresIn:'1h'});
    res.json({token});
  }
  catch(err){
    console.log(err.message);
    res.status(500).send('server error');
    
  }

})

const PORT =process.env.PORT|| 5000;
app.listen(PORT,()=>{
  console.log(`server started on port ${PORT}`);
}) 