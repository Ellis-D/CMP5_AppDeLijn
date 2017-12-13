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

    console.log(stad);

    request('https://www.delijn.be/rise-api-core/locations/verkooppunten/' + stad, function (error, response, body) {
      var body = JSON.parse(body);
      console.log(body);

      if (stad === null) {
        '<p> Er zijn geen verkooppunten gevonden in de gemeente ' + stad + '</p>';
      } else {
        '<h2> Verkooppunten in ' + stad + '</h2>'
        for (var i = 0; i < body.length; i++) {
            var gemeente_verkooppunt = body[i].gemeente;
            var naam_verkooppunt = body[i].naam;
            var adres_verkooppunt = body[i].adresString;
        }
      }
      res.render('verkooppunten_result', {
        verkoop: '<h3>' + gemeente_verkooppunt + '</h3><p> Verkooppunt: ' + naam_verkooppunt + '</p><p> Adres: ' + adres_verkooppunt + '</p>'
      });
    });
});

app.get('/lijnen', function(req, res) {
    res.render('lijnen', {});
});

app.post('/lijnen/result', function(req, res) {
    var s_d = ' ';
    request('https://www.delijn.be/rise-api-core/lijnen/gemeente/' + req.body.gemeenten[0].gemeenteNummer, function (error, response, body) {

      // var gemeenteId = body.gemeenten[0].gemeenteNummer;

      var d = JSON.parse(body);
      console.log(d);

      if (d === null) {
        s_d += `
        <p> Er zijn geen lijnen gevonden in de gemeente ${req.body.gemeenten[0].gemeenteNummer}</p>
        `;
      }
      else {

        s_d += `
          <h2> Lijnen in de gemeente ${req.body.gemeenten[0].gemeenteNummer}</h2>
        `;
        for (var i = 0; i < d.length; i++) {
          s_d += `
            <h2> ${d[i].bestemming} </h2>
            <h3> ${d[i].lijnNummer} </h3>
            <hr>
          `;
        }
      }
      res.render('lijnen_result', {
        verkoop: `${s_d}`,
      });
    });
});



app.listen(8080);
console.log('De app is geopend in poort 8080')
