var express = require("express");
var path = require("path");
var app = express();


app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.set('port', (process.env.PORT || 5000));
app.use(express.static('public'))


app.listen(app.get('port'), function() {
  console.log('Node luistert op poort', app.get('port'));
});

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/zoekscherm", function(req, res) {
  res.render("zoekscherm");
});

app.get("/aanmelden", function(req, res) {
  res.render("aanmelden");
});

app.get("/registreren", function(req, res) {
  res.render("registreren");
});

app.get("/zoekscherm-account", function(req, res) {
  res.render("zoekscherm-account");
});

app.get("/zoekresultaat-a", function(req, res) {
  res.render("zoekresultaat-a");
});

app.get("/zoekresultaat-b", function(req, res) {
  res.render("zoekresultaat-b");
});
