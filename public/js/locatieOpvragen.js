var map = null;

window.onload = function() {

	// initialize the map
	var mapHolder = document.getElementById("map-holder");
	map = new google.maps.Map(
		mapHolder,
		{
			zoom: 3,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
	);

	// centering the map
	map.setCenter(new google.maps.LatLng(43.229195, 27.872314));

	// adding events
	document.getElementById("search").onclick = function() {
		var address = document.getElementById("text").value;
		log("Address: " + address, true);
		addressToLocation(address, changeMapLocation);
	}

}

// processing the results
function changeMapLocation(locations) {
	if(locations && locations.length) {
		log("Num of results: " + locations.length);
		var numOfLocations = locations.length;
		for(var i=0; i<numOfLocations; i++) {
			log("- " + locations[i].text + " / <strong>" + locations[i].location.toString() + "</strong>");
			var marker = new google.maps.Marker({
				map: map,
				position: locations[i].location
			});
		}
		map.panTo(locations[0].location);
		map.setZoom(8);
	} else {
		log("Num of results: 0");
	}
}

// converting the address's string to a google.maps.LatLng object
function addressToLocation(address, callback) {
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode(
		{
			address: address
		},
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
				// address not found
			}

			if(resultLocations.length > 0) {
				callback(resultLocations);
			} else {
				callback(null);
			}
		}
	);
}

// debugging
function log(str, clear) {
	var debugHolder = document.getElementById("debug");
	if(clear) {
		debugHolder.innerHTML = "";
	}
	debugHolder.innerHTML = debugHolder.innerHTML + "<br />" + str;
}
