const reviews = require("../Models/reviewModel");

exports.addReview = async (req, res) => {
    const { id, title, reviewTitle, description, username, image,productId  } = req.body;
    const userId = req.payload; 

    try {
        const existingReview = await reviews.findOne({productId});
        if (existingReview) {
            res.status(406).json("You have already reviewed this product.");
            // console.log(existingReview);
        } else {
            const newReview = new reviews({id, title, reviewTitle, description, username, image, userId,productId  });
            await newReview.save();
            res.status(200).json(newReview);
        }
    } catch (err) {
        res.status(401).json("Something went wrong");
        console.log(err);
    }
};

exports.getProductBaseReview = async (req, res) => {
    try {
        const result = await reviews.find();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const result = await reviews.findOneAndDelete({ _id: reviewId });
        res.status(200).json(result);
    } catch (err) {
        res.status(401).json(err);
    }
};

exports.yourReviws = async (req, res) => {
    try {
        const userId = req.payload;
        // console.log(userId);
        const yourReviw = await reviews.find({ userId });
        res.status(200).json(yourReviw);
        // console.log(yourReviw);
    } catch (err) {
        res.status(401).json(err);
    }
};

exports.clearAllReviews=async(req,res)=>{
    try{
        const result =await reviews.deleteMany()
        res.status(200).json(result)
    }catch(err){
        res.status(401).json(err)
    }
}
