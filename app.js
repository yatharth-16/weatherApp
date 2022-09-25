const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

  app.get("/",function(req,res){

  res.sendFile(__dirname+"/index.html");


  });

  app.post("/",function(req,res){



    const query = req.body.cityName;
    const apiKey = "0a50b557375d30721ee773bc02c77c7a";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+apiKey+"&units="+unit;

    https.get(url, function(response){
      console.log(response.statusCode);

      response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
        //console.log(temp + " "+ weatherDescription);
        res.write("<p>The Weather is currently " + weatherDescription+"</p>");
        res.write("<h1>The temperature in "+ query +" is "+temp  + " degrees Celcius.</h1>");
        res.write("<img src="+imageURL+"  >");
        res.send();
      });
    });
  });





app.listen(3000 , function()
{
  console.log("Server is running on port 3000.")
});
