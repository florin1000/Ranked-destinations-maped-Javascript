var form = document.getElementById("form");

//se stocheaza in vaiabila inputname continutul tagului cu id-ul name
//var inputName = document.getElementById("name");
//se stocheaza in variabila city continutul tag-ului cu id-ul city(orasul introdus )
//var city = document.getElementById("city");
//se stocheaza id-ul stelutelor intr-o variabila
var stelute = document.getElementsByClassName('star');

var table = document.getElementById("table");
var tableBody = table.getElementsByTagName('tbody')[0];
var count = document.getElementById("count");
var store = [];
var average = document.getElementById("average");
//se adauga eventul pe form
form.addEventListener("submit", function (event) {
    event.preventDefault();

    var data = getValues();
    if (isValidData(data)) {
        form.reset();
        city.focus();

        store.push(data);
        render(store);

        //resetam valorile din form:

        for (var j = 0; j < stelute.length; j++) {
            stelute[j].classList.remove('active');
        }

        succes.classList.remove("has-success");
        succes.classList.remove("has-error");

    }

    return false;
});

//se numara stelutele pentru rating

var rating;
for (var i = 0; i < stelute.length; i++) {
    var star = stelute[i];

    star.addEventListener("mouseover", function () {
        var rating = this.getAttribute("data-value");

        var length = parseInt(rating, 10);

        for (var j = 0; j < length; j++) {
            stelute[j].classList.add('active');
        }
    });

    star.addEventListener("click", function () {
        rating = this.getAttribute("data-value");

        var length = parseInt(rating, 10);
        for (var j = 0; j < stelute.length; j++) {
            stelute[j].classList.remove('active');
        }
        for (var j = 0; j < length; j++) {
            stelute[j].classList.add('active');
        }
    });

    star.addEventListener('mouseout', function () {
        for (var j = 0; j < stelute.length; j++) {
            stelute[j].classList.remove('active')
            for (var l = 0; l < rating; l++) {
                stelute[l].classList.add('active')
            }
        }
        ;


    });

}
;
//end count stars;


//
//Se verifica inputul;
var succes = document.getElementById("form-group-modified");
var isValidName = function (name) {
    if (name.length >= 2) {
        succes.classList.add("has-success");
        return true;
    } else {
        succes.classList.add("has-error");
        return false;
    }
};
//Se verifica orasul;
//test
var map;
var geocoder;
function initialize() {
    //var mapCanvas = document.getElementById('map');
    geocoder = new google.maps.Geocoder();
    var mapOptions = {
        center: new google.maps.LatLng(44.453592, 26.104718),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var inputcity = document.getElementById("city");
    //               console.log(input);
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input2);
    //          nu functioneaza!!!!
    var autocomplete = new google.maps.places.Autocomplete(inputcity);

}
;
////end test

google.maps.event.addDomListener(window, 'load', initialize);

var c = 0;
var isValidMarker = function (address) {
    var address = document.getElementById("city").value;
    geocoder.geocode({'address': address}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            c = 1;
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            c = 0;
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
};

var isValidCity = function () {
    if (c == 1) {
        return 1
    } else {
        return 1
    }
};

//se verifica daca s-a dat rating;
var isValidRating = function (rating) {
    return rating >= 1;
};

//se verifica daca butonul este checked;nu mai este nevoie!!!
//var isValidChecked = function () {
//    if (document.getElementById('button').checked) {
//        return 1;
//    } else {
//        return 0;
//    }
//}
//isValidChecked();


//pentru primele doua inputuri se foloseste clasa form-control
var inputs = document.getElementsByClassName('form-control');
//se preiau valorile si se construieste un obiect;
var getValues = function () {
    var inputs = document.getElementsByClassName('form-control');
    //console.log('inputs:', inputs);
    var name = inputs[0].value;
    //console.log('name:', name);
    var city = inputs[1].value;
    //console.log('city:', city);
    // rating = rating ;

    return {
        name: name,
        city: city,
        rating: rating
    };
};

var isValidData = function (data) {
    var values = getValues();
    if (isValidName(values.name) && isValidCity(values.city) && isValidRating(rating)) {
        return true;
    }
    return false;
};

var createRow = function (values) {
    var tr = document.createElement('tr');
    tr.innerHTML = tmpl("tpl", values);
    tableBody.appendChild(tr);
}


tableBody.addEventListener("click", function (event) {
    event.preventDefault();//pentru a nu reseta toata pagina!!!!
    if (isRemoveBtn(event.target)) {
        removeRow(event.target);
    }
});


var isRemoveBtn = function (target) {
    return target.classList.contains("remove-btn");
}


var updateTotal = function (sir) {
    count.innerHTML = sir.length;
}

var updateAverage = function (store) {
    average.innerHTML = getRating(store);
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
    updateAverage(store);
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
};

var getRating = function (store) {
    var sum = 0;
    for (var k = 0; k < store.length; k++) {
        sum += parseInt(store[k].rating);
    }

    return sum / store.length;
};
