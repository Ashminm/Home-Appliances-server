const mongoose=require('mongoose')
const users=require('../Models/userModel')
const wishlist=require('../Models/wishModel')
const carts=require('../Models/cartModel')
const jwt=require('jsonwebtoken')
const admins=require('../Models/adminModel')

exports.userRegister=async(req,res)=>{
    try{
        const {username,email,password}=req.body
        const existingUser=await users.findOne({email,password})
        const existingAdmin=await admins.findOne({email,password})
        if(existingUser || existingAdmin){
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
        const existingAdmin=await admins.findOne({email,password})
        if(existingUser){
            const token=jwt.sign({userId:existingUser._id}, process.env.JWT_SEACRETKEY)
            res.status(200).json({token,existingUser,role:"user"})
            // console.log(token,existingUser);
        }
        else if(existingAdmin){
            const token=jwt.sign({userId:existingAdmin._id}, process.env.JWT_SEACRETKEY)
            res.status(200).json({token,existingAdmin,role:"admin"})
        }
        else{
            res.status(406).json("Invalid email or password!!")
        }
    }catch(err){
        res.status(401).json("SOMTHING WANT WRONG" + err);
    }
}

    exports.geUserProfile=async(req,res)=>{
        try{
            const profileId=req.payload
            const profilUser=await users.findOne({_id:profileId})
            res.status(200).json(profilUser)
        }catch(err){
            res.status(401).json(err)
           
        }
    }

    exports.updateUserProfile = async (req, res) => {
        try {
          const profileId = req.payload;
          const { profileImage, ...updateData } = req.body; 
          const updatedUserProfile = await users.findOneAndUpdate({ _id: profileId }, { $set: { profileImage, ...updateData } }, { new: true });
          res.status(200).json(updatedUserProfile);
        } catch (err) {
          res.status(401).json(err);
        }
      };
      
      exports.deleteAccount= async(req,res)=>{
        try{
            const userId = req.payload;

            const userData = await users.deleteMany({ _id: userId });
            const wishlistData=await wishlist.deleteMany({userId})
            const cartData=await carts.deleteMany({userId})
            res.status(200).json("Account delete Successfully",userData,wishlistData,cartData)
        }catch(err){
            res.status(401).json(err)
        }
      }
    