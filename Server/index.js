const express=require('express');
const app=express();
const mongoose=require('mongoose');
require('dotenv').config();
const cors = require('cors');  
const connectDB=require('./config/db')

const router = require('./routes/auth_route');

app.use('/api', require('./routes/product_route'));
app.use('/api', require('./routes/order_route'));
app.use('/api', require('./routes/admin_route'));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));

app.use(express.json());
app.use('/api/auth', router);



app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.port}`);
})