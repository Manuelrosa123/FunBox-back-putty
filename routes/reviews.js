const express=require("express");

let Review = require(__dirname + "/../models/review.js");
let router = express.Router();

router.get('/', (req, res) => {
    Review.find().then(result => {
        res.status(200).
            send({ reviews: result});
    }); 
});

router.get('/:id', (req, res) => {
    Review.findById(req.params['id']).then(result => {
        res.status(200).send({review: result});
    });
});

router.post('/', (req,res)=>{
    let newReview = new Review({

        title:req.body.title,
        image:req.body.image,
        description:req.body.description,
        public:req.body.public,
        reviewText:req.body.reviewText,
        type:req.body.type,

        launchDate:req.body.launchDate,
        reviewDate:req.body.reviewDate,
        creator:req.body.creator,
        stars:req.body.stars,

        likes:req.body.likes,
        genre:req.body.genre,
        duration:req.body.duration,
        pages:req.body.pages,
        chapters:req.body.chapters,

        originalCreator:req.body.originalCreator,
        cast:req.body.cast,
        
    });

    newReview.save().then(result => {
        res.sendStatus(200);
    }).catch(error => {
        console.error("Error posting the review" + error);
    });
});

router.put('/:id', (req,res)=>{
    
    let modifiedReview = {
        title:req.body.title,
        image:req.body.image,
        description:req.body.description,
        public:req.body.public,
        reviewText:req.body.reviewText,
        type:req.body.type,

        launchDate:req.body.launchDate,
        reviewDate:req.body.reviewDate,
        creator:req.body.creator,
        stars:req.body.stars,

        likes:req.body.likes,
        genre:req.body.genre,
        duration:req.body.duration,
        pages:req.body.pages,
        chapters:req.body.chapters,

        originalCreator:req.body.originalCreator,
        cast:req.body.cast,
    }

    Review.findByIdAndUpdate(req.params['id'], modifiedReview, {new:true})
    .then(result=>{
        res.status(200)
            .send({result});
    }).catch(error =>{
        res.status(400)
            .send({error:"Error modifying the review" + error});
    });

});

router.delete('/:id', (req, res) => {
    Review.findByIdAndRemove(req.params.id).then(result => {
        res.sendStatus(200);
    }).catch(error => {
        console.error("Error removing the review" + error);
    });
});

module.exports = router;