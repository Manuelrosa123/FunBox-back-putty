const express=require("express");
const token = require("../utils/generateToken");

let User = require(__dirname + "/../models/user.js");
let router = express.Router();

router.get('/', (req, res) => {
    User.find().then(result => {
        res.status(200).
            send({ users: result});
    }); 
});

router.get('/:id', (req, res) => {
    User.findById(req.params['id']).then(result => {
        res.status(200).send({user: result});
    });
});

router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id).then(result => {
        res.sendStatus(200);
    }).catch(error => {
        console.error("Error removing the user" + error);
    });
});

router.post('/login', (req, res) => {
    token.createToken(req.body.email, req.body.password)
      .then(tokenResponse => {
        if (tokenResponse) {
          res.json(tokenResponse);
        } else {
          res.status(401).send('Invalid credentials');
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Server error');
      });
  });

router.post('/', (req,res)=>{
    let newUser = new User({

        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        avatar: req.body.avatar,
    });

    newUser.save().then(result => {
        res.sendStatus(200);
    }).catch(error => {
        console.error("Error posting the user" + error);
    });
});

router.put('/:id/name', (req,res)=>{
    let name = req.body.name;

    User.findByIdAndUpdate(req.params['id'],{ name: name })
    .then(result=>{
        res.status(200)
            .send({result});
    }).catch(error =>{
        res.status(400)
            .send({error:"Error modifying the user" + error});
    });

});

router.put('/:id/email', (req,res)=>{
    let email = req.body.email;

    User.findByIdAndUpdate(req.params['id'],{ email: email })
    .then(result=>{
        res.status(200)
            .send({result});
    }).catch(error =>{
        res.status(400)
            .send({error:"Error modifying the user" + error});
    });

});

router.put('/:id/password', (req,res)=>{
    let password = req.body.password;

    User.findByIdAndUpdate(req.params['id'],{ password: password })
    .then(result=>{
        res.status(200)
            .send({result});
    }).catch(error =>{
        res.status(400)
            .send({error:"Error modifying the user" + error});
    });

});

router.put('/:id/avatar', (req,res)=>{
    let avatar = req.body.avatar;

    User.findByIdAndUpdate(req.params['id'],{ avatar: avatar })
    .then(result=>{
        res.status(200)
            .send({result});
    }).catch(error =>{
        res.status(400)
            .send({error:"Error modifying the user" + error});
    });

});

module.exports = router;