const express=require('express');
const app=express();
const mongoose=require('mongoose');
require('dotenv').config();
const cors = require('cors');  
const connectDB=require('./config/db')

const router = require('./modules/route');
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));

app.use(express.json());
app.use('/api/auth', router);



app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.port}`);
})