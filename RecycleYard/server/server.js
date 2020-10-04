var express = require("express");
const mongoose = require("mongoose");
var user=require('./models/user')
var post=require('./models/post')
var auth=require('./routes/auth')
var post=require('./routes/post')
var app = express();

app.use(express.json())
app.use('/',auth)
app.use('/',post)

mongoose.connect("mongodb+srv://jppatel147:jppatel147@cluster0.k9h7f.mongodb.net/attainu?retryWrites=true&w=majority", {
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

if(process.env.NODE_ENV=="production"){
  app.use(express.static('client/build'))
  const path = require('path')
  app.get("*",(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

var port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listining to port ${port}`);
});
