const express = require('express');
const app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.use(express.static('public'));

var path = require('path');

var secretNumber = Math.floor(Math.random()*10000 + 1);
console.log("Secret number " + secretNumber);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/',  function (req, res){
    var guessNumber = req.body.number;
    console.log("Client guessed " + guessNumber);
  
    if (guessNumber > secretNumber){
      res.send("1");
    } else if (guessNumber < secretNumber){
      res.send("-1");
    } else {
      res.send("0");
      secretNumber = Math.floor(Math.random()*10000 + 1);
      console.log("Secret number " + secretNumber);
    }
})

app.listen(3000, function () {
  console.log('App listening on port 3000.');
});