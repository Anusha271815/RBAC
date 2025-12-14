const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    email:{
        type:String,    
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,  
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true
      },
});

const Custom=mongoose.model('Custom',userSchema);

module.exports=Custom;