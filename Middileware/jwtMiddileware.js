const jwt=require('jsonwebtoken')

const jwtMiddileware=(req,res,next)=>{
    try{
        const token=req.headers['authorization'].split(" ")[1]
    if(token){
        const jwtResponse=jwt.verify(token,process.env.JWT_SEACRETKEY)
        req.payload=jwtResponse.userId
        next()
    }
    else{
        res.status(401).json("Token not Available!")
    }
    }catch(err){
        res.status(401).json("Authorization faild!! please Login....")
    }
} 

module.exports=jwtMiddileware