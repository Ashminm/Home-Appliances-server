const mongoose=require('mongoose')

const adminSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
        trim: true,
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    profileImage:{
        type:String
    }
})

const admins=mongoose.model('admins',adminSchema)
module.exports=admins