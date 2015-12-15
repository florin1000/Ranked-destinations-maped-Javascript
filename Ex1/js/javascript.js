var genereaza = function(){
	return Math.random()*100;
}

var buton=document.getElementById("generate");
buton.addEventListener("click", 
	function () {
		var rezultat=genereaza();
		if(rezultat<50){
			document.getElementById("progress").style.width=genereaza()+"%";
		    document.getElementById("progress").style.height=genereaza()+"%";
			document.getElementById("progress").style.backgroundColor="#5fbfa6";			
		}else{
			document.getElementById("progress").style.width=genereaza()+"%";
			document.getElementById("progress").style.height=genereaza()+"%";
			document.getElementById("progress").style.backgroundColor= "red";
		}		
			
	},
	false
);





