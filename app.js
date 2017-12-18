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
  var haltesInDeBuurt;

  var lat = req.body.lat;
  var lng = req.body.lng;
  var coorX = 0;
  var coorY = 0;
  var radius = 300;
  // omrekenen
  request('https://www.delijn.be/rise-api-core/coordinaten/convert/' + lat + '/' + lng, function (error, response, body) {
      if (body === '') {
            response = undefined;
      } else {
            // Attempt the parse. If it fails, a parse error should be delivered to the user.
            response = body.replace(XSSI_PREFIX, '');
            try {
                  response = JSON.parse(body);
            }
            catch (error) {
                  // Even though the response status was 2xx, this is still an error.
                  ok = false;
                  // The parse error contains the text of the body that failed to parse.
                  response = ({ error: error, text: body });
            }
      }

      console.log(response);

      //console.log(response.xCoordinaat);
      coorX = body.xCoordinaat;
      coorY = body.yCoordinaat;

      console.log("x:"+coorX, "y:"+coorY);


      request('https://www.delijn.be/rise-api-core/haltes/indebuurt/' + coorX + '/' + coorY + '/' + radius, function (error, response, body) {
            // console.log('Status:', response.statusCode);
            // console.log('Headers:', JSON.stringify(response.headers));
            //console.log('Response:', body);
            halteInDeBuurt = body;

            //console.log(halteInDeBuurt);
            res.render("halteZoeken", {
                  content: body
            });
       });
  });



});
app.post("/halteZoekenResultaat", function(req, res) {
      // var long = req.query.long;
      // var lat = req.query.lat;
      // var coorX = 0;
      // var coorY = 0;
      // var radius = 500;
      //
      // request('https://www.delijn.be/rise-api-core/coordinaten/convert/' + lat + '/' + long, function (error, response, body) {
      //      var body = JSON.parse(body);
      //      console.log(body);
      //
      //      coorX = body.xCoordinaat;
      //      coorY = body.yCoordinaat;
      //
      //      console.log("x:"+coorX+"y:"+coorY);
      //
      //
      //      request('https://www.delijn.be/rise-api-core/haltes/indebuurt/' + coorX + '/' + coorY + '/' + radius, function (error, response, body) {
      //

                // if (coorX === null) {
                //   '<p> Er zijn geen haltes gevonden in de buurt</p>';
                // } else {
                //   '<h2> Haltes in de buurt:</h2>'
                //   for (var i = 0; i < body.length; i++) {
                //       var halteNaam = body[i].omschrijvingLang;
                //       var halteNummer = body[i].halteNummer;
                //       var afstand = body[i].afstand;
                //       var lijnen = body[i].lijnen[lijnNummer];
                //   }
                // }
                //
                // var omgeving = '<h2>Gevonden haltes:</h2><p>' + halteNaam + ' - ' + '</p><p>Afstand tot halte: ' + afstand + 'km<br>Doorkomst lijnen' + lijnen.toString() + '</p>';

                // omgeving = body;
                //
                res.render('halteZoekenResultaat', {
                     content: omgeving
                });
           });
      // });

// });

app.get("/registreren", function(req, res) {
  res.render("registreren");
});

app.get("/routePlannen", function(req, res) {
  res.render("routePlannen");
});
app.post("/routePlannenResultaat", function(req, res) {
      // var startPoint = req.body.startPoint;
      // var startLat = 0;
      // var startLng = 0;
      // var startX = 0;
      // var startY = 0;
      //
      // var endPoint = req.body.endPoint;
      // var endLat = req.body.endLat;
      // var endLng = req.body.endLng;
      // var endX = 0;
      // var endY = 0;
      //
      // var date = req.body.date.split("-").reverse().join("-");
      // var time = req.body.time;
      //
      // console.log("1: " + date);
      //
      // var arrivalDeparture = req.body.arrivalDeparture;
      //
      // var byBus = req.body.byBus;
      // var byTram = req.body.byTram;
      // var byMetro = req.body.byMetro;
      // var byTrain = req.body.byTrain;
      // var byBelbus = req.body.byBelbus;

      // var gevondenRoute = '<h2>Routes voor <br>' + startPoint + ' - ' + endPoint + ' <br>op ' + date + '</h2><h2>Vervoersmiddelen:<h2><p>Bus: ' + byBus + '</p><p>Tram: ' + byTram + '</p><p>Metro: ' + byMetro + '</p><p>Trein: ' + byTrain + '</p><p>Belbus: ' + byBelbus + '</p>';


      // console.log("2: ", startPoint, endPoint, startX, startY, endX, endY, date, time, arrivalDeparture, byBus, byTram, byMetro, byTrain, byBelbus);
      //
      // request('https://www.delijn.be/rise-api-core/coordinaten/convert/' + endLat + '/' + endLng, function (error, response, body) {
      //      var response = JSON.parse(body);
      //      console.log("3: " + response);
      //
      //      endX = response.xCoordinaat;
      //      endY = response.yCoordinaat;
      //
      //      console.log("4: " + endX + endY);


            // request('https://www.delijn.be/rise-api-core/reisadvies/routes/Sint-Niklaas/' + endPoint + '/134027/206073/' + endX + '/' + endY + '/' + date + '/' + time + '/' + arrivalDeparture + '/' + byBus + '/' + byTram + '/' + byMetro + '/' + byTrain + '/' + byBelbus + '/nl' , function (error, response, body) {
            //       var body = JSON.parse(body);
            //       console.log("5: " + body);
            //
            //       for (var i = 0; i < body.length; i++) {
            //             var body = body[i];
            //             for (var j =0; j < reiswegen.length; j++) {
            //                   var reisTijd = body.reiswegen[i].duration;
            //                   var vertrekTijd = body.reiswegen[i].startTime;
            //                   var aankomstTijd = body.reiswegen[i].endTime;
            //             };
            //       }
            //
            //       var gevondenRoute = '<h2>Routes voor <br>' + startPoint + ' - ' + endPoint + ' <br>op ' + date + '</h2><p>Vertrekuur: ' + vertrekTijd + '</p><p>Aankomstuur: ' + aankomstTijd + '</p><p>Reistijd: ' + reisTijd + '</p>';
            //
            //       // var gevondenRoute = body;
            //
            //       console.log("6: " + reisTijd + vertrekTijd + aankomstTijd);

                  res.render("routePlannenResultaat", {
                    content: ""
                  });

            // });
      // });
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
      '<h2> Verkooppunten in ' + stad + '</h2>'
      for (var i = 0; i < body.length; i++) {
          var gemeenteVerkooppunt = body[i].gemeente;
          var naamVerkooppunt = body[i].naam;
          var adresVerkooppunt = body[i].adresString;
      }
    }
    res.render("verkooppuntZoekenResultaat", {
      content: '<h3>' + gemeenteVerkooppunt + '</h3><p> Verkooppunt: ' + naamVerkooppunt + '</p><p> Adres: ' + adresVerkooppunt + '</p>'
    });
  });
});

app.listen(app.get('port'), function() {
  console.log('Node luistert op poort', app.get('port'));
});
