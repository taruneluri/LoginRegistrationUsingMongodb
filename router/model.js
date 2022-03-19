const mongoose=require('mongoose');
var Schema=mongoose.Schema;
const newuser=new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    contactNumber:{
        type:Number,
        required:true
    },
    usermail:{
        type:String,
        required:true
    },
    userpassword:{
        type:String,
        required:true
    }
});
module.exports = mongoose.model('newuser',newuser);