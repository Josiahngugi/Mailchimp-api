const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");

})

app.post("/", function(req, res){
  const fname= req.body.fname;
  const sname = req.body.sname;
  const email = req.body.email;

  const data = {
    members:[{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME : fname,
        LNAME : sname  }
  }]
};

    JsonData = JSON.stringify(data)
   console.log(JsonData);

   let url =" https://us1.api.mailchimp.com/3.0/lists/5b963378f2";

  const option = {
        method: "POST",
        auth: "maina:82febbc1a7c597b71204e9c9287314a0-us1"
  }

  const request = https.request(url, option, function(response){
     response.on("data", function(data){

       if (response.statusCode === 200){
         res.sendFile(__dirname + "/success.html");
       }
       else{
         res.sendFile(__dirname + "/failure.html");
       }
     })
  })

    request.write(JsonData);
    request.end();
})

app.post("/failure", function(req, res){
  res.redirect("/");
})

app.listen(3000,function(){
  console.log("server is running on port 3000");
})

// api:
// 3236b5df9efd538a566570b12674412c-us1

// list id:
// 5b963378f2
