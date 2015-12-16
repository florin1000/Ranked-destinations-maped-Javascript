var boxx = document.getElementById("box");
var cont = document.getElementById("container");

boxx.addEventListener("input",
	function () {
		var value = boxx.value;
		value = value.trim();
		console.log(value);		
		var cuvinte = value.split(' ');	
		console.log(cuvinte);		

		if ((cuvinte.length===2) && (cuvinte[0].length>=3) && (cuvinte[1].length>=3)){
			cont.classList.add('valid');
		}else{
			cont.classList.remove('valid');
		}

	}, false
);
