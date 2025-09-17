const UserService = require('../services/auth/userService');
exports.registerUser = async (req, res) => {
  try {
    const user = await UserService.register(req.body);
    res.status(201).json({ user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const {token,user} = await UserService.login(req.body);
    console.log("Generated Token:", token);
    res.cookie('token',token,{httpOnly:true,sameSite:'strict',maxAge:1*60*60*1000,});
    res.json({ user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.logoutUser= async(req,res)=>{
  try{
    res.clearCookie('token',{
      httpOnly:true,
      sameSite:'strict',
      secure:true
    });
    await UserService.logout(req.token);
    res.status(200).json({message:"Logout Successful"});
  }
  catch(err){
    res.status(500).json({message:"Failed to log out"});
  }
};