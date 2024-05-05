const mongoose=require('mongoose')
const users=require('../Models/userModel')
const jwt=require('jsonwebtoken')


exports.userRegister=async(req,res)=>{
    try{
        const {username,email,password}=req.body
        const existingUser=await users.findOne({email,password})
        if(existingUser){
            res.status(406).json("Already Existing user...!")
        }
        else{
            const newUser = new users({
                username,email,password
            })
            newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err){
        res.status(401).json(err)
    }
}

exports.userLogin=async(req,res)=>{
    try{
        const {email,password}=req.body
        const existingUser=await users.findOne({email,password})
        if(existingUser){
            const token=jwt.sign({userId:existingUser._id}, process.env.JWT_SEACRETKEY)
            res.status(200).json({token,existingUser})
            // console.log(token,existingUser);
        }
        else{
            res.status(406).json("Invalid email or password!!")
        }
    }catch(err){
        res.status(401).json(err)
        console.log(err);
    }
}