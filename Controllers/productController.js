const products=require('../Models/prodectModel')

exports.getAllProductController=async(req,res)=>{
    try{
        const result= await products.find()
        res.status(200).json(result)
    }
    catch(err){
        res.status(401).json(err)
    }
}
exports.getLimitProductController=async(req,res)=>{
    try{
        const result= await products.find().limit(15)
        res.status(200).json(result)
    }
    catch(err){
        res.status(401).json(err)
    }
}
exports.getRecentProductsController = async (req, res) => {
    try {
        const result = await products.find().sort({ createdAt: -1 }).limit(10);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getLowPriceProductsController = async (req, res) => {
    try {
        const result = await products.find().sort({ price: 1 }).limit(10); 
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};



exports.getProductController=async(req,res)=>{
    try{
        const result=await products.findOne({id:req.params.id})
        res.status(200).json(result)
        // console.log(result);
    }catch(err){
        res.status(401).json(err)
    }
}
exports.getTrendingProductController=async(req,res)=>{
    try {
        const limits = 10;
        const trendingProducts = await products.aggregate([
            { $sample: { size: limits } }
        ]);
        res.status(200).json(trendingProducts);
    } catch (err) {
        // console.error('Error random products:', err);
        res.status(500).json(err);
    }
}