var express=require("express");
var bodyParser=require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ordered');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})

var app=express()
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
  
app.post('/order', function(req,res){
    var Name = req.body.name;
    var Email =req.body.email;
   var Address=req.body.address;
   var Product=req.body.product;
   var Model=req.body.model;
   var Quantity=req.body.quantity;
   var Payment=req.body.payment
   
    var data = {
        "Name": Name,
        "Email":Email,
       "Address":Address,
       "Product":Product,
       "Model":Model,
       "Quantity":Quantity,
       "Payment": Payment,


    

    }
db.collection('Booking Appointment').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");       
    });
     return res.redirect('success.html');
     
})
app.listen(8000);
console.log("server listening at port 8000");
