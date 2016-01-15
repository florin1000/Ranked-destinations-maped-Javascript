var editingItem = null;
var page = 1;
var totalPages = 1;
var tableBody = $('table tbody');
var theForm = $('#form');
var container = $('.containerinitial');
var gifyContainer = $('#gify');
var closeButtonGyfi = $('#closegyf');
var loading = $('.myform #loading');

var errorHandler = function () {
    alert('Ciocoflendere mai incearca!!')
};

var drawStarsInTable = function (starsnumber) {
    var x = "";
    var y = "★";

    for (i = 0; i < starsnumber; i++) {
        x = x + y;
    }
    return x;
};

var drawTable = function (store) {
    showLoadingGif();
    store.getAll(page).then(function (data) {
        tableBody.empty();
        $('#totalpage').text(data.totalPages);
        totalPages = data.totalPages;

        $.each(data.list, function (index, el) {
            el.stars = drawStarsInTable(el.stars);
            var tr = tmpl("tpl", el);
            tableBody.append(tr);
        });
        closeLoadingGif();
    })
};

var showLoadingGif = function () {
    loading.addClass('addgyf');
    container.addClass('blur');
};

var closeLoadingGif = function () {
    loading.removeClass('addgyf');
    container.removeClass('blur');
};

var getFormData = function () {

    return {
        name: $('#name').val(),
        visited: $('#button').is(":checked") ? 1 : 0,
        stars: parseInt($('#starsuri').val())
    };
};

var onSubmit = function () {

    if (editingItem) {
        store.update(editingItem.id, getFormData()).then(function () {
            theForm.removeClass("to_edit");
            drawTable(store);
        }, errorHandler);
    } else {
        store.add(getFormData()).then(function () {
            showLoadingGif();
            drawTable(store);
            closeLoadingGif();
        }, errorHandler);
    }
    resetForm();

    return false;
};

var cancelClicked = function () {
    theForm.removeClass("to_edit");
    resetForm();

    return false;
};

var accessGipfy = function () {
    tableBody.on('click', 'tr', function () {
        var cityName = $($(this).find('td')[0]).text();
        $.ajax("http://api.giphy.com/v1/gifs/search?q=" + cityName + "&api_key=dc6zaTOxFJmzC", {
            type: 'GET',
            success: function (data) {
                container.addClass('blur');
                gifyContainer.removeClass('gyfremove');
                gifyContainer.addClass('gyfdisplay');
                closeButtonGyfi.removeClass('gyfremove');
                closeButtonGyfi.addClass('addgyf');
                $('#gifyimg').attr("src", data.data[0].images.downsized.url);
            }
        });
    });
};

var closeGyphi = function () {
    $('#gify').on('click', 'span', function () {
        container.removeClass('blur');
        gifyContainer.addClass('gyfremove');
        gifyContainer.removeClass('gyfdisplay');
    });
};

var pageIncrement = function () {
    $('#increment').click(function () {

        if (page < totalPages) {
            page++;
            $('#currentpage').text(page);
            drawTable(store);
        }
    });
};

var pageDecrement = function () {
    $('#decrement').click(function () {

        if (page > 1) {
            page--;
            $('#currentpage').text(page);
            drawTable(store);
        }
    });
};

var resetForm = function () {
    $('input[name="name"]').val('');
    $('input[name="stele"]').val('').change();
    $('input[name="visited"]').prop('checked', false);
};

$(document).ready(function () {
    theForm.submit(onSubmit);
    $('[name="stele"]').stars();
    $(tableBody).on('click', 'a.remove-btn', function () {
            var id = $(this).closest('tr').data('id');
            store.delete(id).then(function () {
                drawTable(store);
            });

            return false;
        }
    );
    $(tableBody).on('click', 'a.edit-btn', function () {
        theForm.addClass("to_edit");
        var id = $(this).closest('tr').data('id');
        store.get(id).then(function (data) {
            editingItem = data;
            $('input[name="name"]').val(data.name);
            $('input[name="visited"]').prop("checked", data.visited);
            $('input[name="stele"]').val(data.stars).change();
        }, errorHandler);

        return false;
    });
    theForm.find('a.cancel').click(cancelClicked);
    accessGipfy();
    closeGyphi();
    pageIncrement();
    pageDecrement();
    drawTable(store);
})
;


