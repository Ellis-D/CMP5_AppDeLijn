

// function main() {
//
// }
//
//
// window.onload = function() {
//       main();
// }


window.onload = function() {
  if (window.location.href === "http://localhost:5000/404") {

  }
  if (window.location.href === "http://localhost:5000/aanmelden") {

  }
  if (window.location.href === "http://localhost:5000/halteZoeken") {
        function coordinatenAutomatischBepalen() {
              navigator.geolocation.getCurrentPosition(function(location) {
                   var lat = location.coords.latitude;
                   var long = location.coords.longitude;
                   console.log([lat, long]);
              });
        }
  }
  if (window.location.href === "http://localhost:5000/index") {

  }
  if (window.location.href === "http://localhost:5000/registreren") {

  }
  if (window.location.href === "http://localhost:5000/routePlannen") {

        // Werkt ineens niet meer!!!
        function datumEnTijdInvullen() {
              var vandaag = new Date();
              var nu = vandaag.getUTCHours() + ":" + vandaag.getUTCMinutes()
              document.getElementById('routeplannenDatum').valueAsDate = vandaag;
              document.getElementById('routeplannenTijd').value = nu;
        }


        function locatieOpvragen() {
            	// Locatie startPoint opvragen
            	document.getElementById("routesKnop").onclick = function() {
            		var startPoint = document.getElementById("startPoint").value;
            		console.log("Gevonden locaties voor " + startPoint);
            		addressToLocation(startPoint, searchLocations);
            	}
              function searchLocations(locations) {
              	if(locations && locations.length) {
              		console.log("Aantal locaties: " + locations.length);
              		var numOfLocations = locations.length;
              		for(var i=0; i<numOfLocations; i++) {
              			coordinatenTeruggeven("<p>" + locations[i].text + "<br>" + locations[i].location.toString() + "</p>");
              		}
              	} else {
              		coordinatenTeruggeven("Geen locatie gevonden");
              	}
              }
              function addressToLocation(startPoint, callback) {
              	var geocoder = new google.maps.Geocoder();
              	geocoder.geocode(
              		{ address: startPoint},
              		function(results, status) {
              			var resultLocations = [];
              			if(status == google.maps.GeocoderStatus.OK) {
              				if(results) {
              					var numOfResults = results.length;
              					for(var i=0; i<numOfResults; i++) {
              						var result = results[i];
              						resultLocations.push(
              							{
              								text:result.formatted_address,
              								addressStr:result.formatted_address,
              								location:result.geometry.location
              							}
              						);
              					};
              				}
              			} else if(status == google.maps.GeocoderStatus.ZERO_RESULTS) {
              				console.log('Adres niet gevonden');
              			}
              			var lat = resultLocations[0].location.lat.toString();
              			console.log(lat);

              			if (resultLocations.length > 1) {
              				coordinatenTeruggeven("<p>Specifieer je zoekwaarde</p>");
              			} else if (resultLocations.length === 1) {
                      callback(resultLocations);
              			} else {
              				callback(null);
              			}
              		}
              	);
              }
              function coordinatenTeruggeven(str) {
              	var coordinatenLatLng = document.getElementById("coordinatenLatLng");
              	coordinatenLatLng.innerHTML = "";
              	coordinatenLatLng.innerHTML = coordinatenLatLng.innerHTML + "<br />" + str;
              }

            	// Locatie endPoint opvragen
            	document.getElementById("routesKnop").onclick = function() {
            		var endPoint = document.getElementById("endPoint").value;
            		console.log("Gevonden locaties voor " + endPoint);
            		addressToLocation(endPoint, searchLocations);
            	}
              function searchLocations(locations) {
              	if(locations && locations.length) {
              		console.log("Aantal locaties: " + locations.length);
              		var numOfLocations = locations.length;
              		for(var i=0; i<numOfLocations; i++) {
              			coordinatenTeruggeven("<p>" + locations[i].text + "<br>" + locations[i].location.toString() + "</p>");
              		}
              	} else {
              		coordinatenTeruggeven("Geen locatie gevonden");
              	}
              }
              function addressToLocation(endPoint, callback) {
              	var geocoder = new google.maps.Geocoder();
              	geocoder.geocode(
              		{ address: endPoint},
              		function(results, status) {
              			var resultLocations = [];
              			if(status == google.maps.GeocoderStatus.OK) {
              				if(results) {
              					var numOfResults = results.length;
              					for(var i=0; i<numOfResults; i++) {
              						var result = results[i];
              						resultLocations.push(
              							{
              								text:result.formatted_address,
              								addressStr:result.formatted_address,
              								location:result.geometry.location
              							}
              						);
              					};
              				}
              			} else if(status == google.maps.GeocoderStatus.ZERO_RESULTS) {
              				console.log('Adres niet gevonden');
              			}
              			var lat = resultLocations[0].location.lat.toString();
              			console.log(lat);

              			if (resultLocations.length > 1) {
              				coordinatenTeruggeven("<p>Specifieer je zoekwaarde</p>");
              			} else if (resultLocations.length === 1) {
                      callback(resultLocations);
              			} else {
              				callback(null);
              			}
              		}
              	);
              }
              function coordinatenTeruggeven(str) {
              	var coordinatenLatLng = document.getElementById("coordinatenLatLng");
              	coordinatenLatLng.innerHTML = "";
              	coordinatenLatLng.innerHTML = coordinatenLatLng.innerHTML + "<br />" + str;
              }
        }

        function vervoersMiddelenChecken() {
              var byBus = document.getElementById('busInput');
              if (byBus.checked === true) {
                    byBus.value = 'on'
              } else {
                    byBus.value = 'of'
              }

              var byTram = document.getElementById('tramInput');
              if (byTram.checked === true) {
                    byTram.value = 'on'
              } else {
                    byTram.value = 'of'
              }

              var byMetro = document.getElementById('metroInput');
              if (byMetro.checked === true) {
                    byMetro.value = 'on'
              } else {
                    byMetro.value = 'of'
              }

              var byTrain = document.getElementById('treinInput');
              if (byTrain.checked === true) {
                    byTrain.value = 'on'
              } else {
                    byTrain.value = 'of'
              }

              var byBelbus = document.getElementById('belbusInput');
              if (byBelbus.checked === true) {
                    byBelbus.value = 'on'
              } else {
                    byBelbus.value = 'of'
              }
        }
  }
  if (window.location.href === "http://localhost:5000/routePlannenResultaat") {

  }
  if (window.location.href === "http://localhost:5000/startscherm") {

  }
  if (window.location.href === "http://localhost:5000/verkooppuntZoeken") {

  }
  if (window.location.href === "http://localhost:5000/verkooppuntZoekenResultaat") {

  }
}
