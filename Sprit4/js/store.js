var store = (function () {
    var theUrl = "http://server.godev.ro:8080/api/florin/entries";

    return {
        getAll: function (page) {
            var getSettings = {
                type: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            return new Promise(function (resolve, reject) {
                $.ajax(theUrl + '?page=' + page, getSettings).done(function (data) {
                    resolve(data)
                }).fail(function (xhr) {
                    if (xhr.status == "409") {
                        alert(responseJson.error);
                    } else {
                        alert("Something went wrong!!");
                    }
                    ;
                });
            });
        },
        add: function (item) {
            console.log(item);
            return new Promise(function (resolve, reject) {
                $.ajax(theUrl, {
                    type: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify(item)
                }).done(function (data) {
                    resolve(data);
                });
            });
        },
        update: function (id, updateData) {
            var theUrl2 = "http://server.godev.ro:8080/api/florin/entries/" + id;
            return new Promise(function (resolve, reject) {
                $.ajax(theUrl2, {
                    type: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify(updateData)
                }).done(function (data) {
                    resolve(data);
                });
            });
        },
        get: function (id) {

            return new Promise(function (resolve, reject) {
                var theUrl3 = theUrl + "/" + id;
                $.ajax(theUrl3, {
                    type: 'get',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).done(function (data) {
                    resolve(data);
                });
            })
        },
        delete: function (id) {

            return new Promise(function (resolve, reject) {
                var theUrl2 = "http://server.godev.ro:8080/api/florin/entries/" + id;
                $.ajax(theUrl2, {
                    type: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).done(function (data) {
                    resolve(data);
                })
            });
        }
    };
})();


