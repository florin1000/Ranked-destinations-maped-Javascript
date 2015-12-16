var fereastra = document.getElementById("textinput");
var myform = document.getElementById("myform");
var inputfill = document.getElementById("addings");


myform.addEventListener("submit",
	function (event) {
		event.preventDefault();
		console.log("preventDefault");	

		var message = inputfill.value;
		var newElement = document.createElement('div');
		newElement.className = "message-box";
		//newElement.innerHTML = "<div-class='image'></div><p>"+message+"</p>";

		var imageElement = document.createElement('div');
		imageElement.className = "image";
		newElement.appendChild(imageElement);

		var par = document.createElement("p");
		par.textContent = message;
		newElement.appendChild(par);
		fereastra.scrollTop = fereastra.scrollHeight;

		fereastra.appendChild(newElement);

		inputfill.value = "";
		inputfill.focus();
		fereastra.scrollTop = fereastra.scrollHeight;

		//var textul=textinput.appendChild(document.createElement(message-box));
		//document.getElementById("textinput").innerHTML=textul;
		//inputfill.value;
});

// var sub=document.getElementById("buton");
// sub.addEventListener("submit",
// 	function(){
// 		var inputfill=document.getElementById("addings");
// 		document.getElementById("textinput").innerHtml=inputfill.value;
// 	}
// 	);
//https://jsbin.com/piwiqi/edit?html,css,output