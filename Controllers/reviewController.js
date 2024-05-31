const reviews=require('../Models/reviewModel')

exports.addReview=async(req,res)=>{
    const {id,title,reviewTitle,description,username,image}=req.body
    try{
        const existingReview=await reviews.findOne({username,title,id})
        if(existingReview){
            res.status(406).json("You have entered reviewe it once")
        }else{
            const newReview=new reviews({id,title,reviewTitle,description,username,image})
            await newReview.save()
            res.status(200).json(newReview)
        }
    }catch(err){
        res.status(401).json("Something want wrong:"+ err)
    }
}

exports.getProductBaseReview = async (req, res) => {
    try {
        const result = await reviews.find();
        res.status(200).json(result);
    } catch(err) {
        res.status(500).json(err);
    }
};


exports.deleteReview=async(req,res)=>{
    try{
        const reviewId=req.params.id
        const result=await reviews.findOneAndDelete({_id:reviewId})
        res.status(200).json(result)
    }catch(err){
        res.status(401).json(err)
    }
}