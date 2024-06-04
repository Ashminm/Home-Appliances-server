const mongoose=require('mongoose')

const reviewSchema=new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    productId: { 
        type: Number,
        required: true
    },
    title:{
        type:String,
        required:true
    },
    reviewTitle:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    userId: {
        type: String,
        required: true,  
    }
})

const reviews = mongoose.model('reviews',reviewSchema);
module.exports=reviews