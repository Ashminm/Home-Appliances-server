require('dotenv').config()
const express=require('express')
const cors=require('cors')
require('./connection/db')
const router=require('./Routes/route')

const Home=express()
Home.use(cors())
Home.use(express.json())
Home.use(router)
const PORT=3000 || process.env.PORT

Home.listen(PORT,()=>{
    console.log("Home Server started at:",PORT);
})

Home.get("/",(req,res)=>{
    res.send("<h1>Home Started................ Waiting for Client Request...!!</h1>")
})