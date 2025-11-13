const jwt= require('jsonwebtoken');
const tokenStore=require('../services/tokens/tokenStore');
const UserRepository = require('../repositories/UserRepository');

const authMiddleware= async (req,res,next)=>{
    const token= req.cookies?.token;
    console.log("Token from cookie:", token);
    if(!token) return res.status(401).json({message:'authorization denied'});
    try{
        if(tokenStore.isTokenBlackListed(token)){
            return res.status(401).json({message:'Please login again'});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        // Fetch user from database to get current isAdmin status
        const user = await UserRepository.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({message:'User not found'});
        }
        req.user ={id:user.id, isAdmin: user.isAdmin};
        req.token=token;
        next();
    }
    catch(err){
       return res.status(401).json({message:'Token is not valid'});
    }
};
module.exports=authMiddleware;