const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const validateregin = require("../../validation/register");
const validatelogin = require("../../validation/login");
const validateidea = require("../../validation/idea");

const User = require("../../models/User");
const Idea = require("../../models/Ideas");

router.post("/register",(req,res)=>{

    const {errors, isValid} = validateregin(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({email:req.body.email}).then(user =>{
        if(user){
            return res.status(400).json({email:"Email Already Exists"});
        }
        else{
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
              }); 
        }
    });
});

router.post("/teamapprovalreq",(req,res)=>{
  const email = req.body.email;
  const iemail = req.body.email;
  const iname = req.body.name;
  const trmembers = req.body.member;
  
  Idea.findOneAndUpdate({iname},
    {
      $addToSet:{
        trmembers:trmembers,
      }
    }
    )
    .then(upidea=>upidea.save());
  
  User.findOneAndUpdate({email},
      {
        $addToSet:{
          trmembers:trmembers,
        }
      }
      )
  .then(user=>res.json(user))
  .catch(err => console.log(err) );

  });

  router.post("/teamapproval",(req,res)=>{
    const email = req.body.email;
    const tamembers = req.body.member;

    User.findOneAndUpdate({email},
      {
        $pull:{
          trmembers:tamembers
        }
      }
      ).then(delidea => delidea.save())
      .catch(err => console.log(err) );

      User.findOneAndUpdate({email:tamembers},
        {
          $addToSet:{
            tamembers:email
          }
        }
        ).then(delide => delide.save())
        .catch(err => console.log(err) );
    
    User.findOneAndUpdate({email},
        {
          $addToSet:{
            tamembers:tamembers,
          }
        }
        )
    .then(upidea => upidea.save())
    .then(user=>res.json(user))
    .catch(err => console.log(err) );
  
    });

router.post("/idea",(req,res)=>{

  const {errors, isValid} = validateidea(req.body);

  if(!isValid){
    return res.status(400).json(errors);
  }
  const iname = req.body.iname;
  
  Idea.findOne({iname}).then( idea => {
    if(idea){
      return res.status(400).json({iname: "Idea title already taken"})
    }
    else{
      const newidea = new Idea(
        {
          iname: req.body.iname,
          icontent: req.body.icontent,
          iemail: req.body.iemail
        }
      );
      newidea.save()
      .then(idea => res.json(idea))
      .catch(err => console.log(err));
    }
  });
});

router.get("/ideas",(req,res)=>{
  Idea.find({})
  .exec(function(err,ideas){
    if(err){
      console.log("Error retrieving ideas !!!");
    }
    else{
      res.json(ideas);
    }
  })
});

router.post("/search",(req,res)=>{
  const iname = req.body.val;

  Idea.find({iname: {$regex: new RegExp(iname)}})
  .exec(function(err,ideas){
    if(err){
      console.log(err);
    }
    else{
      res.json(ideas);
    }
  })
});

router.post("/userideas",(req,res)=>{
  const iemail = req.body.email;

  Idea.find({iemail})
  .then(ideas => res.json(ideas))
  .catch(err => console.log(err));
});

router.post("/othersideas",(req,res)=>{
  const iemail = req.body.email;

  Idea.find({trmembers:{$ne:iemail},iemail:{$ne:iemail}})
  .then(user => res.json(user))
  .catch(err => console.log(err));
});

router.post("/teamrequests",(req,res)=>{
  const email = req.body.email;

  User.findOne({email:email})
  .then(user =>  {
    const payl=Object.values(user.trmembers);
    res.json(payl)})
  .catch(err => console.log(err));
});

router.post("/teammembers",(req,res)=>{
  const email = req.body.email;

  User.findOne({email:email},{tamembers:1,_id:0})
  .then(user => {
    const payl=Object.values(user.tamembers);
    res.json(payl)})
  .catch(err => console.log(err));
});

router.post("/teamnames",(req,res)=>{
  const email = req.body.email;

  User.findOne({email:email},{name:1,_id:0})
  .then(user => {
    res.json(user)})
  .catch(err => console.log(err));
});

router.post("/login", (req, res) => {
    // Form validation
  const { errors, isValid } = validatelogin(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const email = req.body.email;
    const password = req.body.password;
  // Find user by email
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
  // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name,
            email:user.email
          };
  // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 3600 // 1 hour in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });


  module.exports = router;