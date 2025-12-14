const Custom=require('../models/user_model');
const Role=require('../models/role');
const jwt=require('jsonwebtoken');
require('dotenv').config();

async function registerUser(req,res){
    const {email,password,role}=req.body;
    try{
        console.log(req.body);
        const existingUser=await Custom.findOne({email:email});
        if(existingUser){
            return  res.status(400).json({message:"User already exists"});
        }
        
        const userRole = await Role.findOne({ name: role || 'buyer' });
        const newUser=await new Custom({email,password,role: userRole._id});
        console.log(newUser);
        await newUser.save();
        console.log("registered");
        res.status(201).json({message:"User registered successfully"});
    }
    catch (err) {
        console.error("Register Error FULL:", err);
        res.status(500).json({
          message: "Error registering user",
          error: err.message
        });
      }
         
}

async function loginUser(req,res){
    const {email,password}=req.body;
    try{
        console.log(req.body);
        const user=await Custom.findOne({email:email}).populate('role');
        if(!user || user.password!==password){
            return res.status(401).json({message:"Invalid email or password"});
        }
        const payload={
            id: user._id,
            role: user.role.name,
            permissions: user.role.permissions
          };
        const token=jwt.sign(payload,process.env.jwt_secret,{expiresIn:'3h'});
        res.status(200).json({
            message: "Login successful",
            token,
            user: user,
          });
      
    }
    catch(err){
        res.status(500).json({message:"Error logging in",error:err.message});
    }
}

module.exports={registerUser,loginUser};