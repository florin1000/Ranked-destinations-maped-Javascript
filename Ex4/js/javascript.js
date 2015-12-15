
//var x = document.getElementById("x");
//var y = document.getElementById("y");

//var xper = document.getElementById("xper")
//var yper = document.getElementById("yper");


var width = window.innerWidth;
var height = window.innerHeight;

window.addEventListener("resize", function () {
  width = window.innerWidth;
  height = window.innerHeight;
});

document.addEventListener("mousemove", function (event) {
  var clientX = event.clientX;
  var clientY = event.clientY;
  
  
//  x.value = clientX;
//  y.value = clientY;
  
  var hue= Math.round(clientX/width * 360);
  var saturation= Math.round(clientY/height * 100) + "%";
  var culoare="hsl("+hue+", "+saturation+", 50%)";
document.body.style.backgroundColor=culoare;
});



// "hsl(120, 20%, 50%)"