function SUPERGODFILE(calorieCount, function_callback) {
  var combination;
  var DONTGO = true
  var request = require('superagent');
  var _ = require("underscore")


  var foods = new Array()

  var combination = undefined;
  var final = _.after(1, function( ){
   combination = restOfCode()

   })

  var foodData = function loadData(  )
  {







  var Food = function (id, name) {
    this.id = id;
    this.name = name;


  };



  request
    .get('https://api.hfs.purdue.edu/menus/v2/locations/Wiley/10-20-2016')
    .end(function(err, res) {
      if (err) {
        console.log("There was an error.")
        return;
      }

      res.body['Meals'].forEach(function(meal) {
          var stations = meal['Stations'];

          for (var i = 0 ; i < stations.length ; i ++ )

            {
              station = stations[i]
              station["Items"].forEach(function(item){

                foods.push( new Food ( item["ID"], item["Name"] ) )


              })

            }


      });





      var finish = _.after( foods.length , function(){

        // console.log(foods)
        final()
        console.log("I'm so DONE")
        function_callback(combination);
      })



  var addInfo_clouser = function( j ) {
            return function(err, res) {


         if( "Nutrition" in res.body )
            {
              res.body["Nutrition"].forEach(function( category ){


               if( category["Name"] ==  "Calories" )
              {
                foods[j]["calorie"] = category["Value"]


              }

               if(category["Name"] == "Vitamin A" )
               {
                 var tempPercent = parseInt(category["DailyValue"] )
                 foods[j]["vitaminA"] = tempPercent


               }

               if(category["Name"] == "Vitamin C" )
               {
                 var tempPercent = parseInt(category["DailyValue"] )
                 foods[j]["vitaminC"] = tempPercent

               }

               if(category["Name"] == "Protein" )
               {
                 var tempPercent = parseInt(category["DailyValue"] )
                 foods[j]["protein"] = tempPercent


               }

               if(category["Name"] == "Total fat" )
               {
                 var tempPercent = parseInt(category["DailyValue"] )
                 foods[j]["fat"] = tempPercent


               }

          })

            }

         finish()

        }


      }


      for (var j = 0 ; j < foods.length ; j++ )
      {


      var ai_called = addInfo_clouser( j )

        request
         .get('https://api.hfs.purdue.edu/menus/v2/items/' + foods[j]["id"])
         .end( ai_called )


  }


  }




  );



  }


//=================================================================================

  foodData()




  var restOfCode = function( )
  {

  foodList = foods



  //   var Food = function (id, calorie, name, fat, vitaminA, vitaminC, protein) {
  //   this.id = id;
  //   this.name = name;
  //   this.calorie = calorie;
  //   this.fat = fat;
  //   this.vitaminA = vitaminA;
  //   this.vitaminC = vitaminC;
  //   this.protein = protein;
  //   this.healthValue = vitaminA*1.2 + vitaminC*3.4 + protein*2.3 - fat*1.4;
  // };



  for ( i = 0 ; i < foodList.length ; i ++ )
  {
      vitaminA = foodList[i].vitaminA
      vitaminC = foodList[i].vitaminC
      protein = foodList[i].protein
      fat = foodList[i].fat
      calories = foodList[i].calorie
      foodList[i].healthValue = ( vitaminA * 1.2 + vitaminC * 3.4 + protein * 4 - fat * 1.4 ) / calories
  }


  function SortThisStuff( array , name ) {
    var value = 9999999;
    var array2 = new Array();

    array2.push(array[0]);
    for (i = 1; i < array.length; i++) {
      for (j = 0; j < array2.length; j++) {
        if (array[i][name] >= array2[j][name]) {
          array2.splice(j, 0, array[i]);
          break;
        }
        else if (j===array2.length-1) {
          array2.push(array[i]);
          break;
        }
      }
    }
    return array2;
  }

  foodList = SortThisStuff(foodList, "calorie");

  foodListHealth = SortThisStuff(foodList, "healthValue")


  // foodList.forEach(function (food) {
  //   console.log(food.calorie)
  //   console.log(food.name, "\n\n\n")


  // })

  var total = calorieCount;
  var current = 0;
  combination = new Array();
  var i = 0;
  while (current <= calorieCount) {
    if (current + foodList[i].calorie <= total) {
      //console.log(foodList[i]);
      current += foodList[i].calorie;
      combination.push(foodList[i]);
    } else {
      i++;
    }
    if (i >= foodList.length) {
      break;
    }
  }

  for (i = 0; i < foodList.length; i++) {
    for (j = 0; j < combination.length; j++) {
      if ((foodList[i].calorie <= combination[j].calorie + 5 && foodList[i].calorie >= combination[j].calorie - 5) && foodList[i].healthValue > combination[j].healthValue) {         // (foodList[i].calorie + 10 <= combination[j].calorie || foodList[i].calorie - 10 >= combination[j].calorie) && foodList[i].healthValue > combination[j].healthValue
        combination.splice(j, 1, foodList[i]);
      }
    }
  }
  return combination;

}
}

module.exports = {
  calculate: SUPERGODFILE
};
