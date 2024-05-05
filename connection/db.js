const mongoose=require('mongoose')

const connectionString=process.env.DATABASE

mongoose.connect(connectionString).then((res)=>{
    console.log("Home Successfully connected with Atles..!");
}).catch((err)=>{
    console.log(err);
})