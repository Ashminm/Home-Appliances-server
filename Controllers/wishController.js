const wishlist = require("../Models/wishModel");

exports.addToWishlist = async (req, res) => {
    const { id, title, price, category, tag, image} = req.body;
    const userId = req.payload;

    try {
        const existingProduct = await wishlist.findOne({ userId, id });

        if (existingProduct) {
            return res.status(406).json({ message: "Product already exists in wishlist."});
        }
        const newItem = new wishlist({ id, title, price, category, tag, image, userId});
        await newItem.save();

        return res.status(201).json(newItem);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while adding to the wishlist."});
    }
}; 

exports.getWishItem=async(req,res)=>{
    try{
        const userId=req.payload
        const wishListProduct= await wishlist.find({userId})
        res.status(200).json(wishListProduct)
        // console.log(wishListProduct);
    }catch(err){
        res.status(401).json(err)
    }
}

exports.getWishHome=async(req,res)=>{
    try{
        const userId=req.payload
        const wishListProduct= await wishlist.find({userId}).limit(4)
        res.status(200).json(wishListProduct)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.deleteWishItem=async(req,res)=>{
    try{
        const wishId=req.params.id
        const wishDelete=await wishlist.findOneAndDelete({_id:wishId})
        res.status(200).json(wishDelete)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.clearCollection = async (req, res) => {
    try{
        const userId = req.payload
        const result=await wishlist.deleteMany({userId})
        res.status(200).json(result+"Empty wishlist")
    }catch(err){
        res.status(401).json(err)
    }
};

