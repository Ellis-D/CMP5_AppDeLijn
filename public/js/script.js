function main() {

      var geocoder = new google.maps.Geocoder();
      var adres = jQuery('#startPoint').val();
      var nieuweString = jQuery('#startXstartY');

      geocoder.geocode( { 'address': adres}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                  var latitude = results[0].geometry.location.lat();
                  var longitude = results[0].geometry.location.lng();
                  nieuweString.val(latitude+', '+longitude);
            }
            console.log(nieuweString.val(latitude+', '+longitude));

      });



      var vandaag = new Date();
      var nu = vandaag.getUTCHours() + ":" + vandaag.getUTCMinutes()
      document.getElementById('routeplannenDatum').valueAsDate = vandaag;
      document.getElementById('routeplannenTijd').value = nu;


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


window.onload = function() {
      main();
}
