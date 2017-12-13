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
  res.render("404", {
    paginaTitel: "404"
  });
});

app.get("/aanmelden", function(req, res) {
  res.render("aanmelden", {
    paginaTitel: "aanmelden"
  });
});

app.get("/", function(req, res) {
  res.render("index", {
    paginaTitel: "/"
  });
});

app.get("/lijnZoeken", function(req, res) {
  res.render("lijnZoeken", {
    paginaTitel: "lijnZoeken"
  });
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
  res.render("registreren", {
    paginaTitel: "registreren"
  });
});

app.get("/routePlannen", function(req, res) {
  res.render("routePlannen", {
    paginaTitel: "routePlannen"
  });
});
app.post("/routePlannenResultaat", function(req, res) {
  res.render("routePlannenResultaat", {
    paginaTitel: "routePlannenResultaat"
  });
});

app.get("/startscherm", function(req, res) {
  res.render("startscherm", {
    paginaTitel: "startscherm"
  });
});

app.get("/verkooppuntZoeken", function(req, res) {
  res.render("verkooppuntZoeken", {
    paginaTitel: "verkooppuntZoeken"
  });
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
      verkoop: '<h3>' + gemeenteVerkooppunt + '</h3><p> Verkooppunt: ' + naamVerkooppunt + '</p><p> Adres: ' + adresVerkooppunt + '</p>',
      paginaTitel: "verkooppuntZoekenResultaat"
    });
  });
});

app.listen(app.get('port'), function() {
  console.log('Node luistert op poort', app.get('port'));
});
