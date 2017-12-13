// server.js
// load the things we need
var express = require('express');
var request = require('request');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set the view engine to ejs
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
    res.render('index', {});
});

app.get('/verkooppunten', function(req, res) {
    res.render('verkooppunten', {});
});

app.post('/verkooppunten/result', function(req, res) {
    // console.log(req.body.stad);
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
      res.render('verkooppunten_result', {
        verkoop: '<h3>' + gemeenteVerkooppunt + '</h3><p> Verkooppunt: ' + naamVerkooppunt + '</p><p> Adres: ' + adresVerkooppunt + '</p>'
      });
    });
});

app.get('/lijnen', function(req, res) {
    res.render('lijnen', {});
});

// app.post('/lijnen/result', function(req, res) {
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
//       res.render('verkooppunten_result', {
//         verkoop: '<h3>' + gemeente_verkooppunt + '</h3><p> Verkooppunt: ' + naam_verkooppunt + '</p><p> Adres: ' + adres_verkooppunt + '</p>'
//       });
//     });
// });



app.listen(8080);
console.log('De app is geopend in poort 8080')
