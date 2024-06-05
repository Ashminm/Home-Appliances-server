const contacts=require('../Models/contactModel')

exports.addContact=async(req,res)=>{
    const {firstname,lastname,email,subject,messege}=req.body

    try{ 
        const newContact=new contacts({firstname,lastname,email,subject,messege})
        await newContact.save()
        res.status(200).json(newContact)
    }catch(err){
        res.status(401).json("Something Went Wrong. Please try after some times..!!")
    }
}

exports.deleteFeed=async(req,res)=>{
    try{
        const feedId=req.params.id
        const result=await contacts.findOneAndDelete({_id:feedId})
        res.status(200).json(result)
    }catch(err){
        res.status(401).json(err)
    }
}
exports.deleteAll=async(req,res)=>{
    try{

        const result=await contacts.deleteMany()
        res.status(200).json(result)
    }catch(err){
        res.status(401).json(err)
    }
}
