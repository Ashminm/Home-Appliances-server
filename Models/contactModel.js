const mongoose=require('mongoose')

const contactShema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String
    },
    email:{
        type:String,
        required:true,
        lowercase: true,
        trim: true
    },
    subject:{
        type:String,
        required:true
    },
    messege:{
        type:String,
        required:true
    }
})

const contacts=mongoose.model('contacts',contactShema)
module.exports=contacts