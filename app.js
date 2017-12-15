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

app.get("/lijnZoeken", function(req, res) {
  res.render("lijnZoeken");
});
app.post("/lijnZoekenResultaat", function(req, res) {

  //     var reqBody = req.body;
  //     for (var j = 0; j < reqBody.length; j++) {
  //       var gemeenteId = reqBody.gemeenten[j].gemeenteNummer;
  //       var gemeenteNaam = reqBody.gemeenten[j].naam;
  //     }
  //
  //     console.log(gemeenteId);
  //     console.log(gemeenteNaam);
  //
  //     request('https://www.delijn.be/rise-api-core/lijnen/gemeente/' + gemeenteId, function (error, response, body) {
  //       var body = JSON.parse(body);
  //       console.log(body);
  //
  //       if (gemeenteId === null) {
  //         '<p> Er zijn geen lijnen gevonden in de gemeente ' + gemeenteNaam + '</p>';
  //       } else {
  //         '<h2> Verkooppunten in ' + gemeenteNaam + '</h2>'
  //         for (var i = 0; i < body.length; i++) {
  //             var gemeenteLijn = body[i].gemeenten[0].;
  //             var nummerLijn = body[i].naam;
  //         }
  //       }
  //       res.render("lijnZoekenResultaat", {
  //         verkoop: '<h3>' + gemeente_verkooppunt + '</h3><p> Verkooppunt: ' + naam_verkooppunt + '</p><p> Adres: ' + adres_verkooppunt + '</p>',
  //         paginaTitel: "lijnZoekenResultaat"
  //       });
  //     });
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

  // var startX = ;
  // var startY = ;
  // var endX = ;
  // var endY = ;

  var date = req.body.date;
  var time = req.body.time;

  var byBus = req.body.byBus;
  var byTram = req.body.byTram;
  var byMetro = req.body.byMetro;
  var byTrain = req.body.byTrain;
  var byBelbus = req.body.byBelbus;

  var gevondenRoute = '<h2>Routes voor <br>' + startPoint + ' - ' + endPoint + ' <br>op ' + date + '</h2><h2>Vervoersmiddelen:<h2><p>Bus: ' + byBus + '</p><p>Tram: ' + byTram + '</p><p>Metro: ' + byMetro + '</p><p>Trein: ' + byTrain + '</p><p>Belbus: ' + byBelbus + '</p>';

  // var gevondenRoute = '<p>startPoint: ' + startPoint + '</p><p>endPoint: ' + endPoint + '</p><p>startX: ' + startX + '</p><p>startY: ' + startY + '</p><p>endX: ' + endX + '</p><p>endY: ' + endY + '</p><p>Date: ' + date + '</p><p>time: ' + time + '</p><p>byBus: ' + byBus + '</p><p>byTram: ' + byTram + '</p><p>byMetro: ' + byMetro + '</p><p>byTrain: ' + byTrain + '</p><p>Belbus: ' + byBelbus + '</p>';

  console.log(gevondenRoute);

  // request('https://www.delijn.be/rise-api-core/reisadvies/routes/' + startPoint + '/' + endPoint + '/' + startX + '/' + startY + '/' + endX + '/' + endY + '/' + date + '/' + time + '/' + arrivalDeparture + '/' + byBus + '/' + byTram + '/' + byMetro + '/' + byTrain + '/' + byBelbus + '/nl' , function (error, response, body) {
  //   var body = JSON.parse(body);
  //   console.log(body);
  //
  //   if (stad === null) {
  //     '<p> Er zijn geen verkooppunten gevonden in de gemeente ' + stad + '</p>';
  //   } else {
  //     '<h2> Verkooppunten in ' + stad + '</h2>'
  //     for (var i = 0; i < body.length; i++) {
  //         var gemeenteVerkooppunt = body[i].gemeente;
  //         var naamVerkooppunt = body[i].naam;
  //         var adresVerkooppunt = body[i].adresString;
  //     }
  //   }
  //   res.render("verkooppuntZoekenResultaat", {
  //     verkoop: '<h3>' + gemeenteVerkooppunt + '</h3><p> Verkooppunt: ' + naamVerkooppunt + '</p><p> Adres: ' + adresVerkooppunt + '</p>'
  //   });
  // });


  res.render("routePlannenResultaat", {
    gevondenRoute: gevondenRoute
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
      verkoop: '<h3>' + gemeenteVerkooppunt + '</h3><p> Verkooppunt: ' + naamVerkooppunt + '</p><p> Adres: ' + adresVerkooppunt + '</p>'
    });
  });
});

app.listen(app.get('port'), function() {
  console.log('Node luistert op poort', app.get('port'));
});
