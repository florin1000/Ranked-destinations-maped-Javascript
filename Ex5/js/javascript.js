var Redd=document.getElementById("myRangeR");
// console.log(Redd.value);
var Greenn=document.getElementById("myRangeG");
// console.log(Greenn.value);
var Bluee=document.getElementById("myRangeB");
// console.log(Bluee.value);
var changeRedd=Redd.value;
var changeGreenn=Greenn.value;
var changeBluee=Bluee.value;

Redd.addEventListener("input",
	function(){
		changeRedd=Redd.value;	
		var culoare="RGB("+changeRedd+","+changeGreenn+","+changeBluee+")";	
		document.body.style.backgroundColor=culoare;
	},false
);
Greenn.addEventListener("input",
	function(){
		changeGreenn=Greenn.value;		
		var culoare="RGB("+changeRedd+","+changeGreenn+","+changeBluee+")";
		document.body.style.backgroundColor=culoare;
	},false
);
Bluee.addEventListener("input",
	function(){
		changeBluee=Bluee.value;
		var culoare="RGB("+changeRedd+","+changeGreenn+","+changeBluee+")";	
		document.body.style.backgroundColor=culoare;	
	},false	
);


