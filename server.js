var express = require('express');
var app = express();
var path = require("path");

var nutrition = require('./NutritionStuffFirst.js')

app.get('/foods', function (req, res) {
  nutrition.calculate(req.query.count, function(foods) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    res.send(foods);
  });
});

app.get("/something", function(req, res) {
  res.send("asdfhaskjdfhkj")
})

app.get("/", function(req, res) {
  console.log("hi")
  var filepath = path.join(__dirname + '/Test.html');
  console.log(filepath);
  res.sendFile(filepath);
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});
