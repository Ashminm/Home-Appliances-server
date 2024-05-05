const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    photos: {
        type: [String],
        required: true
    }
})

const products = mongoose.model('products', productSchema);
module.exports= products