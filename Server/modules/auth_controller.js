const User=require('./model');
const jwt=require('jsonwebtoken');
require('dotenv').config();

async function registerUser(req,res){
    const {email,password,role}=req.body;
    
    try{
        const existingUser=await User.findOne({email:email});
        if(existingUser){
            return  res.status(400).json({message:"User already exists"});
        }
        const newUser=new User({email,password,role});
        await newUser.save();
        console.log("registered");
        res.status(201).json({message:"User registered successfully"});
    }
    catch(err){
        res.status(500).json({message:"Error registering user",error:err.message});
    }   
}

async function loginUser(req,res){
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email:email});
        if(!user || user.password!==password){
            return res.status(401).json({message:"Invalid email or password"});
        }
        const payload={userId:user._id,role:user.role};
        const token=jwt.sign(payload,process.env.jwt_secret,{expiresIn:'1h'});
        res.status(200).json({message:"Login successful",token:token});
    }
    catch(err){
        res.status(500).json({message:"Error logging in",error:err.message});
    }
}

module.exports={registerUser,loginUser};