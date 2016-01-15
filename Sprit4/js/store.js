var store = (function () {
    var theUrl = "http://server.godev.ro:8080/api/florin/entries";
    var defaultSettings = {
        type: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    var errorHandler = function (reject) {
        return function (xhr) {

            if (xhr.status == 409) {
                reject(xhr.responseJSON.error);
            } else {
                alert('Bad boys have arrived');
            }
        };
    };

    return {
        getAll: function (page) {

            return new Promise(function (resolve, reject) {
                $.ajax(theUrl + '?page=' + page,
                    defaultSettings).done(resolve).fail(errorHandler(reject))
            });
        },

        add: function (item) {

            return new Promise(function (resolve, reject) {
                $.ajax(theUrl, $.extend({}, defaultSettings, {type: 'POST', data: JSON.stringify(item)})
                ).done(resolve).fail(errorHandler(reject));
            });
        },

        update: function (id, updateData) {

            return new Promise(function (resolve, reject) {
                $.ajax(theUrl + '/' + id, $.extend({}, defaultSettings, {
                    type: 'PUT',
                    data: JSON.stringify(updateData)
                })).done(resolve).fail(errorHandler(reject));
            });
        },

        get: function (id) {

            return new Promise(function (resolve, reject) {
                $.ajax(theUrl + '/' + id, defaultSettings).done(resolve).fail(errorHandler(reject));
            });
        },

        delete: function (id) {

            return new Promise(function (resolve, reject) {
                $.ajax(theUrl + '/' + id, $.extend({}, defaultSettings, {type: 'DELETE'})).done(resolve).fail(errorHandler(reject))
            });
        }
    };
})();

