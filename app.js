const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended : true}))

app.get("/",function(req,res){
    
    res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){

    const query = req.body.cityName;
    const apiKey = "2136e4f349904bfa1b7b9c624fa5fe37";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units=metric"
    https.get(url,function(response){

        response.on("data",function(data){
            //Getting the data back and converting into json format
            const weatherData = JSON.parse(data);
            
            //searching for particular data in response by json parsing
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon;
            const icon = "https://openweathermap.org/img/wn/"+ weatherIcon +"@2x.png"
            
            res.write("<h1>The temprature in "+query+" is " + temp + " degree celcius </h1>");
            res.write("<h3>The weather is currently " + "<em>"+ weatherDescription + "</em>" + "</h3>");
            res.write("<img src="+icon+">");
            res.send();
        })
      
        
    })
   
})






app.listen(3000,function(){
    console.log("Sever is up and running on port 3000 !!");
})