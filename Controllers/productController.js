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

exports.getProductController=async(req,res)=>{
    try{
        const result=await products.findOne({id:req.params.id})
        res.status(200).json(result)
        // console.log(result);
    }catch(err){
        res.status(401).json(err)
    }
}