var express = require('express');
var app = express();

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

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});
