const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = 'f3b2ffb736ee760ee123e66ba068c45e';
const iam_apikey = 'pKwnqkmPHjHSxVhPi9EKbi791WpSEEMlKTU9ywKlInMF';
const assistant_id = '0a974646-5046-470d-a167-08b209efa0cd';
const AssistantV2 = require('watson-developer-cloud/assistant/v2');
var session_id;
const service = new AssistantV2({
  iam_apikey: iam_apikey,
  version: '2019-02-28',
  url: 'https://gateway-lon.watsonplatform.net/assistant/api'
});

service.createSession({
  assistant_id: assistant_id
})
  .then(res => {
   // console.log(JSON.stringify(res, null, 2));
    session_id=res.session_id;
   // console.log(session_id);

  //input hi
  service.message({
  assistant_id: assistant_id,
  session_id: session_id,
  input: {
    'message_type': 'text',
    'text': 'Hi'
    }
  })
  .then(res => {
    console.log(JSON.stringify(res, null, 2));
  })
  .catch(err => {
    console.log(err);
  });

  //input city
   service.message({
  assistant_id: assistant_id,
  session_id: session_id,
  input: {
    'message_type': 'text',
    'text': 'chennai'
    }
  })
  .then(res => {
    console.log(JSON.stringify(res, null, 2));
  })
  .catch(err => {
    console.log(err);
  });



  })

  .catch(err => {
    console.log(err);
  });







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

app.listen(3000, function () {
  console.log('Example   app listening on port 3000!')
})

