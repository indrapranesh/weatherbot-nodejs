const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = 'f3b2ffb736ee760ee123e66ba068c45e';

var port = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  request(url, function (err,response,body){
    
      let weather = JSON.parse(body)
       // console.log(weather.main.temp); 
        res.json(weather);
        
        
})
});

app.listen(port, function () {
  console.log('Our app is running on http://localhost:'+port);
})
