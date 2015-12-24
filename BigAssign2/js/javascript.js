var form = document.getElementById("form");
var name = document.getElementById("name");
var city = document.getElementById("city");
var stelute = document.getElementsByClassName('star');
var table = document.getElementById("table");
var tableBody = table.getElementsByTagName('tbody')[0];
var count = document.getElementById("count");
var store = [];

form.addEventListener("submit", function (event) {
    event.preventDefault();

    var data = getValues();
    if (isValidData(data)) {
        form.reset();
        city.focus();
        store.push(data);
        render(store);

        //star.classList.remove('active');
        //rating=0;
    }

    return false;
});


var getValues = function () {
    return {
        city: city.value
        //name: name.value,
        //rating: rating
    }
}

var createRow = function (values) {
    var tr = document.createElement('tr');
    tr.innerHTML = tmpl("tpl", values);
    tableBody.appendChild(tr);
}


//rating field;

var rating = 0;
//console.log(rating);
for (var i = 0; i < stelute.length; i++) {
    var star = stelute[i];
    //hover-  mouse-over
    star.addEventListener("mouseover", function () {
        var rating = this.getAttribute("data-value");

        var length = parseInt(rating, 10);

        for (var j = 0; j < length; j++) {
            stelute[j].classList.add('active');
        }
    });
    //mouseout
    star.addEventListener('mouseout', function () {
            if (rating > 0) {
                for (var j = 0; j < stelute.length; j++) {
                    stelute[j].classList.remove('active');
                }
                for (var l = 0; l < rating; l++) {
                    stelute[l].classList.add('active');
                }
            } else {
                for (var m = 0; m <stelute.length; m++) {
                    stelute[m].classList.remove('active');
                }
            }
        }
    );

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

//Se verifica inputul;
var isValidName = function (name) {
    //if name.length>=2{

    return 1;
    //}
    //return name.length >= 2;

};
//Se verifica orasul;
var isValidCity = function (city) {
    return 5 > 3;
}
//se verifica daca s-a dat rating;
var isValidRating = function (rating) {
    return rating >= 1;
}

//se verifica daca butonul este checked; se pare ca nu este necesar
//var isValidChecked = function () {
//    if(document.getElementById('button').checked){
//      return 1;
//    }else{
//        return 0;
//    }
//}
//isValidChecked();

var isValidData = function () {
    if ((isValidName) && (isValidCity) && (isValidRating)) {
        return 1;
    }
    else {
        return 0;
    }
}


tableBody.addEventListener("click", function (event) {
    event.preventDefault();
    if (isRemoveBtn(event.target)) {
        removeRow(event.target);
    }
});


var isRemoveBtn = function (target) {
    return target.classList.contains("remove-btn");
}


var updateTotal = function (arr) {
    count.innerHTML = arr.length;
}

var getIndexOfButton = function (target) {
    var tr = target.parentNode.parentNode;
    var allTrs = tableBody.getElementsByTagName('tr');
    allTrs = [].slice.call(allTrs);
    var index = allTrs.indexOf(tr);
    return index;
}

var removeRow = function (target) {
    var index = getIndexOfButton(target);
    removeFromStore(store, index);
    render(store);
}

var render = function (store) {
    populateTable(store);
    updateTotal(store);
}

var removeFromStore = function (store, index) {
    store.splice(index, 1);
}

var populateTable = function (store) {
    tableBody.innerHTML = '';
    for (var i = 0; i < store.length; i++) {
        var data = store[i];
        createRow(data);
    }
}


var geocoder;
var map;
function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
        zoom: 8,
        center: latlng
    }
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

function codeAddress() {
    var address = document.getElementById("city").value;
    geocoder.geocode({'address': address}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}