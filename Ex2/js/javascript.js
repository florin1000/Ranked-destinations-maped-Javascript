//stelute
var stelute = document.getElementsByClassName('star');
var ratingul = document.getElementById('rating');
for (var i = 0; i< stelute.length; i ++) {
	var star = stelute[i];
	//hover-  mouse-over
	star.addEventListener("mouseover", function () {
		var rating = this.getAttribute("data-value");
		ratingul.value = rating;

		var length =  parseInt(rating, 10);

		for (var j = 0; j < length; j++) {
			stelute[j].classList.add('active');
		}
	});
	//mouseout
	star.addEventListener('mouseout', function () {    
    for (var j = 0; j < stelute.length; j++) {
      stelute[j].classList.remove('active');
    }
     ratingul.value = "";
   });
}

 //hover end;

//
//var puncte=document.getElementById("boxrating");
//var x1=document.getElementById("s1");
//var x2=document.getElementById("s2");
//var x3=document.getElementById("s3");
//var x4=document.getElementById("s4");
//var x5=document.getElementById("s5");

//x1.addEventListener("mouseover",
//	function(){
//		document.getElementById("s1").value=1;
//},false
//);
//x2.addEventListener("mouseover",
//	function(){
//		document.getElementById("s2").value=2;
//},false);
//x3.addEventListener("mouseover",
//	function(){
//		document.getElementById("s3").value=3;
//},false);
//x4.addEventListener("mouseover",
//	function(){
//		document.getElementById("s4").value=4;
//},false);
//x5.addEventListener("mouseover",
//	function(){
//		document.getElementById("s5").value=5;
//},false);



