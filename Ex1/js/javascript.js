var genereaza = function(){
	return Math.floor(Math.random()*100);
}

var buton=document.getElementById("generate");
buton.addEventListener("click", 
	function () {
		 var rezultat1=genereaza();
		 console.log(rezultat1);		 
		 var rezultat2=genereaza();
		 console.log(rezultat2);
		 var area=(rezultat1*rezultat2)/100;
		 console.log(area);
		 document.getElementById("progress").style.width=rezultat1+"%";
		 document.getElementById("progress").style.height=rezultat2+"%";
		 document.getElementById("progress").innerHTML=area+"%";
		 if(area<25){			
			document.getElementById("progress").style.background="#5fbfa6";				
		}else if(area<50 && area>=25){			
			document.getElementById("progress").style.background="#472f31";			
		}else if(area<75 && area>=50){			
			document.getElementById("progress").style.background="#786fae";			
		}else{			
			document.getElementById("progress").style.background="#ff2a1a";			
		}		
			
	},
	false
);
