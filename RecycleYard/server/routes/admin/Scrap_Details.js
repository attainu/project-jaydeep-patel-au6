var express = require("express");
const mongoose = require("mongoose");
var Scrap = require("../models/scrap_Data");
var requireLogin = require("../middleware/requireLogin");
var adminRoute = express.Router();

//ALL_POST

adminRoute.get("/adminAllData", requireLogin, (req, res) => {
    Scrap.find()
    .populate("postedBy", "_id name")
    .then((posts) => {
      res.status(200).json({ posts });
    })
    .catch((error) => {
      console.log(error);
    });
});



module.exports =adminRoute;
