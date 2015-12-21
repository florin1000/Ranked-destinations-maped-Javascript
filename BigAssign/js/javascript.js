//se stocheaza intr-o variabila inputul de nume;
var inputName = document.getElementsByClassName("form-control");


//se stocheaza id-ul stelutelor intr-o variabila
var stelute = document.getElementsByClassName('star');

//se numara stelutele pentru rating
//
var rating;
for (var i = 0; i < stelute.length; i++) {
    //rating;
    var star = stelute[i];
    //console.log(star);

    //star.addEventListener("mouseover", function () {
    //    var rating = this.getAttribute("data-value");
    //
    //    var length = parseInt(rating, 10);
    //
    //    for (var j = 0; j < length; j++) {
    //        stelute[j].classList.add('active');
    //    }
    //});
    //
    //star.addEventListener('mouseout', function () {
    //    for (var j = 0; j < stelute.length; j++) {
    //        stelute[j].classList.remove('active');
    //    }
    //
    //});

    star.addEventListener("click", function () {
        rating = this.getAttribute("data-value");

        var length = parseInt(rating, 10);
        for (var j = 0; j < stelute.length; j++) {
            stelute[j].classList.remove('active');
        }

        for (var j = 0; j < length; j++) {
            stelute[j].classList.add('active');
            //document.getElementById("abc").disable = true;
        }

        console.log(rating);
    });

}
;
console.log(rating);
//end count stars;


//
//Se verifica inputul;
var isValidName = function (name) {
    return name.length >= 2;
};
//Se verifica orasul;
var isValidCity = function (city) {

}
//se verifica daca s-a dat rating;
var isValidRating = function (rating) {
    return rating>=1;
}
//se verifica daca butonul este checked;
var isValidChecked = function () {
    if(document.getElementById('button').checked){
      return 1;
    }else{
        return 0;
    }
}
isValidChecked();