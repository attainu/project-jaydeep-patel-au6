var express = require("express");
var jwt = require("jsonwebtoken");
const { Router } = require("express");
const mongoose = require("mongoose");
var User = require("../models/user"); //USER COLLECTION
var requireLogin = require("../middleware/requireLogin"); //Middleware
const bcrypt = require("bcrypt");
var route = express.Router();

route.get("/protected", requireLogin, (req, res) => {
  res.send("hello user");
});

route.get("/", (req, res) => {
  res.send("hello");
});

//Sign_Up

route.post("/signUp", (req, res) => {
  var { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({ error: "Please add all the field" });
  }
  res.json({ message: "successfuly posted" });
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: "email_Id already exist" });
      }
      bcrypt.hash(password, 10).then((hashpassword) => {
        var user = new User({
          name,
          email,
          password: hashpassword,
          pic,
        });
        user
          .save()
          .then((user) => {
            console.log(user);
            res.json({ message: "SAVED SUCCESSFULLY" });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

//Sign_In

route.post("/signIn", (req, res) => {
  var { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please add email or password" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    // console.log(savedUser)
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid email or password " });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          // res.status(200).json({ message: "successfully signed in" });
          var token = jwt.sign({ _id: savedUser._id }, "shhhhh");
          var { _id, name, email, followers, follwing, pic } = savedUser;
          //console.log( _id, name, email)
          res.json({
            token,
            user: { _id, name, email, followers, follwing, pic },
          });
        } else {
          res.status(422).json({
            error: "Invalid email or password",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

module.exports = route;
