const carts=require('../Models/cartModel')

exports.addToCart=async(req,res)=>{
    const { id, title, price, category, tag, image, quantity} = req.body;
    const userId = req.payload;
    try{
        const existingProduct=await carts.findOne({id,userId})
        if(existingProduct){
            existingProduct.quantity++
            existingProduct.totalPrice=existingProduct.quantity * existingProduct.price
            await existingProduct.save()
            res.status(200).json(existingProduct)
        }else{
            const newcart=new carts({
                id, title, price, category, tag, image, quantity, totalPrice:price, userId
            })
            newcart.save()
            res.status(200).json("Item Added to cart")
        }
    }catch(err){
        console.log(err);
        res.status(401).json(err)
    }
};

exports.getCartAll=async(req,res)=>{
    try{
        const userId=req.payload
        const cartProduct= await carts.find({userId})
        res.status(200).json(cartProduct)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.getHomeCart=async(req,res)=>{
    try{
        const cartProduct= await carts.find().limit(4)
        res.status(200).json(cartProduct)
    }catch(err){
        res.status(401).json(err)
    }
}