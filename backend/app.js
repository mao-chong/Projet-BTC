const express = require("express");

const app = new express();

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const Btc = require('./models/btc');

mongoose
  .connect(
    "mongodb+srv://lei:dXmYLD3vzmgQj4Uh@cluster0.ihul6.mongodb.net/btc-data",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.get('/btc',(req,res,next)=>{
  Btc.find()
  .then(result=>{
    if(!result){
      return res.status(401).json({
        message:'Get infomation of btc failed'
      })
    }
    res.status(200).json({
      result:result
    })
  })
})

app.post('/btc',(req,res,next)=>{
  console.log(req.body);
  const btc = new Btc({
    time:req.body.time,
    price:req.body.price
  })
  // console.log(btc)
  btc.save()
    .then(result=>{
      res.status(200).json({
        message:'Sauvegarder la data',
        result:result
      })
    })
})

module.exports = app;
