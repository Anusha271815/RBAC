const express=require('express');
const app=express();
const mongoose=require('mongoose');
const router = require('./modules/route');
require('dotenv').config();

app.use(express.json());
app.use('/api/auth', router);

async function connectDB(){
    try{
        const connectionDb=await mongoose.connect(process.env.db_url);
        console.log("MongoDB connected: " + connectionDb.connection.host);
    }catch(err){
        console.error("Error connecting to MongoDB: ", err);
        process.exit(1);
    };
}
connectDB();


app.listen(process.env.port,()=>{
    console.log(`Server is running on port ${process.env.port}`);
})