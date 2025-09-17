const jwt= require('jsonwebtoken');
const tokenStore=require('../services/tokens/tokenStore');
const authMiddleware= (req,res,next)=>{
    const token= req.cookies?.token;
    console.log("Token from cookie:", token);
    if(!token) return res.status(401).json({message:'No token, authorization denied'});
    try{
        if(tokenStore.isTokenBlackListed(token)){
            return res.status(401).json({message:'Please login again'});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user ={id:decoded.userId};
        req.token=token;
        next();
    }
    catch(err){
       return res.status(401).json({message:'Token is not valid'});
    }
};
module.exports=authMiddleware;

