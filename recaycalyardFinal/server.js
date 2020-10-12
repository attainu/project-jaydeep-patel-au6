var express = require("express");
const mongoose = require("mongoose");
var user=require('./models/user')
var post=require('./models/post')
var auth=require('./routes/auth')
var post=require('./routes/post')
var bodyParser = require('body-parser')
const { MONGO_URL} = require('./config/keys.js')
var app = express();

app.use(express.json())
app.use('/',auth)
app.use('/',post)

// config .env
require('dotenv').config({
  path : './config/config.env'
})


mongoose.connect( MONGO_URL, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
mongoose.connection.on("connected", () => {
  console.log("CONNECTED TO DATA BASE ");
});
mongoose.connection.on("error", (err) => {
  console.log("oops! error occured",err);
});

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))
 
// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
 
// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

if(process.env.NODE_ENV=="production"){
  app.use(express.static('client/build'))
  const path = require('path')
  app.get("*",(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

//backend server port
var port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listining to port ${port}`);
});
