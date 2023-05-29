const { default: mongoose } = require("mongoose");

let userSchema= new mongoose.Schema({

    name:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
    email:{
        type:String,
        required:true,
        pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlength:4,
        trim:true
    },
    avatar:{
        type:String,
        required:true,
        trim:true
    }
});

let User = mongoose.model('users', userSchema);

module.exports = User,userSchema;