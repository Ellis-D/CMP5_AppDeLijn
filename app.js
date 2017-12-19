var express = require("express");
var request = require('request');
var path = require("path");
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.set('port', (process.env.PORT || 5000));
app.use(express.static('public'))

app.get("/404", function(req, res) {
  res.render("404");
});

app.get("/aanmelden", function(req, res) {
  res.render("aanmelden");
});

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/halteZoeken", function(req, res) {
  res.render("halteZoeken");
});
app.post("/halteZoekenResultaat", function(req, res) {
  var halteInDeBuurt;

  var lng = req.body.lng;
  var lat = req.body.lat;
  var coorX = 0;
  var coorY = 0;
  var radius = 300;

  console.log("lng:"+ lng);
  console.log("lat:"+ lat);
  // omrekenen
  request('https://www.delijn.be/rise-api-core/coordinaten/convert/' + lat + '/' + lng, function (error, response, body) {
       var body = JSON.parse(body);
       coorX = body.xCoordinaat;
       coorY = body.yCoordinaat;

       console.log("x:", coorX, "y:", coorY);

       request('https://www.delijn.be/rise-api-core/haltes/indebuurt/' + coorX + '/' + coorY + '/' + radius, function (error, response, body) {
            halteInDeBuurt = body;

            console.log(halteInDeBuurt);

            res.render('halteZoekenResultaat', {
                 content: halteInDeBuurt
            });
       });
  });
});

app.get("/registreren", function(req, res) {
  res.render("registreren");
});

app.get("/routePlannen", function(req, res) {
  res.render("routePlannen");
});
app.post("/routePlannenResultaat", function(req, res) {
      var startPoint = req.body.startPoint;
      var startLat = req.body.startLat;
      var startLng = req.body.startLng;
      var startX = "";
      var startY = "";

      var endPoint = req.body.endPoint;
      var endLat = req.body.endLat;
      var endLng = req.body.endLng;
      var endX = "";
      var endY = "";

      var date = req.body.date.split("-").reverse().join("-");
      var time = req.body.time;

      console.log(date);

      var arrivalDeparture = req.body.arrivalDeparture;

      var byBus = req.body.byBus;
      var byTram = req.body.byTram;
      var byMetro = req.body.byMetro;
      var byTrain = req.body.byTrain;
      var byBelbus = req.body.byBelbus;

      console.log(startPoint, endPoint, startX, startY, endX, endY, date, time, arrivalDeparture, byBus, byTram, byMetro, byTrain, byBelbus);

      request('https://www.delijn.be/rise-api-core/coordinaten/convert/' + endLat + '/' + endLng, function (error, response, body) {
           var response = JSON.parse(body);
           console.log(response);

           endX = response.xCoordinaat;
           endY = response.yCoordinaat;

           console.log(endX, endY);
           console.log(startPoint, endPoint, startX, startY, endX, endY, date, time, arrivalDeparture, byBus, byTram, byMetro, byTrain, byBelbus);
      });

      request('https://www.delijn.be/rise-api-core/coordinaten/convert/' + startLat + '/' + startLng, function (error, response, body) {
           var response = JSON.parse(body);
           console.log(response);

           startX = response.xCoordinaat;
           startY = response.yCoordinaat;

           console.log(startX, startY);
           console.log(startPoint, endPoint, startX, startY, endX, endY, date, time, arrivalDeparture, byBus, byTram, byMetro, byTrain, byBelbus);

            request('https://www.delijn.be/rise-api-core/reisadvies/routes/' + startPoint + '/' + endPoint + '/' + startX + '/' + startY + '/' + endX + '/' + endY + '/'+ date + '/' + time + '/' + arrivalDeparture + '/' + byBus + '/' + byTram + '/' + byMetro + '/' + byTrain + '/' + byBelbus + '/nl' , function(error,response, data)  {

                  var body = JSON.parse(data);

                  //console.log("data:"+body);
                  var gevondenRoute="";
                  for (var j =0; j < body.reiswegen.length; j++) {

                        var reisTijd = body.reiswegen[j].duration;
                        var vertrekTijd = body.reiswegen[j].startTime;
                        var aankomstTijd = body.reiswegen[j].endTime;
                        gevondenRoute =gevondenRoute+ '<h2>Routes voor <br>' + startPoint + ' - ' + endPoint + ' <br>op ' + date + '</h2><p>Vertrekuur: ' + vertrekTijd + '</p><p>Aankomstuur: ' + aankomstTijd + '</p><p>Reistijd: ' + reisTijd + '</p>';
                        console.log(reisTijd+vertrekTijd+aankomstTijd);
                  };

                  console.log(reisTijd, vertrekTijd, aankomstTijd);
                  console.log(gevondenRoute);

                  res.render("routePlannenResultaat", {
                    content: gevondenRoute
                  });
            });
      });
});

app.get("/startscherm", function(req, res) {
  res.render("startscherm");
});

app.get("/verkooppuntZoeken", function(req, res) {
  res.render("verkooppuntZoeken");
});
app.post("/verkooppuntZoekenResultaat", function(req, res) {
  var stad = req.body.stad;

  request('https://www.delijn.be/rise-api-core/locations/verkooppunten/' + stad, function (error, response, body) {
    var body = JSON.parse(body);
    console.log(body);

    if (stad === null) {
      '<p> Er zijn geen verkooppunten gevonden in de gemeente ' + stad + '</p>';
    } else {
      '<h2> Verkooppunten in ' + stad + '</h2>';
      var content="";
      for (var i = 0; i < body.length; i++) {
          var gemeenteVerkooppunt = body[i].gemeente;
          var naamVerkooppunt = body[i].naam;
          var adresVerkooppunt = body[i].adresString;
          content=content+'<h2>Verkooppunten in ' + gemeenteVerkooppunt + '</h2><p>' + naamVerkooppunt + '</p><p>' + adresVerkooppunt + '</p>';
      }
    }
    res.render("verkooppuntZoekenResultaat", {
      content:content
    });
  });
});

app.listen(app.get('port'), function() {
  console.log('Node luistert op poort', app.get('port'));
});
