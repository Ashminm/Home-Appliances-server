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

exports.deleteCartItem=async(req,res)=>{
    try{
        const cartId=req.params.id
        const cartDelete=await carts.findOneAndDelete({_id:cartId})
        res.status(200).json(cartDelete)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.incQuantity=async(req,res)=>{
    try{
        const cartId = req.params.id 
        const existingItem= await carts.findOne({_id:cartId})
        existingItem.quantity++
        existingItem.totalPrice= existingItem.price* existingItem.quantity
        await existingItem.save()
        res.status(200).json("Quantity Increased")
    }catch(err){
        res.status(401).json(err)
    }

}

exports.decQuantity=async(req,res)=>{
    try{
        const cartId = req.params.id 
        const existingItem= await carts.findOne({_id:cartId})
        existingItem.quantity--
       if(existingItem.quantity==0){
        const result = await carts.findOneAndDelete({_id:cartId}) 
        res.status(200).json("Item deleted by quantity 0")
       } else{
        existingItem.totalPrice= existingItem.price* existingItem.quantity
        await existingItem.save()
        res.status(200).json("Quantity Decreased")
       }
    }catch(err){
        res.status(401).json(err)
    }
}

//    client view component side quantity Decrease
// exports.decViewQuantity = async (req, res) => {
//     try {
//         const cartId = req.params.id;
//         const existingItem = await carts.findOne({ _id: cartId });
//         existingItem.quantity--;
//         if (existingItem.quantity <= 0) {
//             existingItem.quantity = 1;
//             res.status(200).json({ message: "Low quantity", isLowQuantity: true });
//         } else {
//             existingItem.totalPrice = existingItem.price * existingItem.quantity;
//             await existingItem.save();
//             res.status(200).json({ message: "Quantity Decreased", isLowQuantity: false });
//         }
//     } catch (err) {
//         res.status(500).json(err);
//     }
// };

// ---------------------end---------------------------------

exports.emptyCart=async(req,res)=>{
    try{
        const userId = req.payload
        const result=await carts.deleteMany({userId})
        res.status(200).json(result+"Empty Cart")
    }catch(err){
        res.status(401).json(err)
    }

}