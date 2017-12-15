var express = require("express");
var request = require('request');
var path = require("path");
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
      var long = req.query.long;
      var lat = req.query.lat;
      var coorX = 0;
      var coorY = 0;
      var radius = 500;

      request('https://www.delijn.be/rise-api-core/coordinaten/convert/' + lat + '/' + long, function (error, response, body) {
           var body = JSON.parse(body);
           console.log(body);

           coorX = body.xCoordinaat;
           coorY = body.yCoordinaat;

           console.log("x:"+coorX+"y:"+coorY);


           request('https://www.delijn.be/rise-api-core/haltes/indebuurt/' + coorX + '/' + coorY + '/' + radius, function (error, response, body) {


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

                omgeving = body;

                res.render('halteZoekenResultaat', {
                     content: omgeving
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
      var endPoint = req.body.endPoint;

      var startX;
      var startY;
      var endX;
      var endY;

      var date = req.body.date.split("-").reverse().join("-");
      var time = req.body.time;

      console.log(date);

      var arrivalDeparture = req.body.arrivalDeparture;

      var byBus = req.body.byBus;
      var byTram = req.body.byTram;
      var byMetro = req.body.byMetro;
      var byTrain = req.body.byTrain;
      var byBelbus = req.body.byBelbus;

      // var gevondenRoute = '<h2>Routes voor <br>' + startPoint + ' - ' + endPoint + ' <br>op ' + date + '</h2><h2>Vervoersmiddelen:<h2><p>Bus: ' + byBus + '</p><p>Tram: ' + byTram + '</p><p>Metro: ' + byMetro + '</p><p>Trein: ' + byTrain + '</p><p>Belbus: ' + byBelbus + '</p>';


      console.log(startPoint, endPoint, startX, startY, endX, endY, date, time, arrivalDeparture, byBus, byTram, byMetro, byTrain, byBelbus);

      request('https://www.delijn.be/rise-api-core/reisadvies/routes/Sint-Niklaas/Elversele,Temse/134103/206073/133774/200500/' + '/' + date + '/' + time + '/' + arrivalDeparture + '/' + byBus + '/' + byTram + '/' + byMetro + '/' + byTrain + '/' + byBelbus + '/nl' , function (error, response, body) {
            var body = JSON.parse(body);
            console.log(body);

            for (var i = 0; i < body.length; i++) {
                        var reisTijd = body[i].reiswegen[i].duration;
                        var vertrekTijd = body[i].reiswegen[i].startTime;
                        var aankomstTijd = body[i].reiswegen[i].endTime;
            }

            // var gevondenRoute = '<h2>Routes voor <br>' + startPoint + ' - ' + endPoint + ' <br>op ' + date + '</h2><p>Vertrekuur: ' + vertrekTijd + '</p><p>Aankomstuur: ' + aankomstTijd + '</p><p>Reistijd: ' + reisTijd + '</p>';

            var gevondenRoute = body;

            console.log(gevondenRoute);

            res.render("routePlannenResultaat", {
              content: gevondenRoute
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
