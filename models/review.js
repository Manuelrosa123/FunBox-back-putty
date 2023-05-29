const { default: mongoose } = require("mongoose");
const {userSchema, User} = require("./user");

let reviewSchema= new mongoose.Schema({

    //mongoID,

    title:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
    image:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true,
        minlength:1,
        maxlength:45
    },
    public:{
        type:Boolean,
        required:true
    },
    reviewText:{
        type:String,
        required:true,
        trim:true,
        minlength:1,
        maxlength:3000
    },
    type:{
        type:String,
        required:true,
        enum:["Videogame","Anime","Manga","Book","Series","Film"/*,"Comic" BoardGames,Videos,Podcasts*/]
    },
    launchDate:{
        type:Date,
    },
    reviewDate:{
        type:Date,
    },
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    stars:{
        type:Number,
        min:0
    },
    likes:{
        type:Number,
        min:0,
        required:true
    },
    genre:{
        type:[String],
    },
    duration:{ 
        type:Number,
        min:0
    },
    pages:{
        type:Number,
        min:0
    },
    chapters:{
        type:Number,
        min:0
    },
    originalCreator:{ //author,director,developers, drawers, animators
        type:[String]
    },
    cast:{
        type:[String]
    },

});

let Review = mongoose.model('reviews', reviewSchema);

module.exports = Review;