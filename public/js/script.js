function main() {
  var knoppen = document.querySelectorAll(".bussen");
  var tekst = document.querySelectorAll(".content");
  for(var i=0; i<knoppen.length;i++){
    knoppen[i].addEventListener("click", alohomora);
  }
  function alohomora(evt){
    var juisteTekst=evt.currentTarget.parentElement.querySelector(".content");
    juisteTekst.classList.toggle("closed");
    for(var i=0; i<tekst.length;i++){
      if(tekst[i]!=juisteTekst){
        tekst[i].classList.add("closed");
      }
    }
  }
}


window.onload = function() {
      main();
}
