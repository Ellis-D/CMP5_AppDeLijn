function main() {
      var vandaag = new Date();
      var nu = vandaag.getUTCHours() + ":" + vandaag.getUTCMinutes()
      document.getElementById('routeplannenDatum').valueAsDate = vandaag;
      document.getElementById('routeplannenTijd').value = nu;


      var byBus = document.getElementById('busInput');
      if (byBus.checked === true) {
            byBus.value = 'on'
      } else if (byBus.checked === false) {
            byBus.value = 'off'
      }


      var byTram = document.getElementById('tramInput');
      if (byTram.checked === true) {
            byTram.value = 'on'
      } else if (byTram.checked === false) {
            byTram.value = 'off'
      }


      var byMetro = document.getElementById('metroInput');
      if (byMetro.checked === true) {
            byMetro.value = 'on'
      } else if (byMetro.checked === false) {
            byMetro.value = 'off'
      }


      var byTrain = document.getElementById('treinInput');
      if (byTrain.checked === true) {
            byTrain.value = 'on'
      } else if (byTrain.checked === false) {
            byTrain.value = 'off'
      }


      var byBelbus = document.getElementById('belbusInput');
      if (byBelbus.checked === true) {
            byBelbus.value = 'on'
      } else if (byBelbus.checked === false) {
            byBelbus.value = 'off'
      }
}


window.onload = function() {
      main();
}
