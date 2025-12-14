
const mongoose=require('mongoose');
require('dotenv').config();


async function connectDB(){
    try{
        const connectionDb=await mongoose.connect(process.env.db_url);
        console.log("MongoDB connected: " + connectionDb.connection.host);
    }catch(err){
        console.error("Error connecting to MongoDB: ", err);
        process.exit(1);
    };
}
module.exports= connectDB();