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
    var s_d = ' ';
    request('https://www.delijn.be/rise-api-core/locations/verkooppunten/' + req.body.stad, function (error, response, body) {
      var d = JSON.parse(body);
      console.log(d);

      if (d === null) {
        s_d += `
        <p> Er zijn geen verkooppunten gevonden in de gemeente ${req.body.stad}</p>
        `;
      }
      else {

        s_d += `
          <h2> verkooppunten in de gemeente ${req.body.stad}</h2>
        `;
        for (var i = 0; i < d.length; i++) {
          s_d += `
            <h2> ${d[i].gemeente} </h2>
            <h3> ${d[i].naam} verkoopt tickets </h3>
            <h5> Adres: ${d[i].adresString} </h5>
            <hr>
          `;
        }
      }
      res.render('verkooppunten_result', {
        verkoop: `${s_d}`,
      });
    });
});

app.get('/lijnen', function(req, res) {
    res.render('lijnen', {});
});

app.post('/lijnen/result', function(req, res) {
    // console.log(req.body.stad);
    var s_d = ' ';
    request('https://www.delijn.be/rise-api-core/lijnen/gemeente/' + req.body.gemeenteNummer, function (error, response, body) {
      var d = JSON.parse(body);
      console.log(d);

      if (d === null) {
        s_d += `
        <p> Er zijn geen lijnen gevonden in de gemeente ${req.body.gemeenteNummer}</p>
        `;
      }
      else {

        s_d += `
          <h2> Lijnen in de gemeente ${req.body.gemeenteNummer}</h2>
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
