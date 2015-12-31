var form = document.getElementById("form");
var stelute = document.getElementsByClassName('star');
var table = document.getElementById("table");
var tableBody = table.getElementsByTagName('tbody')[0];
var count = document.getElementById("count");
var store = [];
var average = document.getElementById("average");

var totDistance = document.getElementById('totaldistance');
var totArea = document.getElementById('area');
var perimeter = document.getElementById('perimeter');

var nameHead = document.getElementById('namehead');//pt sort
var cityHead = document.getElementById('cityhead');//pt sort
var ratingHead = document.getElementById('ratinghead');//pt sort

var tableTr = tableBody.getElementsByTagName("tr");//construim un array de tr ;


form.addEventListener("submit", function (event) {
    event.preventDefault();

    var data = getValues();
    if (isValidData(data)) {
        codeAddress();
        form.reset();
        //city.focus();

        store.push(data);
        render(store);

        //resetam valorile din form:
        //succes.classList.remove("has-success");
        //succes.classList.remove("has-error");
        //validName.classList.add("invalidname2");
        //validName.classList.remove("invalid3");

        invalidRating.classList.add('invalid2');
        invalidRating.classList.remove('invalid3');

        invalidRating.classList.remove('invalidstarlabel');
        invalidRating.classList.remove('invalidstarlabel');
        //stelute.classList.remove('active');
        for (var x = 0; x < stelute.length; x++) {
            stelute[x].classList.remove('active');
            rating = 0;
        }
        eventTr();

        totDistance.value = totalDistance();
        totArea.value = getArea();
        perimeter.value = perimetru();



        ratingHead.addEventListener("click", function () {
                alert('Functioneaza sortarea store-ului insa nu se upgradeaza tabelul?');
                function compare(a, b) {
                    if (a.rating < b.rating)
                        return -1;
                    if (a.rating > b.rating)
                        return 1;
                    return 0;
                }

                store.sort(compare);
            },
            false
        );


        console.log(store);

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
        for (var jj = 0; jj < length; jj++) {
            stelute[jj].classList.add('active');
        }
    });

    star.addEventListener('mouseout', function () {
        for (var j = 0; j < stelute.length; j++) {
            stelute[j].classList.remove('active');
            for (var l = 0; l < rating; l++) {
                stelute[l].classList.add('active')
            }
        }
    });
}

//end count stars;
var map;
var geocoder;
var polygonCoords = [];//array de obiecte cu coordonatele markerelor
//var markerCoords = {};//obiect pentru fiecare marker ce contine lat and lng
function initialize() {
    geocoder = new google.maps.Geocoder();
    var mapOptions = {
        center: new google.maps.LatLng(44.453592, 26.104718),
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var inputcity = document.getElementById("city");

    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input2);
    //var autocomplete =
    new google.maps.places.Autocomplete(inputcity);
    getPolygon();
//polygones
//    polygonCoords2 = [
//        {lat: 25.774, lng: -80.190},
//        {lat: 18.466, lng: -66.118},
//        //{lat: 32.321, lng: -64.757},
//        {lat: 45, lng: 25}
//       // {lat: 25.774, lng: -80.190}
//    ];
//    var perimeterPolygon = new google.maps.Polygon({
//        paths: polygonCoords,//nu il vede???
//        strokeColor: '#FF0000',
//        strokeOpacity: 0.8,
//        strokeWeight: 2,
//        fillColor: '#FF0000',
//        fillOpacity: 0.35
//    });
//    perimeterPolygon.setMap(map);
}
var perimeterPolygon = null;
//var areaPolygon = null;
var getPolygon = function () {
    if (perimeterPolygon != null)perimeterPolygon.setMap(null);
    perimeterPolygon = new google.maps.Polygon({
        paths: polygonCoords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
    });
    perimeterPolygon.setMap(map);
    //areaPolygon = getArea();
};


google.maps.event.addDomListener(window, 'load', initialize);

var c = 0;
var markers = [];//array-ul de lat si long ale markerelor
var path = [];//arrayul de markere ce contine getPosition();
function codeAddress() {
    var address = document.getElementById("city").value;
    geocoder.geocode({'address': address}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            c = 1;
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                    map: map,
                    //draggable: true,
                    animation: google.maps.Animation.DROP,//ads animation on markers
                    position: results[0].geometry.location

                })
                ;

            var markerCoords = {};
            markerCoords.lat = marker.position.lat();//se pun coordonatele in obiect;
            markerCoords.lng = marker.position.lng();//se pun coordonatele in obiect;
            //marker.addListener('click', toggleBounce);//se animeaza/dezanimeaza la click
            markers.push(marker);//se pun markerele intr-un array;
            path.push(marker.getPosition());

            polygonCoords.push(markerCoords);//se pune obiectul intr-un array
            //console.log(markers);
        } else {
            c = 0;
            //alert("Geocode was not successful for the following reason: " + status);
        }
        getPolygon();
        totDistance.value = totalDistance();
        //areaPolygon = getArea();
        totArea.value = getArea();
        perimeter.value = perimetru();
    });
}

//buiding polygones
//var getCoord=function(markers){
//    for (t=0;t<markers.length;t++){
//        polygonCoords[t].markerCoords.lat
//    }
//}

var validName = document.getElementById('invalidname');
//var succes = document.getElementById("form-group-modified");

var isValidName = function (name) {
    if (name.length >= 2) {
        //succes.classList.add("has-success");
        validName.classList.add("invalidname2");
        validName.classList.remove("invalid3");
        return true;
    } else {
        validName.classList.remove("invalidname2");
        validName.classList.add("invalid3");
        // succes.classList.add("has-error");
        return false;
    }
};

var validCity = document.getElementById("invalidcity");
var isValidCity = function (city) {
    if (city.length >= 1) {
        validCity.classList.add("invalidcity2");
        validCity.classList.remove("invalid3");
        return 1
    } else {
        validCity.classList.remove("invalidcity2");
        validCity.classList.add("invalid3");
        return 0
    }
};

var invalidRating = document.getElementById("invalid");
//se verifica daca s-a dat rating;
var isValidRating = function (rating) {
    if (rating >= 1) {
        invalidRating.classList.add('invalid2');
        invalidRating.classList.remove('invalid3');
        //invalidRating.classList.add('invalidstarlabel');
        return 1;
    } else {
        invalidRating.classList.remove('invalid2');
        invalidRating.classList.add('invalid3');
        return 0
    }
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
    var name = inputs[0].value;
    var city = inputs[1].value;
    return {
        name: name,
        city: city,
        rating: rating,
        markers: markers
    };
};

var isValidData = function () {
    var values = getValues();
    return (isValidName(values.name) && isValidCity(values.city) && isValidRating(rating));//conform indicatiilor web-storm
    //if (isValidName(values.name) && isValidCity(values.city) && isValidRating(rating)) {
    //    return true;
    //}
    //return false;
};

var createRow = function (values) {
    var tr = document.createElement('tr');
    tr.innerHTML = tmpl("tpl", values);
    tableBody.appendChild(tr);
};

tableBody.addEventListener("click", function (event) {
    event.preventDefault();//pentru a nu reseta toata pagina!!!!
    if (isRemoveBtn(event.target)) {
        removeRow(event.target);
        getPolygon();//redesenam polygonul
    }
});

var isRemoveBtn = function (target) {
    return target.classList.contains("remove-btn");
};

var updateTotal = function (sir) {
    count.innerHTML = sir.length;
};

var updateAverage = function (store) {
    average.innerHTML = getRating(store);
};

var getIndexOfButton = function (target) {
    var tr = target.parentNode.parentNode;
    var allTrs = tableBody.getElementsByTagName('tr');
    allTrs = [].slice.call(allTrs);
    var index = allTrs.indexOf(tr);
    return index;
};

var removeRow = function (target) {
    var index = getIndexOfButton(target);
    removeFromStore(store, index);
    markers[index].setMap(null);//stergem  markerul de pe harta
    markers.splice(index, 1);//stergem markerul din array-ul de markere
    polygonCoords.splice(index, 1);//stergem coordonatele markerului din array;
    path.splice(index, 1);//stergem  markerul.getPosition din array;
    totDistance.value = totalDistance();
    getPolygon();//restam si poligonul ca sa se repare Aria+perimetrul//callback
    totArea.value = getArea();
    perimeter.value = perimetru();

    render(store);
    eventTr();
};

var render = function (store) {

    //ratingHead.addEventListener("click", function () {
    //        alert('mai mai');
    //        function compare(a, b) {
    //            if (a.rating < b.rating)
    //                return -1;
    //            if (a.rating > b.rating)
    //                return 1;
    //            return 0;
    //        }
    //
    //        store.sort(compare);
    //    },
    //    false
    //);


    populateTable(store);
    updateTotal(store);
    updateAverage(store);
};

var removeFromStore = function (store, index) {
    store.splice(index, 1);
};

var populateTable = function (store) {
    tableBody.innerHTML = '';
    for (var i = 0; i < store.length; i++) {
        var data = store[i];
        createRow(data);
    }
};

var getRating = function (store) {
    var sum = 0;
    if (store.length != 0) {
        for (var k = 0; k < store.length; k++) {
            sum += parseInt(store[k].rating);
        }
        return (sum / store.length).toFixed(2);
    } else {
        return 0;
    }
};

var getIndexOfTr = function (target) {
    var tr = target;
    var allTrs = tableBody.getElementsByTagName('tr');
    allTrs = [].slice.call(allTrs);
    var index = allTrs.indexOf(tr);
    return index;
};

var eventTr = function () {
    for (var w = 0; w < tableTr.length; w++) {
        tableTr[w].addEventListener("click", function (ev) {
            // console.log(ev);
            var trIndex = getIndexOfTr(ev.target.parentNode);
            if (trIndex != -1) map.setCenter(markers[trIndex].getPosition())
        });
    }

};

//google.maps.geometry.spherical.computeDistanceBetween (latLngA, latLngB);
//google.maps.LatLng.getPosition()
//myLatLng = new google.maps.LatLng({lat: -34, lng: 151});

///
//var loc1 = new google.maps.LatLng(52.5773139, 1.3712427);
//var loc2 = new google.maps.LatLng(52.4788314, 1.7577444);
//alert(google.maps.geometry.spherical.computeDistanceBetween (loc1, loc2));


var total = 0;
var totalDistance = function () {
    total = 0;
    for (var y = 0; y < (polygonCoords.length - 1); y++) {
        total += google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(polygonCoords[y].lat, polygonCoords[y].lng), new google.maps.LatLng(polygonCoords[y + 1].lat, polygonCoords[y + 1].lng))
    }
    return (total / 1000).toFixed(2);
};
totDistance.value = totalDistance();


var totalp = 0;
var perimetru = function () {
    totalp = 0;
    if (polygonCoords.length > 2) {
        for (var ii = 0; ii < (polygonCoords.length - 1); ii++) {
            totalp += google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(polygonCoords[ii].lat, polygonCoords[ii].lng), new google.maps.LatLng(polygonCoords[ii + 1].lat, polygonCoords[ii + 1].lng))

        }
        totalp += google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(polygonCoords[(polygonCoords.length - 1)].lat, polygonCoords[(polygonCoords.length - 1)].lng), new google.maps.LatLng(polygonCoords[0].lat, polygonCoords[0].lng));

        return (totalp / 1000).toFixed(2);
    } else {
        return (2 - 2).toFixed(2);
    }
};
perimeter.value = perimetru();


var getArea = function () {
    return (google.maps.geometry.spherical.computeArea(perimeterPolygon.getPath()) / 1000000).toFixed(2);
};
totArea.value = getArea();
//sort
//
//nameHead=
//cityHead=
//ratingHead=
//functia de sortare obiecte
//function compare(a,b) {
//    if (a.field < b.field)
//        return -1;
//    if (a.field > b.field)
//        return 1;
//    return 0;
//}
//
//objs.sort(compare);

//console.log(store);
nameHead.addEventListener("click", function () {
        alert('mai mai');
        function compare(a, b) {
            if (a.name < b.name)
                return -1;
            if (a.name > b.name)
                return 1;
            return 0;
        }

        store.sort(compare);
    },
    false
);

cityHead.addEventListener("click", function () {
        alert('mai mai');
        function compare(a, b) {
            if (a.city < b.city)
                return -1;
            if (a.city > b.city)
                return 1;
            return 0;
        }

        store.sort(compare);
    },
    false
);


    ratingHead.addEventListener("click", function () {
            alert('mai mai');
            function compare(a, b) {
                if (a.rating < b.rating)
                    return -1;
                if (a.rating > b.rating)
                    return 1;
                return 0;
            }

            store.sort(compare);
        },
        false
    );
