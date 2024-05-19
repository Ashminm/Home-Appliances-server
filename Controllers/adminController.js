const admins=require('../Models/adminModel')
const users = require('../Models/userModel')
const products=require('../Models/prodectModel')

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