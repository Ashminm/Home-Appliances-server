const admins=require('../Models/adminModel')
const users = require('../Models/userModel')
const products=require('../Models/prodectModel')
const mongoose=require('mongoose')
const reviews=require('../Models/reviewModel')

exports.getAdminProfile=async(req,res)=>{
    try{
        const profileId=req.payload
        const profilAdmin=await admins.findOne({_id:profileId})
        res.status(200).json(profilAdmin)
    }catch(err){
        res.status(401).json(err)     
    }
}


exports.updateAdminProfile = async (req, res) => {
    try {
      const profileId = req.payload;
      const { profileImage, ...updateData } = req.body; 
      const updatedAdminProfile = await admins.findOneAndUpdate({ _id: profileId }, { $set: { profileImage, ...updateData } }, { new: true });
      res.status(200).json(updatedAdminProfile);
    } catch (err) {
      res.status(401).json(err);
    }
  };

  exports.deleteAdminAccount= async(req,res)=>{
    try{
        const AdminId = req.payload;
        const AdminData = await admins.deleteMany({ _id: AdminId });
        const wishlistData=await wishlist.deleteMany({AdminId})
        const cartData=await carts.deleteMany({AdminId})
        res.status(200).json("Account delete Successfully",AdminData,wishlistData,cartData)
    }catch(err){
        res.status(401).json(err)
    }
  }

  exports.getAllUsers=async(req,res)=>{
    try{
      const result=await users.find()
      res.status(200).json(result)
      console.log(result);
    }
    catch(err){
      res.status(401).json(err)
    }
  }

  exports.addProduct=async(req,res)=>{
    const {title,id,category,tag,rating,price,description,image,photos}=req.body

    try{
      const existingProduct=await products.findOne({id})
      if(existingProduct){
        res.status(406).json("Existing Product Id")
      }
      else{
        const newProduct=new products({title,id,category,tag,rating,price,description,image,photos})
        await newProduct.save()
        res.status(200).json(newProduct)
      }
    }catch(err){
      res.status(401).json("Something want Wrong :"+ err)
    }
  }  

  
  exports.editProduct = async (req, res) => {
    const { title, category, tag, rating, price, description, image, photos } = req.body;
    const { id } = req.params;
  
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid product ID' });
      }
  
      const result = await products.findByIdAndUpdate(
        id, 
        { title, category, tag, rating, price, description, image, photos },
        { new: true, runValidators: true } 
      );
  
      if (!result) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

exports.deleteProduct=async(req,res)=>{
    try{
      const pId=req.params.id
      const pItemDelete=await products.findOneAndDelete({_id:pId})
      res.status(200).json(pItemDelete)
    }catch(err){
      res.status(401).json(err)
    }
  }


  exports.deleteUserAccount= async(req,res)=>{
    try{
        const userId = req.params.id;
        const userDelete = await users.findOneAndDelete({ _id:userId});
        res.status(200).json(userDelete)
        // console.log(userDelete);
    }catch(err){
        res.status(401).json(err)
    }
  }

  exports.allreviews=async(req,res)=>{
    try{
        const yourReviw=await reviews.find()
        res.status(200).json(yourReviw)
        // console.log(yourReviw);
    }catch(err){
        res.status(401).json(err)
    }
}