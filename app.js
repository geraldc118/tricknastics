//jshint esversion: 6
const express = require("express");
const bodyParser= require("body-parser");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});


app.post("/",function(req,res){

const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;

const data = {
  members: [
  {
    email_address: email,
    status: "subscribed",
    merge_fields:{
      FNAME: firstName,
      LNAME: lastName
    }
  }
  ]

};
const jsonData = JSON.stringify(data);

const url="https://us7.api.mailchimp.com/3.0/lists/8a3fa426ec";

const options = {
method: "POST",
auth:"gerald:114124b7eeca5f2935f8c641bd09cb0f-us7"
};

const request = https.request(url,options,function(response){

 if (response.statusCode == 200){
     res.sendFile(__dirname + "/success.html");
 }   else{
     res.sendFile(__dirname + "/failure.html");
 }

 response.on("data",function(data){
 console.log(JSON.parse(data));
  });
});

request.write(jsonData);
request.end();

});

app.post("/failure.html",function (req,res){
  res.redirect("/");

});

const PORT = app.listen(process.env.PORT || 5000,function(){
  console.log("This server is running on port 5000.");
});
